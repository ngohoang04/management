// controllers/LocationController.js
const db = require("../models");

// Lấy tất cả locations
exports.getLocations = async (req, res) => {
    try {
        const locations = await db.Location.findAll();
        res.status(200).json({ success: true, data: locations });
    } catch (error) {
        console.error("Error fetching locations:", error);
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
        res.status(200).json({ success: true, data: location });
    } catch (error) {
        console.error("Error fetching location:", error);
        res.status(500).json({ success: false, message: "Error fetching location" });
    }
};

// Thêm location mới
exports.createLocation = async (req, res) => {
    try {
        const { name, address, type } = req.body;
        const location = await db.Location.create({ name, address, type });
        res.status(201).json({ success: true, data: location });
    } catch (error) {
        console.error("Error creating location:", error);
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
        await location.update(req.body);
        res.status(200).json({ success: true, data: location });
    } catch (error) {
        console.error("Error updating location:", error);
        res.status(500).json({ success: false, message: "Error updating location" });
    }
};

// Xóa location
exports.deleteLocation = async (req, res) => {
    try {
        const deleted = await db.Location.destroy({ where: { location_id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Location not found" });
        }
        res.status(200).json({ success: true, message: "Location deleted" });
    } catch (error) {
        console.error("Error deleting location:", error);
        res.status(500).json({ success: false, message: "Error deleting location" });
    }
};
