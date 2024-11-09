import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  console.log(req.cookies);
  
  const token = req.cookies.auth_token; 
  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided.' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    req.userId = decoded.id; 
    req.isAdmin = decoded.isAdmin; 
    next();
  });
};


export const verifyAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ error: 'Access denied, admin privileges required.' });
  }
  next();
};
