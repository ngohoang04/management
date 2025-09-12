// controllers/ContainerControllers.js
import db from '../models/index.js';

export async function getContainers(req, res) {
    try {
        const containers = await db.Container.findAll({
            include: [
                { model: db.Location, attributes: ['id', 'name', 'type'] },
                { model: db.Customer, attributes: ['id', 'name', 'phone'] }
            ]
        });
        res.status(200).json({ success: true, message: 'List of containers', data: containers });
    } catch (error) {
        console.error('Error fetching containers:', error);
        res.status(500).json({ success: false, message: 'Error fetching containers' });
    }
}

export async function insertContainer(req, res) {
    try {
        const { code, type, size, weight, status, locationId, ownerId } = req.body;
        const container = await db.Container.create({ code, type, size, weight, status, locationId, ownerId });
        res.status(201).json({ success: true, message: 'Container inserted', data: container });
    } catch (error) {
        console.error('Error inserting container:', error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function updateContainer(req, res) {
    try {
        const { id } = req.params;
        const container = await db.Container.findByPk(id);
        if (!container) return res.status(404).json({ success: false, message: 'Container not found' });

        const { code, type, size, weight, status, locationId, ownerId } = req.body;
        await container.update({ code, type, size, weight, status, locationId, ownerId });
        res.status(200).json({ success: true, message: 'Container updated', data: container });
    } catch (error) {
        console.error('Error updating container:', error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function deleteContainer(req, res) {
    try {
        const { id } = req.params;
        const deleted = await db.Container.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ success: true, message: 'Container deleted' });
        } else {
            res.status(404).json({ success: false, message: 'Container not found' });
        }
    } catch (error) {
        console.error('Error deleting container:', error);
        res.status(500).json({ success: false, message: 'Error deleting container' });
    }
}

export async function getContainerById(req, res) {
    try {
        const { id } = req.params;
        const container = await db.Container.findByPk(id, {
            include: [
                { model: db.Location, attributes: ['id', 'name', 'type'] },
                { model: db.Customer, attributes: ['id', 'name', 'phone'] }
            ]
        });
        if (container) {
            res.status(200).json({ success: true, message: 'Container details', data: container });
        } else {
            res.status(404).json({ success: false, message: 'Container not found' });
        }
    } catch (error) {
        console.error('Error fetching container by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching container by ID' });
    }
}
