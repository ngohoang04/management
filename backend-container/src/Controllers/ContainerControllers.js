// controllers/ContainerController.js
import db from "../models/index.js";
import { Op } from "sequelize";

export async function getContainers(req, res) {
    try {
        const containers = await db.Container.findAll({
            include: [
                { model: db.Warehouse, as: "warehouse", attributes: ["id", "name", "location"] },
                { model: db.Supplier, as: "supplier", attributes: ["id", "name", "contact_person"] },
                { model: db.Customer, as: "customer", attributes: ["id", "name", "phone"] }
            ],
            order: [["id", "DESC"]]
        });

        res.status(200).json({
            success: true,
            message: "List of containers",
            data: containers
        });
    } catch (error) {
        console.error("Error fetching containers:", error.message);
        res.status(500).json({ success: false, message: "Error fetching containers" });
    }
}
export async function getContainerById(req, res) {
    try {
        const { id } = req.params;
        const container = await db.Container.findByPk(id, {
            include: [
                { model: db.Warehouse, as: "warehouse", attributes: ["id", "name", "location"] },
                { model: db.Supplier, as: "supplier", attributes: ["id", "name", "contact_person"] },
                { model: db.Customer, as: "customer", attributes: ["id", "name", "phone"] }
            ]
        });

        if (!container)
            return res.status(404).json({ success: false, message: "Container not found" });

        res.status(200).json({
            success: true,
            message: "Container details",
            data: container
        });
    } catch (error) {
        console.error("Error fetching container by ID:", error.message);
        res.status(500).json({ success: false, message: "Error fetching container by ID" });
    }
}


export async function insertContainer(req, res) {
    try {
        const { container_code, type, size, status, warehouse_id, supplier_id, customer_id } = req.body;

        if (!container_code || !type) {
            return res.status(400).json({ success: false, message: "Container code and type are required" });
        }

        // Kiểm tra trùng container_code
        const exists = await db.Container.findOne({ where: { container_code } });
        if (exists) {
            return res.status(400).json({ success: false, message: "Container code already exists" });
        }

        const container = await db.Container.create({
            container_code,
            type,
            size,
            status,
            warehouse_id,
            supplier_id,
            customer_id
        });

        res.status(201).json({ success: true, message: "Container created", data: container });
    } catch (error) {
        console.error("Error inserting container:", error.message);
        res.status(400).json({ success: false, message: "Error inserting container" });
    }
}


export async function updateContainer(req, res) {
    try {
        const { id } = req.params;
        const container = await db.Container.findByPk(id);
        if (!container) {
            return res.status(404).json({ success: false, message: "Container not found" });
        }

        const fields = ["container_code", "type", "size", "status", "warehouse_id", "supplier_id", "customer_id"];
        const updates = {};

        for (const field of fields) {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: "No fields to update" });
        }

        await container.update(updates);
        res.status(200).json({ success: true, message: "Container updated", data: container });
    } catch (error) {
        console.error("Error updating container:", error.message);
        res.status(400).json({ success: false, message: "Error updating container" });
    }
}


export async function deleteContainer(req, res) {
    try {
        const { id } = req.params;
        const deleted = await db.Container.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Container not found" });
        }
        res.status(200).json({ success: true, message: "Container deleted" });
    } catch (error) {
        console.error("Error deleting container:", error.message);
        res.status(500).json({ success: false, message: "Error deleting container" });
    }
}

// Thống kê container
export async function countAllContainers(req, res) {
    try {
        const total = await db.Container.count();
        res.status(200).json({ success: true, total });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error counting containers" });
    }
}

// Tổng theo loại container
export async function countByType(req, res) {
    try {
        const result = await db.Container.findAll({
            attributes: ["type", [db.sequelize.fn("COUNT", db.sequelize.col("type")), "count"]],
            group: ["type"]
        });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error counting by type" });
    }
}

// Tổng theo trạng thái
export async function countByStatus(req, res) {
    try {
        const result = await db.Container.findAll({
            attributes: ["status", [db.sequelize.fn("COUNT", db.sequelize.col("status")), "count"]],
            group: ["status"]
        });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error counting by status" });
    }
}

// Tổng theo kho
export async function countByWarehouse(req, res) {
    try {
        const result = await db.Container.findAll({
            attributes: ["warehouse_id", [db.sequelize.fn("COUNT", db.sequelize.col("warehouse_id")), "count"]],
            include: [{ model: db.Warehouse, as: "warehouse", attributes: ["name"] }],
            group: ["warehouse_id", "warehouse.id"]
        });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error counting by warehouse" });
    }
}

// Tổng theo nhà cung cấp
export async function countBySupplier(req, res) {
    try {
        const result = await db.Container.findAll({
            attributes: ["supplier_id", [db.sequelize.fn("COUNT", db.sequelize.col("supplier_id")), "count"]],
            include: [{ model: db.Supplier, as: "supplier", attributes: ["name"] }],
            group: ["supplier_id", "supplier.id"]
        });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error counting by supplier" });
    }
}

// Tổng theo khách hàng
export async function countByCustomer(req, res) {
    try {
        const result = await db.Container.findAll({
            attributes: ["customer_id", [db.sequelize.fn("COUNT", db.sequelize.col("customer_id")), "count"]],
            include: [{ model: db.Customer, as: "customer", attributes: ["name"] }],
            group: ["customer_id", "customer.id"]
        });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error counting by customer" });
    }
}
