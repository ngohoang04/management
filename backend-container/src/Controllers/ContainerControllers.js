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
        console.error('Error fetching containers:', error);
        res.status(500).json({ message: 'Error fetching containers' });
    }
}

export async function insertContainer(req, res) {
    try {
        const container = await db.Container.create(req.body);
        res.status(201