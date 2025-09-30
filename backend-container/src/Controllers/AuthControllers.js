const bcrypt = require("bcrypt");
const db = require("../models/index.js");
const { generateToken } = require("../utils/jwt.js");


// Đăng ký


const register = async (req, res) => {
    try {
        const { username, email, password, full_name, phone, role } = req.body;

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
            role: role || "user",
            password_hash: hashedPassword
        });

        const { password_hash, ...userData } = user.toJSON();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userData,
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
};

// Đăng nhập
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const token = generateToken(user);
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Error logging in" });
    }
};

module.exports = {
    register,
    login
};