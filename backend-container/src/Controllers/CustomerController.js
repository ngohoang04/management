// controllers/CustomerController.js
const db = require("../models");

// Lấy danh sách khách hàng
exports.getCustomers = async (req, res) => {
    try {
        const customers = await db.Customer.findAll({
            include: [
                {
                    model: db.Container,
                    as: "containers",
                    attributes: ["id", "code", "status"]
                },
                {
                    model: db.User,
                    as: "user",
                    attributes: ["id", "username", "email"]
                }
            ]
        });
        res.status(200).json({ success: true, message: "List of customers", data: customers });
    } catch (error) {
        console.error("Error fetching customers:", error.message);
        res.status(500).json({ success: false, message: "Error fetching customers" });
    }
};

// Lấy 1 khách hàng theo ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await db.Customer.findByPk(req.params.id, {
            include: [
                {
                    model: db.Container,
                    as: "containers",
                    attributes: ["id", "code", "status"]
                },
                {
                    model: db.User,
                    as: "user",
                    attributes: ["id", "username", "email"]
                }
            ]
        });

        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        res.status(200).json({ success: true, message: "Customer details", data: customer });
    } catch (error) {
        console.error("Error fetching customer:", error.message);
        res.status(500).json({ success: false, message: "Error fetching customer" });
    }
};

// Thêm khách hàng mới
exports.createCustomer = async (req, res) => {
    try {
        const { name, contact_person, phone, email, address, user_id } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ success: false, message: "Name and phone are required" });
        }

        const customer = await db.Customer.create({
            name,
            contact_person,
            phone,
            email,
            address,
            user_id
        });

        res.status(201).json({ success: true, message: "Customer created", data: customer });
    } catch (error) {
        console.error("Error creating customer:", error.message);
        res.status(500).json({ success: false, message: "Error creating customer" });
    }
};

// Cập nhật khách hàng
exports.updateCustomer = async (req, res) => {
    try {
        const customer = await db.Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        const updates = {};
        ["name", "contact_person", "phone", "email", "address", "user_id"].forEach((field) => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: "No fields to update" });
        }

        await customer.update(updates);
        res.status(200).json({ success: true, message: "Customer updated", data: customer });
    } catch (error) {
        console.error("Error updating customer:", error.message);
        res.status(500).json({ success: false, message: "Error updating customer" });
    }
};

// Xóa khách hàng
exports.deleteCustomer = async (req, res) => {
    try {
        const deleted = await db.Customer.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        res.status(200).json({ success: true, message: "Customer deleted" });
    } catch (error) {
        console.error("Error deleting customer:", error.message);
        res.status(500).json({ success: false, message: "Error deleting customer" });
    }
};
