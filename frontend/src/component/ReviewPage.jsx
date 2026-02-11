import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ReviewCard from './ReviewCard'
const ReviewPage = () => {
    const {reviewData} = useSelector(state=>state.review)
    const [latestReview,setLatestReview] = useState(null)
    useEffect(()=>{
        setLatestReview(reviewData?.slice(0,6))
    },[reviewData])
  return (
    <div className='flex items-center justify-center flex-col'>
        <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-5' >Real Reviews for Real Courses</h1>
        <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-5' > Discover how our Virtual Courses is transforming learning experiences through real feddback from students and professionals worldwide.</span>
        <div className='w-full min-[100vh] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-2.5 mb-10' >
            {latestReview?.map((review, index) => (
    <ReviewCard 
        key={index}
        rating={review.rating}
        comment={review.comment}
        name={review.user?.name}           
        photoUrl={review.user?.photoUrl}   
        courseTitle={review.course?.title} 
        description={review.user?.description} 
    />
))}
             </div>
    </div>
  )
}

export default ReviewPage