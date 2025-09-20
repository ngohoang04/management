// controllers/MovementControllers.js
import db from "../models/index.js";

// Lấy danh sách Movement
export async function getMovements(req, res) {
    try {
        const movements = await db.Movement.findAll({
            include: [
                { model: db.Container, attributes: ["id", "code"] },
                { model: db.Location, as: "FromLocation", attributes: ["id", "name"] },
                { model: db.Location, as: "ToLocation", attributes: ["id", "name"] }
            ]
        });
        res.status(200).json({ success: true, message: "List of movements", data: movements });
    } catch (error) {
        console.error("Error fetching movements:", error);
        res.status(500).json({ success: false, message: "Error fetching movements" });
    }
}

// Tạo Movement mới
export async function createMovement(req, res) {
    try {
        const { containerId, fromLocationId, toLocationId, departureTime, arrivalTime, status } = req.body;

        // Kiểm tra container & location có tồn tại
        const container = await db.Container.findByPk(containerId);
        if (!container) return res.status(400).json({ success: false, message: "Invalid containerId" });

        const fromLoc = await db.Location.findByPk(fromLocationId);
        if (!fromLoc) return res.status(400).json({ success: false, message: "Invalid fromLocationId" });

        const toLoc = await db.Location.findByPk(toLocationId);
        if (!toLoc) return res.status(400).json({ success: false, message: "Invalid toLocationId" });

        const movement = await db.Movement.create({
            containerId,
            fromLocationId,
            toLocationId,
            departureTime,
            arrivalTime,
            status
        });

        res.status(201).json({ success: true, message: "Movement created", data: movement });
    } catch (error) {
        console.error("Error creating movement:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

// Lấy Movement theo ID
export async function getMovementById(req, res) {
    try {
        const { id } = req.params;
        const movement = await db.Movement.findByPk(id, {
            include: [
                { model: db.Container, attributes: ["id", "code"] },
                { model: db.Location, as: "FromLocation", attributes: ["id", "name"] },
                { model: db.Location, as: "ToLocation", attributes: ["id", "name"] }
            ]
        });
        if (movement) {
            res.status(200).json({ success: true, message: "Movement details", data: movement });
        } else {
            res.status(404).json({ success: false, message: "Movement not found" });
        }
    } catch (error) {
        console.error("Error fetching movement by ID:", error);
        res.status(500).json({ success: false, message: "Error fetching movement by ID" });
    }
}

// Cập nhật Movement
export async function updateMovement(req, res) {
    try {
        const { id } = req.params;
        const movement = await db.Movement.findByPk(id);
        if (!movement) return res.status(404).json({ success: false, message: "Movement not found" });

        await movement.update(req.body);

        res.status(200).json({ success: true, message: "Movement updated", data: movement });
    } catch (error) {
        console.error("Error updating movement:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

// Xóa Movement
export async function deleteMovement(req, res) {
    try {
        const { id } = req.params;
        const deleted = await db.Movement.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ success: true, message: "Movement deleted" });
        } else {
            res.status(404).json({ success: false, message: "Movement not found" });
        }
    } catch (error) {
        console.error("Error deleting movement:", error);
        res.status(500).json({ success: false, message: "Error deleting movement" });
    }
}
