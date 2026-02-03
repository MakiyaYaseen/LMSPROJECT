import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";

const ForgetPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Step 1 — Send OTP
    const sendOtp = async () => {
        setLoading(true);
        try {
            const result = await axios.post(
                serverUrl + "/api/auth/sendotp",
                { email },
                { withCredentials: true }
            );
            toast.success(result.data.message);
            setStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        setLoading(false);
    };

    // Step 2 — Verify OTP
    const verifyOtp = async () => {
        setLoading(true);
        try {
            const result = await axios.post(
                serverUrl + "/api/auth/verifyotp",
                { email, otp },
                { withCredentials: true }
            );
            toast.success(result.data.message);
            setStep(3);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        setLoading(false);
    };

    // Step 3 — Reset Password
    const resetPassword = async () => {
        if (newPassword !== conPassword) {
            return toast.error("Passwords do not match");
        }

        setLoading(true);
        try {
            const result = await axios.post(
                serverUrl + "/api/auth/resetpassword",
                { email, password: newPassword },
                { withCredentials: true }
            );
            toast.success(result.data.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            
            {/* STEP 1 — Send OTP */}
            {step === 1 && (
                <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                    <h2 className='text-2xl font-bold mb-6 text-center'>Forget Your Password</h2>

                    <form className='space-y-4' onSubmit={e => e.preventDefault()}>
                        <div>
                            <label className='block text-sm font-medium'>Enter your email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className='mt-1 w-full px-4 py-2 border rounded-md'
                            />
                        </div>

                        <button
                            className='w-full bg-black text-white py-2 rounded'
                            disabled={loading}
                            onClick={sendOtp}
                        >
                            {loading ? <ClipLoader size={25} color='white' /> : "Send OTP"}
                        </button>
                    </form>

                    <div className='text-center mt-4 cursor-pointer' onClick={() => navigate("/login")}>
                        Back to Login
                    </div>
                </div>
            )}

            {/* STEP 2 — Verify OTP */}
            {step === 2 && (
                <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                    <h2 className='text-2xl font-bold mb-6 text-center'>Enter OTP</h2>

                    <form className='space-y-4' onSubmit={(e)=>e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="* * * *"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            className='w-full px-4 py-2 border rounded-md'
                            required
                        />

                        <button
                            className='w-full bg-black text-white py-2 rounded'
                            disabled={loading}
                            onClick={verifyOtp}
                        >
                            {loading ? <ClipLoader size={25} color='white' /> : "Verify OTP"}
                        </button>
                    </form>
                </div>
            )}

            {/* STEP 3 — Reset Password */}
            {step === 3 && (
                <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                    <h2 className='text-2xl font-bold mb-6 text-center'>Reset Password</h2>

                    <form className='space-y-4' onSubmit={e => e.preventDefault()}>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className='w-full px-4 py-2 border rounded-md'
                            required
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={conPassword}
                            onChange={e => setConPassword(e.target.value)}
                            className='w-full px-4 py-2 border rounded-md'
                            required
                        />

                        <button
                            className='w-full bg-black text-white py-2 rounded'
                            disabled={loading}
                            onClick={resetPassword}
                        >
                            {loading ? <ClipLoader size={25} color='white' /> : "Reset Password"}
                        </button>
                    </form>

                </div>
            )}
        </div>
    );
};

export default ForgetPassword;
