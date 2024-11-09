import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import orderRoutes from './routes/order.routes.js';
import cookieParser from "cookie-parser"
import cors from 'cors';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // Allow credentials to be sent
}));
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
