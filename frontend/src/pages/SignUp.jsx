import React, { useState } from 'react'
import logo from '../assets/logo.jpg'; 
import google from '../assets/google.jpg';
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

const SignUp = () => { 
  const [show , setShow] = useState(false)
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole]= useState("student")
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSignup = async () => { 
    setLoading(true)
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, password, email, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data))
      setLoading(false)
      toast.success("Signup Successfully")  
      navigate("/")
    } catch (error) {
      console.log(error)  
      setLoading(false)
      toast.error(error.response?.data?.message || "Signup failed")
    }
  }
  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth,provider)
      let user = response.user
      let name = user.displayName
      let email = user.email
      const result = await axios.post(serverUrl + "/api/auth/googleauth" , {name , email ,role}  , {withCredentials:true} )
      dispatch(setUserData(result.data))
      toast.success("Signup Successfully")  
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Google Signup Failed");
      
    }
  }


  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
      <form className="w-[90%] md:w-[800px] h-[620px] bg-white shadow-xl rounded-2xl flex" onSubmit={(e)=>e.preventDefault()} >
        
        {/* Left side (Form Inputs) */}
        <div className='md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-4'> 
          
          <div className='text-center'>
            <h1 className='font-semibold text-black text-2xl'>Let's Get Started</h1>
            <h2 className='text-[#999797] text-[18px]'>Create Your Account</h2>
          </div>

          {/* Name Field */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center'>
            <label htmlFor="name" className='font-semibold'>Name</label>
            <input 
              type="text"
              id="name"
              className='border w-full h-[35px] border-[#e7e6e6] text-[15px] px-2.5 rounded-md 
              focus:outline-none focus:border-black focus:border-2'
              placeholder='Enter your name'  onChange={(e)=>setName(e.target.value)} value={name} />
          </div>

          {/* Email Field */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input 
              type="email"
              id="email"
              className='border w-full h-[35px] border-[#e7e6e6] text-[15px] px-2.5 rounded-md 
              focus:outline-none focus:border-black focus:border-2'
              placeholder='Enter your email'  onChange={(e)=>setEmail(e.target.value)} value={email} />
          </div>

          {/* Password Field */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center relative '>
            <label htmlFor="password" className='font-semibold'>Password</label>
            <input 
              type={show ? "text" : "password"}
              id="password"
              className='border w-full h-[35px] border-[#e7e6e6] text-[15px] px-2.5 rounded-md 
              focus:outline-none focus:border-black focus:border-2'
              placeholder='Enter your password'  onChange={(e)=>setPassword(e.target.value)} value={password} />
            { !show ? 
              <IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer left-[90%] bottom-[10%]' onClick={()=>setShow(prev=>!prev)} /> :
              <IoEye className='absolute w-[20px] h-[20px] cursor-pointer left-[90%] bottom-[10%]' onClick={()=>setShow(prev=>!prev)} />
            }
          </div>

          {/* Student / Educator Buttons */}
          <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
            <span className= {`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "student" ? "border-black " : "border-[#646464]"}`} onClick={()=>setRole("student")}>
              Student
            </span>
            <span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "educator" ? "border-black " : "border-[#646464]"}`} onClick={()=>setRole("educator")}>
              Educator
            </span>
          </div>

          {/* Signup Button */}
          <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[10px]' onClick={handleSignup} disabled={loading} >
            {loading ? <ClipLoader size={30} color='white'/> : "SignUp"} 
          </button>

          {/* OR CONTINUE LINE */}
          <div className="w-[80%] flex items-center justify-center gap-4 mt-2">
            <div className="h-[1px] w-[25%] bg-[#d9d9d9]"></div>
            <p className="text-[#6f6f6f] cursor-pointer text-[15px]">Or Continue</p>
            <div className="h-[1px] w-[25%] bg-[#d9d9d9]"></div>
          </div>
          <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center' onClick={googleSignUp} >
            <img src={google} className='w-[25px]' alt="" />
            <span className='text-[18px] text-gray-500 cursor-pointer'>oogle</span>
          </div>
          <div className='text-[#6f6f6f]'>
            already have an account?
            <span className='underline underline-offset-1 text-[black] cursor-pointer' onClick={()=>navigate("/login")}>Login</span>
          </div>
        </div>

        {/* Right Side Logo */}
        <div className='w-[50%] h-full rounded-r-2xl bg-black items-center justify-center flex-col hidden md:flex'>
          <img src={logo} alt='logo' className='w-80 h-80 object-contain shadow-2xl' />
        </div>

      </form>
    </div>
  )
}

export default SignUp
