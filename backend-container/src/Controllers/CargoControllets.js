// controllers/CargoController.js
import db from "../models/index.js";

// Lấy danh sách hàng hóa (cargos)
export async function getCargos(req, res) {
    try {
        const cargos = await db.Cargo.findAll({
            include: [
                { model: db.Container, as: "container", attributes: ["id", "container_code", "type", "status"] }
            ]
        });
        res.status(200).json({ success: true, message: "List of cargos", data: cargos });
    } catch (error) {
        console.error("Error fetching cargos:", error.message);
        res.status(500).json({ success: false, message: "Error fetching cargos" });
    }
}

// Lấy chi tiết 1 cargo theo ID
export async function getCargoById(req, res) {
    try {
        const { id } = req.params;
        const cargo = await db.Cargo.findByPk(id, {
            include: [
                { model: db.Container, as: "container", attributes: ["id", "container_code", "type", "status"] }
            ]
        });

        if (!cargo) {
            return res.status(404).json({ success: false, message: "Cargo not found" });
        }

        res.status(200).json({ success: true, message: "Cargo details", data: cargo });
    } catch (error) {
        console.error("Error fetching cargo:", error.message);
        res.status(500).json({ success: false, message: "Error fetching cargo" });
    }
}

// Thêm cargo mới
export async function createCargo(req, res) {
    try {
        const { container_id, description, weight, volume } = req.body;

        if (!container_id || !description) {
            return res.status(400).json({ success: false, message: "container_id and description are required" });
        }

        const cargo = await db.Cargo.create({ container_id, description, weight, volume });
        res.status(201).json({ success: true, message: "Cargo created", data: cargo });
    } catch (error) {
        console.error("Error creating cargo:", error.message);
        res.status(500).json({ success: false, message: "Error creating cargo" });
    }
}

// Cập nhật cargo
export async function updateCargo(req, res) {
    try {
        const { id } = req.params;
        const cargo = await db.Cargo.findByPk(id);

        if (!cargo) {
            return res.status(404).json({ success: false, message: "Cargo not found" });
        }

        const updates = {};
        ["container_id", "description", "weight", "volume"].forEach(field => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: "No fields to update" });
        }

        await cargo.update(updates);
        res.status(200).json({ success: true, message: "Cargo updated", data: cargo });
    } catch (error) {
        console.error("Error updating cargo:", error.message);
        res.status(500).json({ success: false, message: "Error updating cargo" });
    }
}

// Xóa cargo
export async function deleteCargo(req, res) {
    try {
        const { id } = req.params;
        const deleted = await db.Cargo.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Cargo not found" });
        }

        res.status(200).json({ success: true, message: "Cargo deleted" });
    } catch (error) {
        console.error("Error deleting cargo:", error.message);
        res.status(500).json({ success: false, message: "Error deleting cargo" });
    }
}
