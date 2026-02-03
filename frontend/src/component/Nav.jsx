import React, { useState } from 'react'; 
import logo from "../assets/logo.jpg";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import useGetCurrentUser from '../customHooks/getCurrentUser';

const Nav = () => {
    const { userData } = useSelector(state => state.user);
    const loading = useGetCurrentUser(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show,setShow] = useState(false);
    const [showHam,setShowHam] = useState(false);
    const firstLetter = userData?.email ? userData.email[0].toUpperCase() : '';
    
    const handleLogOut = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
            dispatch(setUserData(null));
            toast.success("LogOut Successfully");
            navigate("/"); 
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout Failed");
        }
    };

    // Avatar component
    const ProfileAvatar = (
        <div 
            className='w-[50px] h-[50px] rounded-full border-2 border-white flex items-center justify-center text-white text-xl font-bold cursor-pointer overflow-hidden'
            onClick={() => setShow(prev => !prev)}
        >
            {userData?.photoUrl ? (
                <img 
                    src={userData.photoUrl} 
                    alt="Profile" 
                    className='w-full h-full object-cover' 
                />
            ) : (
                firstLetter
            )}
        </div>
    );

    // Mobile Avatar component
    const MobileAvatar = (
        userData?.photoUrl ? (
            <img 
                src={userData.photoUrl} 
                alt="Profile" 
                className='w-[50px] h-[50px] rounded-full object-cover cursor-pointer' 
                onClick={() => setShowHam(prev => !prev)}
            />
        ) : (
            <div 
                className='w-[50px] h-[50px] rounded-full bg-black border-2 border-white flex items-center justify-center text-white text-xl font-bold cursor-pointer'
                onClick={() => setShowHam(prev => !prev)}
            >
                {firstLetter}
            </div>
        )
    );

    return (
        <div className='w-full h-[60px] md:h-[65px] lg:h-[70px] fixed top-0 px-5 py-2.5 flex items-center justify-between bg-[#00000047] z-10'>
            
            {/* Logo */}
            <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
                <img src={logo} alt="Logo" className='w-[60px] rounded-[5px] border-2 border-white' />
            </div>

            {/* Desktop Right Side */}
            <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>
                {userData && ProfileAvatar}

                {/* Dropdown menu */}
                {show && userData && (
                    <div className='absolute top-[110%] right-[15%] flex flex-col gap-2 text-[16px] rounded-md bg-white px-[15px] py-2.5 border-2 border-black hover:border-white hover:text-white cursor-pointer hover:bg-black'>
                        <span 
                            onClick={() => { 
                                navigate("/profile"); 
                                setShow(false); 
                            }} 
                            className='bg-black text-white px-[30px] py-2.5 rounded-2xl hover:bg-gray-600'>
                            My Profile
                        </span>
                        <span 
                            onClick={() =>  navigate("/mycourses")} 
                            className='bg-black text-white px-[30px] py-2.5 rounded-2xl hover:bg-gray-600'>
                            My Courses
                        </span>
                    </div>
                )}

                {/* Dashboard button */}
                {!loading && userData?.role === "educator" && (
                    <div className='px-5 py-2.5 border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer'
                        onClick={() => navigate("/dashboard")} >
                        Dashboard
                    </div>
                )}

                {/* Login / Signup / Logout */}
                {!userData ? (
                    <>
                        <span 
                            className='px-5 py-2.5 border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]'
                            onClick={() => navigate("/login")}>
                            Login
                        </span>
                        <span
                            className='px-5 py-2.5 border-2 border-white text-black rounded-[10px] text-[18px] font-light cursor-pointer bg-white'
                            onClick={() => navigate("/signup")}>
                            Signup
                        </span>
                    </>
                ) : (
                    <span
                        className='px-5 py-2.5 bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer'
                        onClick={handleLogOut}>
                        LogOut
                    </span>
                )}
            </div>

            {/* Mobile Hamburger */}
            <GiHamburgerMenu 
                className='w-[35px] h-[35px] fill-white lg:fill-black lg:hidden cursor-pointer' 
                onClick={()=>setShowHam(prev=>!prev)}
            />

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-screen h-screen bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showHam ? "translate-x-0 transition duration-500" : "-translate-x-full transition duration-500"}`}>
                <ImCross className='w-[35px] h-[35px] fill-white absolute top-5 right-[4%]' onClick={()=>setShowHam(prev=>!prev)} />

                {userData && MobileAvatar}

                {/* Menu buttons */}
                <div className='flex flex-col gap-4'>
                    {userData && (
                        <>
                            <span 
                                onClick={() => { navigate("/profile"); setShowHam(false); }} 
                                className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer'>
                                My Profile
                            </span>
                            <span 
                                onClick={() =>  navigate("/mycourses")} 
                                className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer'>
                                My Courses
                            </span>
                        </>
                    )}
                    {!loading && userData?.role === "educator" && (
                        <div className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer'
                            onClick={() => { navigate("/dashboard"); setShowHam(false); }} >
                            Dashboard
                        </div>
                    )}
                    {!userData ? (
                        <>
                            <span
                                className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer'
                                onClick={() => { navigate("/login"); setShowHam(false); }}> 
                                Login 
                            </span>
                            <span
                                className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-black bg-white rounded-[10px] text-[18px] font-light cursor-pointer'
                                onClick={() => { navigate("/signup"); setShowHam(false); }}> 
                                Signup 
                            </span>
                        </>
                    ) : (
                        <span
                            className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer'
                            onClick={handleLogOut}>
                            LogOut
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Nav;
