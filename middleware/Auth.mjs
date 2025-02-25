import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

const auth = async (req, res, next) => {
    try {
    // Get token from header
    const token = req.header('x-auth-token');
    
    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // Add user from payload
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
    
    req.user = user;
    next();
    } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
    }
};

export default auth;