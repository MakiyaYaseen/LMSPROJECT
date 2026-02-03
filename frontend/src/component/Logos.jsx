import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";

const Logos = () => {
  return (
    <div className='w-full min-h-[98px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px]' >
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#0]' > <MdCastForEducation className='w-[35px] h-[35px] fill-[#03394b]' /> 20k+ online Courses</div>
         <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#0]' > <SiOpenaccess className='w-[35px] h-[35px] fill-[#03394b]' /> Life Time Access</div>
          <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#0]' > <FaSackDollar className='w-[35px] h-[35px] fill-[#03394b]' /> Value for money</div>
           <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#0]' > <BiSupport className='w-[35px] h-[35px] fill-[#03394b]' /> Life Time Support</div>
            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#0]' > <FaUsers className='w-[35px] h-[35px] fill-[#03394b]' /> Community Support</div>
    </div>
  )
}

export default Logos