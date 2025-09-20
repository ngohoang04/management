// controllers/ContainerController.js
import db from "../models/index.js";

// Lấy danh sách container
export async function getContainers(req, res) {
    try {
        const containers = await db.Container.findAll({
            include: [
                { model: db.Location, attributes: ["id", "name", "type"] },
                { model: db.Customer, attributes: ["id", "name", "phone"] }
            ]
        });
        res.status(200).json({ success: true, message: "List of containers", data: containers });
    } catch (error) {
        console.error("Error fetching containers:", error.message);
        res.status(500).json({ success: false, message: "Error fetching containers" });
    }
}

// Lấy chi tiết 1 container theo ID
export async function getContainerById(req, res) {
    try {
        const { id } = req.params;
        const container = await db.Container.findByPk(id, {
            include: [
                { model: db.Location, attributes: ["id", "name", "type"] },
                { model: db.Customer, attributes: ["id", "name", "phone"] }
            ]
        });
        if (!container) {
            return res.status(404).json({ success: false, message: "Container not found" });
        }
        res.status(200).json({ success: true, message: "Container details", data: container });
    } catch (error) {
        console.error("Error fetching container by ID:", error.message);
        res.status(500).json({ success: false, message: "Error fetching container by ID" });
    }
}

// Thêm container mới
export async function insertContainer(req, res) {
    try {
        const { code, type, size, weight, status, locationId, ownerId } = req.body;

        if (!code || !type) {
            return res.status(400).json({ success: false, message: "Code and type are required" });
        }

        const container = await db.Container.create({ code, type, size, weight, status, locationId, ownerId });
        res.status(201).json({ success: true, message: "Container created", data: container });
    } catch (error) {
        console.error("Error inserting container:", error.message);
        res.status(400).json({ success: false, message: "Error inserting container" });
    }
}

// Cập nhật container
export async function updateContainer(req, res) {
    try {
        const { id } = req.params;
        const container = await db.Container.findByPk(id);
        if (!container) {
            return res.status(404).json({ success: false, message: "Container not found" });
        }

        // chỉ update field có trong body
        const updates = {};
        ["code", "type", "size", "weight", "status", "locationId", "ownerId"].forEach((field) => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

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

// Xóa container
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
