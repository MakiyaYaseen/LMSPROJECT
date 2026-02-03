import React from 'react'
import logo from "../assets/logo.jpg"
import { useNavigate } from 'react-router-dom'
const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-black text-gray-300 py-10 px-6' >
        <div className='w-full mx-auto flex lg:items-center items-start justify-center gap-10 lg:gap-[150px] flex-col lg:flex-row' >
        <div className='lg:w-[40%] md:w-[50%] w-full' >
          <img src={logo} alt="" className='w-[60px] rounded-[5px] border-2 border-white mb-5'  />
          <h2 className='text-xl font-bold text-white mb-3' >Virtual Course</h2>
          <p className='text-sm' >AI-powered learning plarform to help you grow smarter. Learning anything, anytime, anywhere.</p>
        </div>
        <div className='lg:w-[30%] md:w-full' >
          <div className='text-white font-semibold mb-2' >Quicks Links</div>
          <ul className='text-sm space-y-2'>
            <li className='hover:text-white cursor-pointer' onClick={()=>navigate("/")} >Home</li>
            <li className='hover:text-white cursor-pointer' onClick={()=>navigate("/allcourses")} >AllCourses</li>
            <li className='hover:text-white cursor-pointer'onClick={()=>navigate("/login")} >Login</li>
            <li className='hover:text-white cursor-pointer' onClick={()=>navigate("/profile")} >My Profile</li>
          </ul>
        </div>
        <div className='lg:w-[30%] md:w-full' >
          <div className='text-white font-semibold mb-2' >Categories</div>
          <ul className='text-sm space-y-2'>
            <li className='hover:text-white'>We Development</li>
            <li className='hover:text-white '  >App Development</li>
            <li className='hover:text-white '>AI/ML</li>
            <li className='hover:text-white' >UI/UX Development</li>
          </ul>
        </div>
        </div>
        <div  className='border-t border-gray-700 mt-10 pt-5 text-sm text-center text-gray-500'>&copy; {new Date().getFullYear()} LearnAI. All rights reserved.</div>
    </div>
  )
}

export default Footer