import React, { useState, useEffect } from 'react'
import { FaArrowLeftLong, FaStar } from "react-icons/fa6"; 
import { FaPlayCircle, FaLock } from "react-icons/fa";    
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setSelectedCourse } from '../redux/courseSlice'
import img from "../assets/empty.jpg"
import axios from 'axios'
import { serverUrl } from '../App'
import Card from '../component/Card'
import { toast } from 'react-toastify';


const ViewCourse = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { courseId } = useParams()

  const { courseData, selectedCourse } = useSelector(state => state.course)
  const { userData } = useSelector(state => state.user)

  const [selectedLecture, setSelectedLecture] = useState(null)
  const [creatorData, setCreatorData] = useState(null)
  const [creatorCourses, setCreatorCourses] = useState(null)

  const [enrolledNow, setEnrolledNow] = useState(false)
  const [rating,setRating] = useState(0)
  const [comment,setComment] = useState("")
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("success") === "true") {
      setEnrolledNow(true)
    }
  }, [])

  const isEnrolled =
    enrolledNow ||
    selectedCourse?.enrolledStudent?.some(id =>
      String(id._id || id) === String(userData?._id)
    ) ||
    userData?.enrolledCourses?.some(c =>
      String(c._id || c) === String(courseId))

  const fetchCourseData = () => {
    const course = courseData.find(course => course._id === courseId)
    if (course) {
      dispatch(setSelectedCourse(course))
    }
  }

  useEffect(() => {
    if (courseData?.length) {
      fetchCourseData()
    }
  }, [courseData, courseId])

  useEffect(() => {
    if (!selectedCourse?.creator) return
    const handleCreator = async () => {
      try {
        const creatorId = selectedCourse.creator._id || selectedCourse.creator
        const result = await axios.post(
          serverUrl + "/api/course/creator",
          { userId: creatorId },
          { withCredentials: true }
        )
        setCreatorData(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    handleCreator()
  }, [selectedCourse?.creator])

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const filteredCourses = courseData.filter(course => {
        const courseCreatorId = course.creator._id || course.creator
        return courseCreatorId === creatorData._id && course._id !== courseId
      })
      setCreatorCourses(filteredCourses)
    }
  }, [creatorData, courseData, courseId])

  const handleEnrollNow = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/order/create-stripe-order`,
        {
          courseId: selectedCourse._id,
          title: selectedCourse.title,
          price: selectedCourse.price,
          thumbnail: selectedCourse.thumbnail
        },
        { withCredentials: true }
      )

      if (response.data.success && response.data.url) {
        window.location.href = response.data.url
      }
    } catch (error) {
      console.error("Enrollment error:", error)
    }
  }

  const handleSubmitReview = async () => {
    if (!rating || !comment) {
      toast.error("Please give rating and comment");
      return;
    }

    setLoading(true); 

    try {
      const result = await axios.post(
        `${serverUrl}/api/review/createReview`,
        { courseId: selectedCourse._id, rating, comment },
        { withCredentials: true }
      );

      toast.success("Review added successfully");
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    setRating(0);
    setComment("");
    setSelectedLecture(null);
  }, [courseId]);

  const caluculateAvgReview = (reviews) =>{
    if(!reviews || reviews.length === 0){
      return 0
    }
    const total = reviews.reduce((sum , review)=> sum + review.rating , 0)
    return(total / reviews.length).toFixed(1)
  }
    const avgRating = caluculateAvgReview(selectedCourse?.reviews)


  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='w-full md:w-1/2'>
            <FaArrowLeftLong
              className='text-[black] w-[22px] h-[22px] cursor-pointer mb-2'
              onClick={() => navigate("/")}
            />
            <img src={selectedCourse?.thumbnail || img} className='rounded-xl w-full object-cover' />
          </div>

          <div className='flex-1 space-y-2 mt-5'>
            <h2 className='text-2xl font-bold'>{selectedCourse?.title}</h2>
            <p className='text-gray-600'>{selectedCourse?.subTitle}</p>

            <div className='flex items-start flex-col justify-between'>
              <div className='text-yellow-500 font-medium flex gap-2'>
                <span className='flex items-center gap-1'><FaStar />{avgRating}</span>
                <span className='text-gray-400'>(1200 Reviews)</span>
              </div>

              <div>
                <span className='text-lg font-semibold text-black'>PKR {selectedCourse?.price}</span>
                <span className='line-through text-sm text-gray-400'> PKR 3999</span>
              </div>
              <ul className='text-sm text-gray-700 space-y-1 pt-2' >
                <li> ✅ 10+ hours of video content</li>
                <li> ✅ Lifetime access to course </li>
              </ul>

              {isEnrolled ? (
                <button
                  onClick={() => navigate(`/viewlecture/${courseId}`)}
                  className='bg-green-100 text-green-500 px-8 py-2 rounded mt-3 font-semibold hover:bg-green-200 transition-all cursor-pointer'
                >
                  Watch Now
                </button>
              ) : (
                <button
                  onClick={handleEnrollNow}
                  className='bg-[black] text-white px-8 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer transition-all'
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
            <h2 className='text-xl font-semibold mb-2' >What You'all Learn</h2>
            <ul className='list-disc pl-6 text-grat-700 spcae-y-1' >
              <li>Learn {selectedCourse?.category} from Beginning</li>
            </ul>
          </div>
          <div>
            <h2 className='text-xl font-semibold mb-2' >Who This Course is For</h2>
            <p className='text-gray-700' >Beginners, aspiring developers, and professionals looking to upgrade skills. </p>
          </div>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
            <h2 className='text-xl font-bold mb-1 text-gray-800'>Course Curriculum</h2>
            <p className='text-sm text-gray-500 mb-4'>{selectedCourse?.lectures?.length} Lectures</p>

            <div className='flex flex-col gap-3'>
              {selectedCourse?.lectures?.map((lecture, index) => {
                const canWatch = isEnrolled || lecture.isPreviewFree
                return (
                  <button
                    key={index}
                    onClick={() => canWatch && setSelectedLecture(lecture)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left
                      ${canWatch ? "hover:bg-gray-100 cursor-pointer border-gray-300" : "cursor-not-allowed opacity-60 border-gray-200"}`}
                  >
                    <span className='text-lg text-gray-700'>
                      {canWatch ? <FaPlayCircle className="text-green-600" /> : <FaLock />}
                    </span>
                    <span className='text-sm font-medium text-gray-800'>{lecture?.lectureTitle}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className='bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border-gray-200'>
            <div className='aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center'>
              {selectedLecture?.videoUrl ? (
                <video className='w-full h-full object-cover' src={selectedLecture.videoUrl} controls />
              ) : (
                <span className='text-white text-sm'>
                  {isEnrolled ? "Select a lecture to watch" : "Enroll to unlock all lectures"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ===== REVIEW SECTION  ===== */}
        <div className='border-t pt-6 mt-6'>
          <h2 className='text-xl font-bold mb-4'>Leave a Review</h2>

          <div className='flex gap-2 mb-3'>
            {[1,2,3,4,5].map(num => (
              <FaStar
                key={num}
                onClick={() => setRating(num)}
                className={`cursor-pointer text-2xl ${
                  num <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            className='w-full border rounded-lg p-3 mb-3'
          />

          <button 
            onClick={handleSubmitReview}
            disabled={loading} 
            className={`bg-black text-white px-6 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {loading ? (
              <span className="flex items-center gap-2">Submitting...</span>
            ) : (
              "Submit Review" 
            )}
          </button>
        </div>

        {/* ===== PROFILE SECTION  ===== */}
        <div className='flex items-center gap-4 pt-4 border-t'>
          <img src={creatorData?.photoUrl || img} className='border border-gray-200 w-16 h-16 rounded-full object-cover' />
          <div>
            <h2 className='text-lg font-semibold'>{creatorData?.name}</h2>
            <p className='md:text-sm text-gray-600 text-[10px]'>{creatorData?.email}</p>
          </div>
        </div>

        <div className='w-full py-5 flex flex-wrap gap-6 justify-center lg:justify-start'>
          {creatorCourses?.map((course, index) => (
            <Card
              key={index}
              thumbnail={course.thumbnail}
              id={course._id}
              price={course.price}
              title={course.title}
              category={course.category}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default ViewCourse