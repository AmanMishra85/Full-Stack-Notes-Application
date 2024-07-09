import 'dotenv/config';
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
//   console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    console.log('No token provided in header');
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
//   console.log('Token:', token);

  if (!token) {
    console.log('Token is missing');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    // console.log('Decoded token:', decoded);
    next();
  } catch (error) {
    console.log('Invalid token', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
