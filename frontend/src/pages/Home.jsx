import React from 'react'  
import Nav from '../component/Nav'
import home from "../assets/home1.jpg"
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import Logos from '../component/Logos';
import ExploreCourses from '../component/ExploreCourses';
import CardPage from '../component/CardPage';
import { useNavigate } from 'react-router-dom';
import About from '../component/About';
import Footer from '../component/Footer';
import ReviewPage from '../component/ReviewPage';

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full overflow-hidden">
      {/* Navbar */}
      <Nav/>

      {/* Image container */}
      <div className='w-full relative lg:h-[140vh] h-[70vh]'>

        {/* Background Image */}
        <img 
          src={home} 
          className='object-cover w-full h-full'
          alt="Home Background"
        />

        {/* Headings */}
        <div className='absolute w-full flex flex-col items-center justify-center top-[13%] lg:top-[5%] gap-2 px-4 text-center'>
          <span className='lg:text-[70px] md:text-[40px] text-[20px] text-white font-bold'>
            Grow Your Skills to Advance
          </span>
          <span className='lg:text-[70px] md:text-[40px] text-[20px] text-white font-bold'>
            Your Career path
          </span>
        </div>

        {/* Buttons for large screens */}
        <div className='hidden lg:flex absolute w-full top-[30%] justify-center gap-4 px-4'>
          <button className='flex items-center gap-2 px-5 py-3 border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/allcourses")} >
            View All Courses <SiViaplay className='w-[30px] h-[30px] fill-white' />
          </button>

          <button className='flex items-center gap-2 px-5 py-3 bg-white text-black rounded-[10px] text-[18px] font-light cursor-pointer' onClick={() => navigate("/search")}>
            Search With AI 
            <img src={ai} className='w-[30px] h-[30px] rounded-full' alt="" />
          </button>
        </div>
      </div>

      {/* Buttons for mobile/medium screens */}
      <div className='flex flex-wrap justify-center items-center gap-4 mt-4 px-4 lg:hidden'>
        <button className='flex items-center gap-2 px-5 py-3 border-2 border-black text-black rounded-[10px] text-[18px] font-light cursor-pointer'  onClick={()=>navigate("/allcourses")}>
          View All Courses <SiViaplay className='w-[30px] h-[30px] fill-black' />
        </button>

        <button className='flex items-center gap-2 px-5 py-3 bg-black text-white rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/search")} >
          Search With AI 
          <img src={ai1} className='w-[35px] h-[35px] rounded-full' alt="" />
        </button>
      </div>

      {/* Logos */}
      <div className='mt-6 px-4'>
        <Logos/>
        <ExploreCourses />
        <CardPage />
        <About/>
       <ReviewPage/>

      </div>
       <Footer/>
    </div>
  )
}

export default Home;
