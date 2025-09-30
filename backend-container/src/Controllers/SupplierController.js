// controllers/SupplierController.js
import db from "../models/index.js";

// Lấy danh sách nhà cung cấp
export async function getSuppliers(req, res) {
    try {
        const suppliers = await db.Supplier.findAll({
            include: [
                { model: db.Container, as: "containers", attributes: ["id", "container_code", "type", "status"] },
                { model: db.User, as: "user", attributes: ["id", "username", "email"] }
            ]
        });

        res.status(200).json({ success: true, message: "List of suppliers", data: suppliers });
    } catch (error) {
        console.error("Error fetching suppliers:", error.message);
        res.status(500).json({ success: false, message: "Error fetching suppliers" });
    }
}

// Lấy chi tiết 1 nhà cung cấp theo ID
export async function getSupplierById(req, res) {
    try {
        const { id } = req.params;
        const supplier = await db.Supplier.findByPk(id, {
            include: [
                { model: db.Container, as: "containers", attributes: ["id", "container_code", "type", "status"] },
                { model: db.User, as: "user", attributes: ["id", "username", "email"] }
            ]
        });

        if (!supplier) {
            return res.status(404).json({ success: false, message: "Supplier not found" });
        }

        res.status(200).json({ success: true, message: "Supplier details", data: supplier });
    } catch (error) {
        console.error("Error fetching supplier:", error.message);
        res.status(500).json({ success: false, message: "Error fetching supplier" });
    }
}

// Thêm nhà cung cấp mới
export async function createSupplier(req, res) {
    try {
        const { name, contact_person, phone, email, address, user_id } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ success: false, message: "Name and phone are required" });
        }

        const supplier = await db.Supplier.create({ name, contact_person, phone, email, address, user_id });

        res.status(201).json({ success: true, message: "Supplier created", data: supplier });
    } catch (error) {
        console.error("Error creating supplier:", error.message);
        res.status(500).json({ success: false, message: "Error creating supplier" });
    }
}

// Cập nhật nhà cung cấp
export async function updateSupplier(req, res) {
    try {
        const { id } = req.params;
        const supplier = await db.Supplier.findByPk(id);

        if (!supplier) {
            return res.status(404).json({ success: false, message: "Supplier not found" });
        }

        const updates = {};
        ["name", "contact_person", "phone", "email", "address", "user_id"].forEach(field => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: "No fields to update" });
        }

        await supplier.update(updates);
        res.status(200).json({ success: true, message: "Supplier updated", data: supplier });
    } catch (error) {
        console.error("Error updating supplier:", error.message);
        res.status(500).json({ success: false, message: "Error updating supplier" });
    }
}

// Xóa nhà cung cấp
export async function deleteSupplier(req, res) {
    try {
        const { id } = req.params;
        const deleted = await db.Supplier.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Supplier not found" });
        }

        res.status(200).json({ success: true, message: "Supplier deleted" });
    } catch (error) {
        console.error("Error deleting supplier:", error.message);
        res.status(500).json({ success: false, message: "Error deleting supplier" });
    }
}
