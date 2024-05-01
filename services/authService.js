import jwt from 'jsonwebtoken';
import { authenticateUser } from './userService.js';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key_here'; 

export const login = (username, password) => {
    const user = authenticateUser(username, password);
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, username: user.username, roles: user.roles }, SECRET_KEY, { expiresIn: '2h' });
    return token;
};