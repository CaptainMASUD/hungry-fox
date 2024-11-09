// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided.' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    req.user = {
      userId : decoded.id,
      isAdmin : decoded.isAdmin
    }
    
     // Attach the isAdmin status to the request
    next();
  });
};


export const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied, admin privileges required.' });
  }
  next();
};
