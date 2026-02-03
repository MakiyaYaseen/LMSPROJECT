import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import ai from "../assets/SearchAi.png"
import { useSelector } from 'react-redux';
import Card from '../component/Card';

const AllCourses = () => {
    const navigate = useNavigate()
    const { courseData } = useSelector(state => state.course)

    const [category, setCategory] = useState([])
    const [filterCourses, setFilterCourses] = useState([])
    const [isSidebarVisible,SetIsSidebarVisible] = useState(false)

    const toggleCategory = (e) => {
        const value = e.target.value;

        if (category.includes(value)) {
            setCategory(prev => prev.filter(c => c !== value))
        } else {
            setCategory(prev => [...prev, value])
        }
    }

    const applyFilter = () => {
        let courseCopy = courseData?.slice() || [];

        if (category.length > 0) {
            courseCopy = courseCopy.filter(c => category.includes(c.category))
        }

        setFilterCourses(courseCopy)
    }

    useEffect(() => {
        setFilterCourses(courseData)
    }, [courseData])

    useEffect(() => {
        applyFilter()
    }, [category])


    return (
        <div className='flex min-h-screen bg-gray-50'>
            <Nav />
            <button className='fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black' onClick={()=>SetIsSidebarVisible(prev=>!prev)} >
                {isSidebarVisible ? 'Hide' : "Show"} Filters
            </button>  


            {/* Sidebar */}
            <aside className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 ${isSidebarVisible ? "translate-x-0" : "-translate-x-full" } md:block md:translate-x-0`}>
                <h2 className='text-xl font-bold text-gray-50 mb-6 flex items-center justify-center gap-2'>
                    <FaArrowLeftLong className='text-white cursor-pointer' onClick={() => navigate("/")} />
                    Filter by Category
                </h2>

                <form
                    className='space-y-4 text-sm bg-gray-600 border-white text-white border p-5 rounded-2xl'
                    onSubmit={(e) => e.preventDefault()}
                >
                    <button
                        className='px-2.5 py-2.5 bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer' onClick={()=>navigate("/search")}
                    >
                        Search with AI
                        <img src={ai} className='w-[30px] h-[30px] rounded-full' alt="" />
                    </button>

                    {/* FIXED INPUT OPTIONS */}
                    <label className='flex items-center gap-3'>
                        <input value="App Development" onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4' /> App Development
                    </label>

                    <label className='flex items-center gap-3'>
                        <input value="AI/ML" onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4' /> AI/ML
                    </label>

                    <label className='flex items-center gap-3'>
                        <input value="AI Tools" onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4' /> AI Tools
                    </label>

                    <label className='flex items-center gap-3'>
                        <input value="Data Science" onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4' /> Data Science
                    </label>

                    <label className='flex items-center gap-3'>
                        <input value="Data Analytics" onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4' /> Data Analytics
                    </label>

                    <label className='flex items-center gap-3'>
                        <input value="Ethical Hacking" onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4' /> Ethical Hacking
                    </label>

                    <label className='flex items-center gap-3'>
                        <input value="UI/UX Designing" onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4' /> UI/UX Designing
                    </label>

                    <label className='flex items-center gap-3'>
                        <input value="Web Development" onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4' /> Web Development
                    </label>

                    <label className='flex items-center gap-3'>
                        <input value="Others" onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4' /> Others
                    </label>
                </form>
            </aside>

            {/* Main Content */}
            <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center flex-wrap gap-6 px-2.5'>
                {filterCourses?.map((course, index) => (
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
            </main>
        </div>
    )
}

export default AllCourses
