import { verifyToken } from '../utils/jwt.js';

export const auth = (req, res, next) => {
  const token = req.cookies?.currentUser;

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'No autenticado' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'No autenticado' });
  }
};
