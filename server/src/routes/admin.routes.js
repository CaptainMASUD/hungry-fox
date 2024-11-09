import express from 'express';
import foodController from '../controllers/fooditem.controllers.js';
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";
import upload from '../config/multer.js';
import authController from '../controllers/auth.controllers.js';

const router = express.Router();

// Get all food items
router.get('/foods', foodController.getAll);

// Public route: Get count of all food items
router.get('/foods/count', foodController.getCount);

//food cruds for admin
router.post('/food', verifyToken, verifyAdmin, upload, foodController.addFoodItem);
router.delete('/food/:id', verifyToken, verifyAdmin, foodController.deleteFoodItem);
router.put('/food/:id', verifyToken, verifyAdmin, upload, foodController.updateFoodItem);

//user crud for admin
router.get('/users', verifyToken, verifyAdmin, authController.getAllUsers);
router.put('/user/:id', verifyToken, verifyAdmin, authController.editUser);
router.delete('/user/:id', verifyToken, verifyAdmin, authController.deleteUser);
export default router;
