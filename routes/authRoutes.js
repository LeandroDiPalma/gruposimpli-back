import express from 'express';
import { login } from '../services/authService.js';

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    try {
        const token = login(username, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

export default router;
