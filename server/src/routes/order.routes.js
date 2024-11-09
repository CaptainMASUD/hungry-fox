// routes/orderRoutes.js
import express from 'express';
import orderController from '../controllers/order.controlelr.js'; // Fixed typo in filename
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, orderController.createOrder); // Place a new order
router.get('/', verifyToken, orderController.getUserOrders); // Get orders for the logged-in user

// Admin routes
router.get('/all', verifyToken, verifyAdmin, orderController.getAllOrders); // Get all orders (admin only)
router.put('/:orderId/status', verifyToken, verifyAdmin, orderController.updateOrderStatus); // Update order status (admin only)
router.delete('/:orderId', verifyToken, verifyAdmin, orderController.deleteOrder);

export default router;
