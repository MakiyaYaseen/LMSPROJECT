import React from 'react'
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Card = ({ thumbnail, title, category, price, id , reviews }) => {
  const caluculateAvgReview = (reviews) =>{
    if(!reviews || reviews.length === 0){
      return 0
    }
    const total = reviews.reduce((sum , review)=> sum + review.rating , 0)
    return(total / reviews.length).toFixed(1)
  }
    const avgRating = caluculateAvgReview(reviews)
const navigate = useNavigate()

  return (
    <div className="max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300" onClick={()=>navigate(`/viewcourse/${id}`)} >
      
      {/* IMAGE */}
      <img src={thumbnail} alt="" className="w-full h-48 object-cover" />

      {/* CONTENT BOX */}
      <div className="p-5 space-y-3">

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>

        {/* CATEGORY */}
        <span className="inline-block text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full capitalize">
          {category}
        </span>

        {/* PRICE & RATING */}
        <div className="flex justify-between items-center text-sm text-gray-600">

          <span className="font-semibold text-gray-800 text-[17px] px-3 ">
            {price}
          </span>

          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-500" /> {avgRating}
          </span>

        </div>

      </div>

    </div>
  );
};

export default Card;
