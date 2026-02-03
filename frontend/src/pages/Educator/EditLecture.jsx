import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
import axios from 'axios';
import { setLectureData } from '../../redux/lectureSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const EditLecture = () => {
    const {courseId , lectureId} = useParams()
    const {lectureData} = useSelector(state=>state.lecture)
    
    // ✅ FIX 3: Safety check ke liye default object set karein
    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId) || {}

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    // ✅ FIX 3: State ko safe tareeke se initialize karein
    const [lectureTitle , setLectureTitle] = useState(selectedLecture.lectureTitle || "") 
    const [videoFile, setVideoFile] = useState(null) // File ke liye
    const [isPreviewFree,setIsPreviewFree] = useState(selectedLecture.isPreviewFree || false)
    
    const [loading,setLoading] = useState(false) // Update button ke liye
    const [loading1,setLoading1] = useState(false) // Remove button ke liye

    // Agar data load nahi hua toh render nahi karein (crash se bachne ke liye)
    if (!selectedLecture._id) return <div>Loading lecture data...</div>;

    // 🔑 FIX 2: FormData ko handler function ke andar move kiya gaya hai
    const handleEditLecture = async () => {
        setLoading(true)

        // ✅ FIX 2: FormData object ko yahan banayein
        const formdata = new FormData() 
        formdata.append("lectureTitle",lectureTitle)
        formdata.append("isPreviewFree",isPreviewFree)
        
        // Ensure backend key (videoUrl) is used
        if (videoFile) {
            formdata.append("videoUrl", videoFile); 
        }

        try {
            // ✅ FIX 1: Ab yahan axios.post use karna sahi hai (kyuki backend route badal gaya)
            const result = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}` , formdata , {
                withCredentials:true,
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            
            // Redux State Update (Purane lecture ko dhoond kar naye data se replace karein)
            const updatedLectures = lectureData.map(lecture => 
                lecture._id === lectureId ? result.data : lecture
            );
            dispatch(setLectureData(updatedLectures));

            toast.success("Lecture Updated")
            navigate(`/createlecture/${courseId}`) 
            setLoading(false)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "An unknown error occurred during update")
            setLoading(false)
        }
    }

    const removeLecture = async () => {
        setLoading1(true)
        try {
           const result = await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}` , {withCredentials:true}) 
           setLoading1(false)
           
           // Redux State Update after deletion:
           const filteredLectures = lectureData.filter(lecture => lecture._id !== lectureId);
           dispatch(setLectureData(filteredLectures));

           toast.success("Lecture Removed")
           navigate(`/createlecture/${courseId}`) 
        } catch (error) {
            console.error(error)
            setLoading1(false)
            toast.error(error.response?.data?.message || "An unknown error occurred during removal")
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
            <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6'>
                {/* ... (Header) */}
                
                <button 
                    className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm disabled:bg-red-400' 
                    disabled={loading1} 
                    onClick={removeLecture} 
                >
                    {loading1 ? <ClipLoader size={16} color='white' /> : "Remove Lecture"}
                </button>
                
                <div className='space-y-4'>
                    {/* Lecture Title Input */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="lectureTitle">LectureTitle *</label>
                        <input 
                            type="text" 
                            id="lectureTitle"
                            className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black] focus:outline-none' 
                            required  
                            onChange={(e) => setLectureTitle(e.target.value)}  
                            value={lectureTitle}
                        />
                    </div>
                    
                    {/* Video Input */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="videoFile">
                            Video * (Selected: {videoFile ? videoFile.name : "No new file"})
                        </label>
                        <input 
                            type="file" 
                            id="videoFile"
                            className='w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-[white] hover:file:bg-gray-500' 
                            accept='video/*' 
                            onChange={(e) => setVideoFile(e.target.files[0])}
                        /> 
                    </div>
                    
                    {/* Checkbox */}
                    <div className='flex items-center gap-3' >
                        <input 
                            type="checkbox" 
                            className='accent-[black] h-4 w-4' 
                            id='isFree' 
                            checked={isPreviewFree} 
                            onChange={() => setIsPreviewFree(prev => !prev )} 
                        />
                        <label htmlFor="isFree" className='text-sm text-gray-700 cursor-pointer select-none' >Is this Video FREE </label>
                    </div>
                    {loading && <p className='text-sm text-blue-600'>Uploading video ...... Please wait.</p>}
                </div>
                
                {/* Update Button */}
                <div className='pt-4' >
                    <button 
                        className='w-full bg-black text-white rounded-md text-sm font-medium py-3 hover:bg-gray-700 transition disabled:bg-gray-400' 
                        disabled={loading} 
                        onClick={handleEditLecture}
                    >
                        {loading ? <ClipLoader size={30} color='white' /> : "Update Lecture"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditLecture