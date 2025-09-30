// controllers/ContainerHistoryController.js
import db from "../models/index.js";

// Lấy danh sách lịch sử container
export async function getContainerHistories(req, res) {
    try {
        const histories = await db.ContainerHistory.findAll({
            include: [
                { model: db.Container, as: "container", attributes: ["id", "container_code", "type", "status"] },
                { model: db.User, as: "updatedBy", attributes: ["id", "username", "email"] }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ success: true, message: "List of container histories", data: histories });
    } catch (error) {
        console.error("Error fetching container histories:", error.message);
        res.status(500).json({ success: false, message: "Error fetching container histories" });
    }
}

// Lấy chi tiết 1 lịch sử container theo ID
export async function getContainerHistoryById(req, res) {
    try {
        const { id } = req.params;
        const history = await db.ContainerHistory.findByPk(id, {
            include: [
                { model: db.Container, as: "container", attributes: ["id", "container_code", "type", "status"] },
                { model: db.User, as: "updatedBy", attributes: ["id", "username", "email"] }
            ]
        });

        if (!history) {
            return res.status(404).json({ success: false, message: "Container history not found" });
        }

        res.status(200).json({ success: true, message: "Container history details", data: history });
    } catch (error) {
        console.error("Error fetching container history:", error.message);
        res.status(500).json({ success: false, message: "Error fetching container history" });
    }
}

// Tạo mới 1 lịch sử container
export async function createContainerHistory(req, res) {
    try {
        const { container_id, status, updated_by } = req.body;

        if (!container_id || !status || !updated_by) {
            return res.status(400).json({ success: false, message: "container_id, status, and updated_by are required" });
        }

        const history = await db.ContainerHistory.create({ container_id, status, updated_by });
        res.status(201).json({ success: true, message: "Container history created", data: history });
    } catch (error) {
        console.error("Error creating container history:", error.message);
        res.status(500).json({ success: false, message: "Error creating container history" });
    }
}

// Cập nhật lịch sử container
export async function updateContainerHistory(req, res) {
    try {
        const { id } = req.params;
        const history = await db.ContainerHistory.findByPk(id);

        if (!history) {
            return res.status(404).json({ success: false, message: "Container history not found" });
        }

        const updates = {};
        ["container_id", "status", "updated_by"].forEach(field => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: "No fields to update" });
        }

        await history.update(updates);
        res.status(200).json({ success: true, message: "Container history updated", data: history });
    } catch (error) {
        console.error("Error updating container history:", error.message);
        res.status(500).json({ success: false, message: "Error updating container history" });
    }
}

// Xóa lịch sử container
export async function deleteContainerHistory(req, res) {
    try {
        const { id } = req.params;
        const deleted = await db.ContainerHistory.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Container history not found" });
        }

        res.status(200).json({ success: true, message: "Container history deleted" });
    } catch (error) {
        console.error("Error deleting container history:", error.message);
        res.status(500).json({ success: false, message: "Error deleting container history" });
    }
}
