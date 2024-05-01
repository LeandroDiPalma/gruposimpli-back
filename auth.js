import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();
const jwtMiddleware = () => {
    const SECRET_KEY = process.env.JWT_SECRET;
    if (!SECRET_KEY) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    return expressjwt({
        secret: SECRET_KEY,
        algorithms: ['HS256'],
        requestProperty: 'auth'
    });
};

export const isAuthenticated = (req, res, next) => {
    if (req.auth && req.auth.user) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

export default jwtMiddleware;
