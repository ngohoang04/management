import db from "../models/index.js";

// Lấy tất cả bookings
export async function getBookings(req, res) {
    try {
        const bookings = await db.Booking.findAll({
            include: [
                { model: db.Customer, attributes: ["id", "name", "email"] },
                { model: db.Location, as: "Origin", attributes: ["id", "name"] },
                { model: db.Location, as: "Destination", attributes: ["id", "name"] },
                { model: db.Container, through: { attributes: [] }, attributes: ["id", "code"] }
            ]
        });
        res.status(200).json({ success: true, message: "List of bookings", data: bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ success: false, message: "Error fetching bookings" });
    }
}

// Tạo booking mới
export async function createBooking(req, res) {
    try {
        const { customerId, startDate, endDate, originId, destinationId, status, price, containerIds } = req.body;

        const booking = await db.Booking.create({
            customerId, startDate, endDate, originId, destinationId, status, price
        });

        // Nếu có containerIds thì gán vào bảng trung gian
        if (containerIds && containerIds.length > 0) {
            await booking.setContainers(containerIds);
        }

        const result = await db.Booking.findByPk(booking.id, {
            include: [
                { model: db.Customer, attributes: ["id", "name", "email"] },
                { model: db.Location, as: "Origin", attributes: ["id", "name"] },
                { model: db.Location, as: "Destination", attributes: ["id", "name"] },
                { model: db.Container, through: { attributes: [] }, attributes: ["id", "code"] }
            ]
        });

        res.status(201).json({ success: true, message: "Booking created", data: result });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

// Lấy booking theo ID
export async function getBookingById(req, res) {
    try {
        const { id } = req.params;
        const booking = await db.Booking.findByPk(id, {
            include: [
                { model: db.Customer, attributes: ["id", "name", "email"] },
                { model: db.Location, as: "Origin", attributes: ["id", "name"] },
                { model: db.Location, as: "Destination", attributes: ["id", "name"] },
                { model: db.Container, through: { attributes: [] }, attributes: ["id", "code"] }
            ]
        });
        if (booking) {
            res.status(200).json({ success: true, message: "Booking details", data: booking });
        } else {
            res.status(404).json({ success: false, message: "Booking not found" });
        }
    } catch (error) {
        console.error("Error fetching booking by ID:", error);
        res.status(500).json({ success: false, message: "Error fetching booking by ID" });
    }
}

// Cập nhật booking
export async function updateBooking(req, res) {
    try {
        const { id } = req.params;
        const booking = await db.Booking.findByPk(id);
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

        const { customerId, startDate, endDate, originId, destinationId, status, price, containerIds } = req.body;

        await booking.update({ customerId, startDate, endDate, originId, destinationId, status, price });

        if (containerIds) {
            await booking.setContainers(containerIds);
        }

        const result = await db.Booking.findByPk(id, {
            include: [
                { model: db.Customer, attributes: ["id", "name", "email"] },
                { model: db.Location, as: "Origin", attributes: ["id", "name"] },
                { model: db.Location, as: "Destination", attributes: ["id", "name"] },
                { model: db.Container, through: { attributes: [] }, attributes: ["id", "code"] }
            ]
        });

        res.status(200).json({ success: true, message: "Booking updated", data: result });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

// Xóa booking
export async function deleteBooking(req, res) {
    try {
        const { id } = req.params;
        const deleted = await db.Booking.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ success: true, message: "Booking deleted" });
        } else {
            res.status(404).json({ success: false, message: "Booking not found" });
        }
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ success: false, message: "Error deleting booking" });
    }
}