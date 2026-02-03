import express from 'express';
import { createStripeOrder, enrollUser } from '../controller/orderController.js'; 
import isAuth from '../middleware/isAuth.js'; 
const router = express.Router();
router.post('/create-stripe-order', isAuth, createStripeOrder);
router.post('/enroll-user', isAuth, enrollUser);

export default router;