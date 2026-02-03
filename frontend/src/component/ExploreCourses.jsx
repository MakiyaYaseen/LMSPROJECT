import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdOutlineAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const ExploreCourses = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]' >
      
      {/* left/top div */}
      <div className='w-full lg:w-[350px] lg:h-full h-[400px] flex flex-col items-start justify-center gap-1 md:px-10 px-5' >
        <span className='text-[30px] font-semibold'>Explore Courses</span>
        <span className='text-[30px] font-semibold'>Our Courses</span>
        <p className='text-[15px]  text-gray-700'>
         Discover a variety of courses designed to enhance your skills in web development, AI, data science, and more. Learn at your own pace and gain practical knowledge to excel in the digital world.</p> 
       <button className='px-5 py-2.5 border-2 bg-black border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-10 cursor-pointer' onClick={()=>navigate("/allcourses")}>
          Explore Courses <SiViaplay className='w-[22px] h-[22px] fill-white' />
        </button>
      </div>

      {/* right/bottom div */}
      <div className='w-[580px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex flex-wrap gap-4 justify-center mb-[50px] lg:mb-0'>
        
        {/* Card 1 */}
        <div className='w-[130px] h-[120px] font-light text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-full h-[70px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'> 
            <TbDeviceDesktopAnalytics className='w-6 h-6 text-[#6d6c6c]' />
          </div>
          Web Dev
        </div>

        {/* Card 2 */}
        <div className='w-[130px] h-[120px] font-light text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-full h-[70px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'> 
            <LiaUikit className='w-6 h-6 text-[#6d6c6c]' />
          </div>
          UI/UX Designing
        </div>

        {/* Card 3 */}
        <div className='w-[130px] h-[120px] font-light text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-full h-[70px] bg-[#fcb9c8] rounded-lg flex items-center justify-center'> 
            <MdOutlineAppShortcut className='w-6 h-6 text-[#6d6c6c]' />
          </div>
          App Dev
        </div>

        {/* Card 4 */}
        <div className='w-[130px] h-[120px] font-light text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-full h-[70px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'> 
            <FaHackerrank className='w-6 h-6 text-[#6d6c6c]' />
          </div>
          Ethical Hacking
        </div>

        {/* Card 5 */}
        <div className='w-[130px] h-[120px] font-light text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-full h-[70px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'> 
            <RiOpenaiFill className='w-6 h-6 text-[#6d6c6c]' />
          </div>
          AI/ML
        </div>

        {/* Card 6 */}
        <div className='w-[130px] h-[120px] font-light text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-full h-[70px] bg-[#fcb9c8] rounded-lg flex items-center justify-center'> 
            <SiGoogledataproc className='w-6 h-6 text-[#6d6c6c]' />
          </div>
          Data Science
        </div>

        {/* Card 7 */}
        <div className='w-[130px] h-[120px] font-light text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-full h-[70px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'> 
            <BsClipboardData className='w-6 h-6 text-[#6d6c6c]' />
          </div>
          Data Analytics
        </div>

        {/* Card 8 */}
        <div className='w-[130px] h-[120px] font-light text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-full h-[70px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'> 
            <SiOpenaigym className='w-6 h-6 text-[#6d6c6c]' />
          </div>
          AI Tools
        </div>

      </div>
    </div>
  )
}

export default ExploreCourses;
