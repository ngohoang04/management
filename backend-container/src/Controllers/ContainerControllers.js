// controllers/ContainerControllers.js
import db from '../models/index.js';
import { Sequelize } from "sequelize";
export async function getContainers(req, res) {
    try {
        const containers = await db.Container.findAll();
        res.status(200).json({
            message: 'List of containers',
            data: containers
        });
    } catch (error) {
        console.gerror('Error fetching containers:', error);
        res.status(500).json({ message: 'Error fetching containers' });
    }
}

export async function insertContainer(req, res) {
    try {
        const container = await db.Container.create(req.body);
        res.status(201).json({
            message: 'Container inserted',
            data: container
        });
    } catch (error) {
        console.error('Error inserting container:', error);
        res.status(500).json({ message: 'Error inserting container' });
    }
}

export async function updateContainer(req, res) {
    try {
        const { id } = req.params;
        const [updated] = await db.Container.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedContainer = await db.Container.findByPk(id);
            res.status(200).json({
                message: 'Container updated',
                data: updatedContainer
            });
        } else {
            res.status(404).json({ message: 'Container not found' });
        }
    } catch (error) {
        console.error('Error updating container:', error);
        res.status(500).json({ message: 'Error updating container' });
    }
}

export async function deleteContainer(req, res) {
    try {
        const { id } = req.params;
        const deleted = await db.Container.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Container deleted' });
        } else {
            res.status(404).json({ message: 'Container not found' });
        }
    } catch (error) {
        console.error('Error deleting container:', error);
        res.status(500).json({ message: 'Error deleting container' });
    }
}

export async function getContainerById(req, res) {
    try {
        const { id } = req.params;
        const container = await db.Container.findByPk(id);
        if (container) {
            res.status(200).json({
                message: 'Container details',
                data: container
            });
        } else {
            res.status(404).json({ message: 'Container not found' });
        }
    } catch (error) {
        console.error('Error fetching container by ID:', error);
        res.status(500).json({ message: 'Error fetching container by ID' });
    }
}
