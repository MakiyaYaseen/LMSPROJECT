import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify'; 

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const courseId = searchParams.get('courseId');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const finalizeEnrollment = async () => {
            try {
                const response = await axios.post(
                    `${serverUrl}/api/order/enroll-user`,
                    { courseId },
                    { withCredentials: true }
                );

                if (response.data.success) {
                    toast.success("Course Unlocked Successfully!"); 
                    setLoading(false);
                }
            } catch (error) {
                console.error("Enrollment error:", error);
                toast.error("Failed to unlock course. Please contact support.");
                setLoading(false);
            }
        };

        if (courseId) {
            finalizeEnrollment();
        }
    }, [courseId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
                {loading ? (
                    <div className="space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                        <p className="text-lg font-medium text-gray-700">Unlocking your course...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-6xl text-green-500">✅</div>
                        <h1 className="text-3xl font-bold text-gray-800">Payment Success!</h1>
                        <p className="text-gray-600">
                            Mubarak ho! Aapne successfully course khareed liya hai. Ab aap lectures dekh sakte hain.
                        </p>
                        <button
                            onClick={() => navigate(`/viewcourse/${courseId}`)} // Path ko App.jsx ke mutabiq /viewcourse/ kar diya hai
                            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
                        >
                            Go to Course
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;