import express from 'express';
import { signUp, login, logOut, sendOTP, verifyOTP, resetPassword, googleAuth } from '../controller/authController.js'; 

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logOut);
router.post('/sendotp', sendOTP);
router.post('/verifyotp', verifyOTP);
router.post('/resetpassword', resetPassword);
router.post('/googleauth', googleAuth); 
export default router;
