// controllers/LocationController.js
const db = require("../models");

// Lấy tất cả locations
exports.getLocations = async (req, res) => {
    try {
        const locations = await db.Location.findAll();
        res.status(200).json({ success: true, message: "List of locations", data: locations });
    } catch (error) {
        console.error("Error fetching locations:", error.message);
        res.status(500).json({ success: false, message: "Error fetching locations" });
    }
};

// Lấy location theo ID
exports.getLocationById = async (req, res) => {
    try {
        const location = await db.Location.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ success: false, message: "Location not found" });
        }
        res.status(200).json({ success: true, message: "Location details", data: location });
    } catch (error) {
        console.error("Error fetching location:", error.message);
        res.status(500).json({ success: false, message: "Error fetching location" });
    }
};

// Thêm location mới
exports.createLocation = async (req, res) => {
    try {
        const { name, address, type } = req.body;
        if (!name || !type) {
            return res.status(400).json({ success: false, message: "Name and type are required" });
        }

        const location = await db.Location.create({ name, address, type });
        res.status(201).json({ success: true, message: "Location created", data: location });
    } catch (error) {
        console.error("Error creating location:", error.message);
        res.status(500).json({ success: false, message: "Error creating location" });
    }
};

// Cập nhật location
exports.updateLocation = async (req, res) => {
    try {
        const location = await db.Location.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ success: false, message: "Location not found" });
        }

        // chỉ update field có trong body
        const updates = {};
        ["name", "address", "type"].forEach((field) => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        await location.update(updates);
        res.status(200).json({ success: true, message: "Location updated", data: location });
    } catch (error) {
        console.error("Error updating location:", error.message);
        res.status(500).json({ success: false, message: "Error updating location" });
    }
};

// Xóa location
exports.deleteLocation = async (req, res) => {
    try {
        const deleted = await db.Location.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Location not found" });
        }
        res.status(200).json({ success: true, message: "Location deleted" });
    } catch (error) {
        console.error("Error deleting location:", error.message);
        res.status(500).json({ success: false, message: "Error deleting location" });
    }
};
