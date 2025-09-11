// controllers/CustomerController.js
const db = require("../models");

// Lấy danh sách khách hàng
exports.getCustomers = async (req, res) => {
    try {
        const customers = await db.Customer.findAll();
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ success: false, message: "Error fetching customers" });
    }
};

// Lấy 1 khách hàng theo ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await db.Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ success: false, message: "Error fetching customer" });
    }
};

// Thêm khách hàng mới
exports.createCustomer = async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;
        const customer = await db.Customer.create({ name, phone, email, address });
        res.status(201).json({ success: true, data: customer });
    } catch (error) {
        console.error("Error creating customer:", error);
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
        await customer.update(req.body);
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ success: false, message: "Error updating customer" });
    }
};

// Xóa khách hàng
exports.deleteCustomer = async (req, res) => {
    try {
        const deleted = await db.Customer.destroy({ where: { customer_id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, message: "Customer deleted" });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ success: false, message: "Error deleting customer" });
    }
};
