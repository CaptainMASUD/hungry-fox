// models/orderModel.js
import db from '../config/db.js';

const Order = {
  create: (userId, foodItems, totalAmount, customerName, address, phone, callback) => {
    const query = 'INSERT INTO Orders (userId, foodItems, totalAmount, customerName, address, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [userId, JSON.stringify(foodItems), totalAmount, customerName, address, phone, 'Pending'], callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM Orders';
    db.query(query, callback);
  },

  getByUserId: (userId, callback) => {
    const query = 'SELECT * FROM Orders WHERE userId = ?';
    db.query(query, [userId], callback);
  },

  updateStatus: (orderId, status, callback) => {
    const query = 'UPDATE Orders SET status = ? WHERE id = ?';
    db.query(query, [status, orderId], callback);
  },

  delete: (orderId, callback) => {
    const query = 'DELETE FROM Orders WHERE id = ?';
    db.query(query, [orderId], callback);
  },
};

export default Order;
