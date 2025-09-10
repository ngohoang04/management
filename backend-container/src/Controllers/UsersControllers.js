// UserControllers.js
import { Sequelize } from "sequelize";
import db from '../models/index.js';
export async function getUsers(req, res) {
    try {
        const users = await db.User.findAll();
        res.status(200).json({
            message: 'List of users',
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}

export async function insertUser(req, res) {
    try {
        console.log(JSON.stringify(req.body));
        const user = await db.User.create(req.body)
        res.status(201).json({
            message: 'User inserted',
            data: user
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ message: 'Error inserting user' });
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const [updated] = await db.User.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedUser = await db.User.findByPk(id);
            res.status(200).json({
                message: 'User updated',
                data: updatedUser
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const deleted = await db.User.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}

export async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await db.User.findByPk(id);
        if (user) {
            res.status(200).json({
                message: 'User details',
                data: user
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Error fetching user by ID' });
    }
}
