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
        const user = await d