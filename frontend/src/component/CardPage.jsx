import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

const CardPage = () => {

    const { courseData } = useSelector(state => state.course);
    const [popularCourses, setPopularCourses] = useState([]);

    useEffect(() => {
        if (Array.isArray(courseData)) {
            setPopularCourses(courseData?.slice(0, 6));
        }
    }, [courseData]);

    return (
        <div className="relative flex items-center justify-center flex-col">
            
            <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-10">
                Our Popular Courses
            </h1>

            <p className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-5 mb-10 px-5 text-gray-700">
                Explore top-rated courses designed to boost your skills, enhance careers, 
                and unlock opportunities in tech, AI, business, and beyond.
            </p>

            {/* FIXED SPACING HERE — min-h-screen REMOVED */}
            <div className="w-full flex flex-wrap items-start justify-center gap-[30px] lg:p-10 md:p-6 p-2 mb-10">

                {popularCourses?.map((course, index) => (
                    <Card
                        key={index}
                        thumbnail={course.thumbnail}
                        title={course.title}
                        category={course.category}
                        price={course.price}
                        id={course._id}
                        reviews={course.reviews}
                    />
                ))}

            </div>
        </div>
    );
};

export default CardPage;
