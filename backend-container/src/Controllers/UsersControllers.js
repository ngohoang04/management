const bcrypt = require("bcrypt");
const db = require("../models/index.js");
const { generateToken } = require("../utils/jwt.js");

// Lấy danh sách user
const getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll({
            attributes: { exclude: ["password_hash"] } // Ẩn password
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Thêm user (manual)
const createUser = async (req, res) => {
    try {
        const { username, password, full_name, email, phone, role } = req.body;
        const password_hash = await bcrypt.hash(password, 10);

        const user = await db.User.create({
            username,
            password_hash,
            full_name,
            email,
            phone,
            role
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                username: user.username,
                full_name: user.full_name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật user
const updateUser = async (req, res) => {
    try {
        const { username, password, full_name, email, phone, role } = req.body;

        const user = await db.User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        let password_hash = user.password_hash;
        if (password) {
            password_hash = await bcrypt.hash(password, 10);
        }

        await user.update({
            username,
            password_hash,
            full_name,
            email,
            phone,
            role
        });

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa user
const deleteUser = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy user theo ID
const getUserById = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id, {
            attributes: { exclude: ["password_hash"] }
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
};
