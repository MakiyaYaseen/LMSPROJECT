import Stripe from 'stripe';
import User from '../model/userModel.js';
import Course from '../model/courseModel.js';
import mongoose from 'mongoose'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1. Stripe Session Create Karna (ISAY AISE HI REHNE DEIN)
export const createStripeOrder = async (req, res) => {
    try {
        const { courseId, title, price, thumbnail } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'pkr',
                        product_data: {
                            name: title,
                            images: [thumbnail || "https://via.placeholder.com/150"],
                        },
                        unit_amount: Math.round(price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/payment-success?courseId=${courseId}`,
            cancel_url: `http://localhost:5173/view-course/${courseId}`,
            metadata: {
                courseId: courseId,
            }
        });

        res.status(200).json({ 
            success: true, 
            url: session.url 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. User ko Enroll Karna (Mera Updated Version Paste Karein)
export const enrollUser = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.userId;

        console.log("Starting Enrollment for User:", userId); 
        console.log("For Course ID:", courseId); 

        if (!userId || !courseId) {
            return res.status(400).json({ success: false, message: "Missing User ID or Course ID" });
        }

        // 1. User update karein
        const userUpdate = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { enrolledCourses: courseId } },
            { new: true }
        );
        console.log("User Update Result:", userUpdate ? "Success" : "Failed");

        // 2. Course update karein
        const courseUpdate = await Course.findByIdAndUpdate(
            courseId,
            { $addToSet: { enrolledStudent: userId } },
            { new: true }
        );
        console.log("Course Update Result:", courseUpdate ? "Success" : "Failed");

        if (!userUpdate || !courseUpdate) {
            return res.status(404).json({
                success: false,
                message: "User ya Course database mein nahi mila."
            });
        }

        res.status(200).json({
            success: true,
            message: "Database Updated! Enrollment Successful."
        });

    } catch (error) {
        console.error("Enrollment Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};