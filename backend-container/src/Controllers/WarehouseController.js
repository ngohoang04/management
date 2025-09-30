// controllers/WarehouseController.js
import db from "../models/index.js";

// Lấy danh sách kho
export async function getWarehouses(req, res) {
    try {
        const warehouses = await db.Warehouse.findAll({
            include: [
                { model: db.Container, as: "containers", attributes: ["id", "container_code", "type", "status"] }
            ]
        });

        res.status(200).json({ success: true, message: "List of warehouses", data: warehouses });
    } catch (error) {
        console.error("Error fetching warehouses:", error.message);
        res.status(500).json({ success: false, message: "Error fetching warehouses" });
    }
}

// Lấy chi tiết 1 kho theo ID
export async function getWarehouseById(req, res) {
    try {
        const { id } = req.params;
        const warehouse = await db.Warehouse.findByPk(id, {
            include: [
                { model: db.Container, as: "containers", attributes: ["id", "container_code", "type", "status"] }
            ]
        });

        if (!warehouse) {
            return res.status(404).json({ success: false, message: "Warehouse not found" });
        }

        res.status(200).json({ success: true, message: "Warehouse details", data: warehouse });
    } catch (error) {
        console.error("Error fetching warehouse:", error.message);
        res.status(500).json({ success: false, message: "Error fetching warehouse" });
    }
}

// Tạo kho mới
export async function createWarehouse(req, res) {
    try {
        const { name, location, capacity, current_occupancy } = req.body;

        if (!name || !location) {
            return res.status(400).json({ success: false, message: "Name and location are required" });
        }

        const warehouse = await db.Warehouse.create({ name, location, capacity, current_occupancy });

        res.status(201).json({ success: true, message: "Warehouse created", data: warehouse });
    } catch (error) {
        console.error("Error creating warehouse:", error.message);
        res.status(500).json({ success: false, message: "Error creating warehouse" });
    }
}

// Cập nhật kho
export async function updateWarehouse(req, res) {
    try {
        const { id } = req.params;
        const warehouse = await db.Warehouse.findByPk(id);

        if (!warehouse) {
            return res.status(404).json({ success: false, message: "Warehouse not found" });
        }

        const updates = {};
        ["name", "location", "capacity", "current_occupancy"].forEach(field => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: "No fields to update" });
        }

        await warehouse.update(updates);
        res.status(200).json({ success: true, message: "Warehouse updated", data: warehouse });
    } catch (error) {
        console.error("Error updating warehouse:", error.message);
        res.status(500).json({ success: false, message: "Error updating warehouse" });
    }
}

// Xóa kho
export async function deleteWarehouse(req, res) {
    try {
        const { id } = req.params;
        const deleted = await db.Warehouse.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Warehouse not found" });
        }

        res.status(200).json({ success: true, message: "Warehouse deleted" });
    } catch (error) {
        console.error("Error deleting warehouse:", error.message);
        res.status(500).json({ success: false, message: "Error deleting warehouse" });
    }
}
