import React from 'react'
import about from '../assets/about.jpg'
import video from "../assets/video.mp4"
import { TfiLayoutLineSolid } from "react-icons/tfi"
import { BsFillPatchCheckFill } from 'react-icons/bs'
function About() {
  return (
    <div className='w-screen lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px]'>
        {/* for image  */}
        <div className='lg:w-[40%] md:w-[80%] w-full h-full flex items-center justify-center relative' >
            <img src={about} alt="" className='w-[80%] h-[90%] rounded-lg' />
            <div className='max-w-[350px] mx-auto p-4 absolute top-[55%] left-[50%]' ><video src={video} className='w-full roundeed-xl shadow-lg border-2 border-white' controls autoPlay loop></video></div>
        </div>
{/* for about  */}
        <div className='lg:w-[50%] md:w-[70%] w-full h-full flex items-start justify-center flex-col px-[35px] md:px-20' >
          <div className='flex text-[20px] items-center justify-center gap-5'>About Us <TfiLayoutLineSolid className='w-10 h-10' /> </div>
          <div className='md:text-[45px] text-[35px] font-semibold'>We Are Maximize Your Learning Growth</div>
          <div className='text-[15px]'>We provide a modern Learning Management System to simplify outline education, track progress, and enhance student-instructor collaboration efficiently. </div>
          <div className='w-full lf:w-[60%]' >
            <div className='flex items-center justify-between mt-10' >
              <div className='flex items-center justify-center gap-2.5' >< BsFillPatchCheckFill className='w-5 h-5' />Simplified Learning</div>
              <div className='flex items-center justify-center gap-2.5' >< BsFillPatchCheckFill className='w-5 h-5' />Expert Trainers</div>
              </div>
               <div className='flex items-center justify-between mt-10' >
              <div className='flex items-center justify-center gap-2.5' >< BsFillPatchCheckFill className='w-5 h-5' />Big Experience</div>
              <div className='flex items-center justify-center gap-2.5' >< BsFillPatchCheckFill className='w-5 h-5' />LifeTime Access</div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default About