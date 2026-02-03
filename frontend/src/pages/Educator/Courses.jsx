import React, { useEffect } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import img from "../../assets/empty.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../../App';
import axios from 'axios';
import { setCreatorCourseData } from '../../redux/courseSlice';

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
  const { creatorCourseData } = useSelector(state => state.course);

  useEffect(() => {
    if (!userData) return; 

    const fetchCreatorCourses = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getcreator", { withCredentials: true });
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCreatorCourses();
  }, [dispatch, userData]);

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='w-full min-h-screen p-4 sm:p-6 bg-gray-100'>
        
        {/* HEADER */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
          <div className='flex items-center justify-start gap-3'>
            <FaArrowLeftLong
              className='w-[22px] h-[22px] cursor-pointer'
              onClick={() => navigate("/dashboard")}
            />
            <h1 className='text-2xl font-semibold'>ALL Created Courses</h1>
          </div>

          <button
            className='bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-150'
            onClick={() => navigate("/createCourse")}
          >
            Create Course
          </button>
        </div>

        {/* TABLE – LARGE SCREENS */}
        <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-auto'>
          <table className='w-full text-sm table-fixed'>
            <thead className='border-b bg-gray-50'>
              <tr>
                <th className='py-3 px-4 w-1/4 text-left'>Courses</th>
                <th className='py-3 px-4 w-1/4 text-center'>Price</th>
                <th className='py-3 px-4 w-1/4 text-center'>Status</th>
                <th className='py-3 px-4 w-1/4 text-center'>Action</th>
              </tr>
            </thead>

            <tbody>
              {creatorCourseData?.map((course, index) => (
                <tr key={index} className='border-b hover:bg-gray-50 transition duration-150'>

                  {/* COLUMN 1 DATA */}
                  <td className='py-3 px-4 w-1/4 text-left'>
                    <div className='inline-flex items-center gap-3'>
                      <div className='min-w-[60px]'> 
                        <img 
                          src={course?.thumbnail || img} 
                          className='w-full h-[55px] object-cover rounded-md' 
                          alt="course thumbnail"
                        />
                      </div>
                      <span>{course?.title}</span>
                    </div>
                  </td>

                  {/* COLUMN 2 – PRICE */}
                  <td className='px-4 py-3 w-1/4'>
                    <div className='flex justify-center items-center h-full'>
                      PKR {course.price ? course.price : "NA"}
                    </div>
                  </td>

                  {/* COLUMN 3 – STATUS */}
                  <td className='px-4 py-3 w-1/4'>
                    <div className='flex justify-center items-center h-full'>
                      <span className={`px-3 py-1 rounded-full text-xs ${course.isPublished ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                        {course.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </td>

                  {/* COLUMN 4 – ACTION */}
                  <td className='px-4 py-3 w-1/4'>
                    <div className='flex justify-center items-center h-full'>
                      <FaEdit className='w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer' onClick={() => navigate(`/editCourse/${course?._id}`)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className='text-center text-sm text-gray-400 mt-6'>A list of recent Courses.</p>
        </div>

        {/* SMALL SCREEN VIEW */}
        <div className='md:hidden space-y-4'>
          {creatorCourseData?.map((course, index) => (
            <div key={index} className='bg-white rounded-lg shadow p-4 flex flex-col gap-3'>
              <div className='flex gap-4 items-center'>
                <img
                  src={course?.thumbnail || img}
                  alt="thumbnail"
                  className='w-16 h-16 rounded-md object-cover'
                />
                <div className='flex-1'>
                  <h2 className='font-medium text-sm'>{course?.title}</h2>
                  <p className='text-gray-600 text-xs mt-1'>
                    PKR {course.price ? course.price : "NA"}
                  </p>
                </div>
                <FaEdit className='w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer' onClick={() => navigate(`/editCourse/${course?._id}`)} />
              </div>  
              <span className={`w-fit px-3 py-1 text-xs rounded-full ${course.isPublished ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                {course.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          ))}
          <p className='text-center text-sm text-gray-400 mt-4'>A list of recent Courses.</p>
        </div>

      </div>
    </div>
  );
};

export default Courses;
