const bcrypt = require("bcrypt");
const db = require("../models/index.js");
const { generateToken } = require("../utils/jwt.js");

// 🧩 Đăng ký
const register = async (req, res) => {
    try {
        const { username, email, password, full_name, phone, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.User.create({
            username,
            email,
            full_name,
            phone,
            role: role || "customer",
            password_hash: hashedPassword,
        });

        if (!user) {
            return res.status(500).json({ success: false, message: "User creation failed" });
        }

        const userData = user.toJSON();
        delete userData.password_hash;

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userData,
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ success: false, message: error.message || "Error registering user" });
    }
};

// 🧩 Đăng nhập
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing email or password" });
        }

        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user);
        if (!token) {
            return res.status(500).json({ success: false, message: "Failed to generate token" });
        }

        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            token,
            user: {
                id: user.id,
                name: user.username,       // hoặc user.full_name tùy cột DB
                email: user.email,
                role: user.role        // nếu có cột role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: error.message || "Error logging in" });
    }
};

module.exports = { register, login };
