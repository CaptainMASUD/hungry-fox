// controllers/order.controller.js
import Order from '../model/order.model.js';

const orderController = {
  // Place a new order
  createOrder: (req, res) => {
    const { foodItems, totalAmount, customerName, address, phone } = req.body;
    const userId = req.user.userId; // Ensure user is authenticated

    Order.create(userId, foodItems, totalAmount, customerName, address, phone, (err, result) => {
      if (err) return res.status(400).json({ error: 'Failed to create order' });
      res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
    });
  },

  // Get all orders for admin
  getAllOrders: (req, res) => {
    Order.getAll((err, results) => {
      if (err) return res.status(500).json({ error: 'Server error' });
      res.json(results);
    });
  },

  // Get orders for the user (only their own orders)
  getUserOrders: (req, res) => {
    const userId = req.user.userId;
    Order.getByUserId(userId, (err, results) => {
      if (err) return res.status(500).json({ error: 'Server error' });
      res.json(results);
    });
  },

  // Update order status (admin only)
  updateOrderStatus: (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate the status
    if (!['Pending', 'In-Delivery', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    Order.updateStatus(orderId, status, (err) => {
      if (err) return res.status(400).json({ error: 'Failed to update order status' });
      res.json({ message: 'Order status updated successfully' });
    });
  },

  // Delete an order (admin only)
  deleteOrder: (req, res) => {
    const { orderId } = req.params;

    Order.delete(orderId, (err) => {
      if (err) return res.status(400).json({ error: 'Failed to delete order' });
      res.json({ message: 'Order deleted successfully' });
    });
  },
};

export default orderController;
