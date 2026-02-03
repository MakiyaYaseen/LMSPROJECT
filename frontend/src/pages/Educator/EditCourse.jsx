import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../assets/empty.jpg";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const thumb = useRef();
  const [isPublished, setIsPublished] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState(image);
  const [backendImage, setBackendImage] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const getCourseById = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/course/getcourse/${courseId}`,
        { withCredentials: true }
      );
      setSelectCourse(result.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch course details");
    }
  };

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "");
      setSubTitle(selectCourse.subTitle || "");
      setDescription(selectCourse.description || "");
      setCategory(selectCourse.category || "");
      setLevel(selectCourse.level || "");
      setPrice(selectCourse.price || "");
      setIsPublished(selectCourse.isPublished || false);
      setFrontendImage(selectCourse.thumbnail || image);
    }
  }, [selectCourse]);

  useEffect(() => {
    getCourseById();
  }, []);

  const handleEditCourse = async () => {
    setLoadingSave(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("level", level);
      formData.append("price", price);
      formData.append("isPublished", isPublished);
      if (backendImage) formData.append("thumbnail", backendImage);

      const response = await axios.post(
        `${serverUrl}/api/course/editcourse/${courseId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      const updateData = response.data;

      // ✅ Fixed Redux update logic
      const updatedCourses = courseData.filter((c) => c._id !== courseId);
      updatedCourses.push(updateData);
      dispatch(setCourseData(updatedCourses));

      toast.success("Course Updated Successfully!");
      navigate("/courses");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleRemoveCourse = async () => {
    setLoadingRemove(true);
    try {
      await axios.delete(`${serverUrl}/api/course/remove/${courseId}`, {
        withCredentials: true,
      });
      const filterCourses = courseData.filter((c) => c._id !== courseId);
      dispatch(setCourseData(filterCourses));
      toast.success("Course Removed Successfully!");
      navigate("/courses");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to remove course!");
    } finally {
      setLoadingRemove(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center gap-5 md:justify-between flex-col md:flex-row mb-6 relative">
        <FaArrowLeftLong
          className="absolute left-0 md:left-[2%] -top-2.5 md:top-[20%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-2xl font-semibold md:pl-[60px]">
          Add Detailed Information Regarding the Course
        </h2>
        <div className="space-x-2">
          <button className="bg-black text-white px-4 py-2 rounded-md" onClick={() => selectCourse && navigate(`/createlecture/${selectCourse._id}`)}
 >
            Go to Lecture Page
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>

        <div className="space-x-2 mb-4">
          {!isPublished ? (
            <button
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border"
              onClick={() => setIsPublished(!isPublished)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              className="bg-red-100 text-red-600 px-4 py-2 rounded-md border"
              onClick={() => setIsPublished(!isPublished)}
            >
              Click to Unpublish
            </button>
          )}

          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={handleRemoveCourse}
          >
            {loadingRemove ? <ClipLoader size={20} color="white" /> : "Remove Course"}
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-semibold text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Course Subtitle"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="des" className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="des"
              className="w-full border px-4 py-2 rounded-md h-28 resize-none"
              placeholder="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
              <select
                className="w-full border px-4 py-2 rounded-md bg-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI/UX Designing">UI/UX Designing</option>
                <option value="Web Development">Web Development</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Level</label>
              <select
                className="w-full border px-4 py-2 rounded-md bg-white"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Course Price (PKR)
              </label>
              <input
                type="number"
                id="price"
                className="w-full border px-4 py-2 rounded-md"
                placeholder="e.g. 1500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Thumbnail</label>
            <input type="file" hidden ref={thumb} accept="image/*" onChange={handleThumbnail} />
            <div className="relative w-[300px] h-[170px] cursor-pointer">
              <img
                src={frontendImage}
                alt="thumbnail"
                className="w-full h-full border border-black rounded-[5px]"
                onClick={() => thumb.current.click()}
              />
              <FaEdit className="w-5 h-5 absolute top-2 right-2" onClick={() => thumb.current.click()} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="w-32 text-center bg-[#e9e8e8] hover:bg-red-200 text-black border border-black px-4 py-2 rounded-md"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>

            <button
              type="button"
              className="w-32 text-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-500"
              onClick={handleEditCourse}
            >
              {loadingSave ? <ClipLoader size={30} color="white" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
