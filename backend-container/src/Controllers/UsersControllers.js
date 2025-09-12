const bcrypt = require("bcrypt");
const db = require("../models/index.js");
const { generateToken } = require("../utils/jwt.js");

// Lấy danh sách user
const getUsers = async (req, res) => {
    try {
        const users = await db.User.findAll({
            attributes: { exclude: ["password"] } // ẩn password
        });
        res.status(200).json({
            success: true,
            message: "List of users",
            data: users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Error fetching users" });
    }
};

// Đăng ký
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.User.create({ name, email, passwordHash: hashedPassword });

        const { passwordHash: _, ...userData } = user.toJSON(); // xoá password
        res.status(201).json({ success: true, message: "User registered successfully", data: userData });
    } catch (error) {
        console.error("Register error:", error.message);
        console.error(error.stack);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Đăng nhập
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const token = generateToken(user);
        res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ success: false, message: "Error logging in" });
    }
};

// Thêm user (chỉ dùng cho test)
const insertUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.User.create({ name, email, password: hashedPassword });

        const { password: _, ...userData } = user.toJSON();
        res.status(201).json({
            success: true,
            message: "User inserted",
            data: userData,
        });
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ success: false, message: "Error inserting user" });
    }
};

// Cập nhật user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let { password, ...rest } = req.body;
        if (password) {
            password = await bcrypt.hash(password, 10);
            await user.update({ ...rest, hashedPassword });
        } else {
            await user.update(rest);
        }

        const { password: _, ...userData } = user.toJSON();
        res.status(200).json({
            success: true,
            message: "User updated",
            data: userData,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Error updating user" });
    }
};

// Xóa user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await db.User.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ success: true, message: "User deleted" });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Error deleting user" });
    }
};

// Lấy user theo ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.User.findByPk(id, {
            attributes: { exclude: ["password"] }
        });
        if (user) {
            res.status(200).json({
                success: true,
                message: "User details",
                data: user,
            });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ success: false, message: "Error fetching user by ID" });
    }
};

module.exports = {
    getUsers,
    register,
    login,
    insertUser,
    updateUser,
    deleteUser,
    getUserById,
};
