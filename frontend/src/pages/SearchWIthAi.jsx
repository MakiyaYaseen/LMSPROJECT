import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import ai from '../assets/ai.png';
import { RiMicAiFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import start from '../assets/start.mp3'

const SearchWIthAi = () => {
  const startSound = new Audio(start)
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [listening , setListening] = useState(false)
  function speak(message){
    let utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }
const serverUrl = "http://localhost:8000";     
    const SpeechRecognition = window.SpeechRecognition || window.WebkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleSearch = () => {
    if (!recognition) {
        toast.error("Speech recognition not supported");
        return;
    }
    try {
      setListening(true);
      recognition.start();
      startSound.play()
    } catch (e) {
      console.log("Recognition already active");
    }

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript)
     await handleRecommendation(transcript)
    }
  };
const handleRecommendation = async (query) => {
  try {
    const result = await axios.post(serverUrl + "/api/course/search" ,{input :query}, {withCredentials:true})
    console.log("API Response:", result.data); 
    setRecommendations(result.data)
    setListening(false)
    if(result.data.length > 0){
      speak("Thses are the top courses I found for you")
    }
    else{
      speak("No courses found")
    }
  } catch (error) {
    console.error("API Call Error:", error); 
    setListening(false)

  }
}
  return (
    <div className='min-h-screen bg-linear-to-br from-black to-gray-900 text-white flex flex-col items-center pt-10 sm:pt-16 px-4'> 
      
      <div className='bg-white shadow-xl rounded-3xl p-5 sm:p-8 w-full max-w-2xl text-center relative'>
        
        <FaArrowLeftLong 
            onClick={() => navigate("/")} 
            className='text-black w-5 h-5 cursor-pointer absolute left-5 top-8' 
        />
        
        <h1 className='text-xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2'>
            <img src={ai} alt="ai" className='w-7 h-7' />
            Search with <span className='text-[#CB99C7]'>AI</span>
        </h1>
        <div className='flex items-center bg-gray-700 rounded-full shadow-lg w-full px-2 py-1'>
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)} 
                className='grow h-12 sm:h-14 pl-4  bg-transparent text-white placeholder-gray-400 focus:outline-none text-[10px] sm:text-base' 
                placeholder="What do yuo want to learn? (e.g. AI, MERN...)" />
            <div className='flex items-center gap-1 sm:gap-2 shrink-0'>
        {input && <div className='bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer'>
            <img src={ai} alt="ai" className='w-5 h-5 sm:w-6 sm:h-6' onClick={()=>handleRecommendation(input)} />
        </div>}
                <button 
                    className='bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center' 
                    onClick={handleSearch} 
                >
                    <RiMicAiFill className='w-5 h-5 text-[#cb8]' />
                </button>
            </div>
        </div>
      </div>
{recommendations.length > 0 ?(
  <div className='w-full max-w-6xl mt-12 px-2 sm:px-4'>
    <h1 className='text-xl sm:text-2xl font-semibold mb-6 text-white text-center' >AI Search Results</h1>
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8' >
  {
    recommendations?.map((course,index)=>(
  <div key={index} className='bg-white text-black p-5 rounded-2xl shadow-md hover:shadow-indigo-500/30 transition-all duration-200 border border-gray-200 cursor-pointer hover:bg-gray-200' onClick={()=>navigate(`/viewcourse/${course._id}`)} >
    <h2 className='text-lg font-bold sm:text-xl'>{course.title}</h2>
    <p className='text-sm text-gray-600 mt-1'>{course.category}</p>
  </div>

    ) )
  }
  <div></div>
</div>
  </div>
):( listening ? <h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400'>Listening ....</h1> : <h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400' >No Courses Found Yet</h1>
)}
 </div>
  )
}
export default SearchWIthAi;