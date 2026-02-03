import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'

const MyEnrolledCourses = () => {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()

    return (
        <div className='min-h-screen w-full px-4 py-9 bg-gray-50 relative'>
            {/* Back Button */}
            <FaArrowLeftLong 
                className='absolute top-[3%] md:top-[3%] left-[5%] w-[22px] h-[22px] cursor-pointer text-gray-700 hover:text-black transition-colors' 
                onClick={() => navigate('/')} 
            />

            <h1 className='text-3xl text-center font-bold text-gray-800 mb-10'>My Enrolled Courses</h1>

            {!userData?.enrolledCourses || userData?.enrolledCourses?.length === 0 ? (
                <div className='flex flex-col items-center justify-center mt-20'>
                    <p className='text-gray-500 text-center w-full text-lg font-medium'>You haven't enrolled in any course yet.</p>
                </div>
            ) : (
                <div className='flex items-stretch justify-center flex-wrap gap-8'>
                    {userData?.enrolledCourses?.map((course, index) => (
                        <div 
                            key={index} 
                            className='bg-white w-full sm:w-[280px] md:w-[300px] rounded-2xl shadow-sm hover:shadow-xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-300'>
                            <div className='h-44 w-full overflow-hidden bg-gray-200'>
                                <img 
                                    src={course?.thumbnail} 
                                    alt={course?.title} 
                                    className='w-full h-full object-cover' 
                                />
                            </div>
                            <div className='p-5 flex flex-col grow'>
                                <div className='min-h-[100px]'> 
                                    <h2 className='text-lg font-bold text-gray-800 line-clamp-2 mb-2 leading-tight'>
                                        {course?.title}
                                    </h2>
                                    <p className='text-xs font-semibold text-gray-400 bg-blue-50 px-2 py-1 rounded inline-block mb-2'>
                                        {course?.category}
                                    </p>
                                    <p className='text-xs text-gray-500 block'>{course?.level}</p>
                                </div>
                                <button 
                                    className='w-full py-3 bg-black text-white rounded-xl text-sm font-bold mt-auto hover:bg-zinc-800 active:scale-95 transition-all'
                                    onClick={() => navigate(`/viewlecture/${course._id}`)}
                                >
                                    Watch Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyEnrolledCourses