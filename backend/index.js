import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';
import userRouter from './route/userRoute.js';   
import cors from "cors";
import courseRouter from './route/courseRoute.js';
import orderRoute from './route/orderRoute.js'; 
import reviewRouter from './route/reviewRoute.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}));

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);   
app.use("/api/course", courseRouter);   
app.use('/api/order', orderRoute);
app.use("/api/review", reviewRouter);
// Test Route
app.get("/", (req, res) => {
    res.send("Hello from Server");
});

// Start Server
app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
});
