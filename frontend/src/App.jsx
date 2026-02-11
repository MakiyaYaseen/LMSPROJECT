import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Educator/Dashboard';
import Courses from './pages/Educator/Courses';
import CreateCourses from './pages/Educator/CreateCourses';
import EditCourse from './pages/Educator/EditCourse';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useGetCurrentUser from './customHooks/getCurrentUser';
import useGetCreatorCourse from './customHooks/getCreatorCourse';
import useGetPublishedCourse from './customHooks/getPublishedCourse';

import { useSelector } from 'react-redux';
import AllCourses from './pages/AllCourses';
import CreateLecture from './pages/Educator/CreateLecture';
import EditLecture from './pages/Educator/EditLecture';
import ViewCourse from './pages/ViewCourse';
import ScrollToTop from './component/ScrollToTop';
import PaymentSuccess from './component/PaymentSuccess';
import ViewLectures from './pages/ViewLectures';
import MyEnrolledCourses from './pages/MyEnrolledCourses';
import useGetAllReviews from './customHooks/getAllReviews';
import SearchWIthAi from './pages/SearchWIthAi';
export const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
const App = () => {
  useGetCurrentUser();
  useGetCreatorCourse();
  useGetPublishedCourse();
  useGetAllReviews();

  const { userData } = useSelector(state => state.user);

  return (
    <>
      <ToastContainer />
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route
          path='/signup'
          element={!userData ? <SignUp /> : <Navigate to="/" />}
        />

        <Route
          path='/login'
          element={!userData ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path='/profile'
          element={userData ? <Profile /> : <Navigate to="/signup" />}
        />

        <Route path='/forget' element={<ForgetPassword />} />

        <Route
          path='/editprofile'
          element={userData ? <EditProfile /> : <Navigate to="/signup" />}
        />
        <Route
          path='/allcourses'
          element={userData ? <AllCourses /> : <Navigate to="/signup" />}
        />
        <Route
          path='/dashboard'
          element={userData?.role === "educator" ? <Dashboard /> : <Navigate to="/signup" />}
        />

        <Route
          path='/courses'
          element={userData?.role === "educator" ? <Courses /> : <Navigate to="/signup" />}
        />

        <Route
          path='/createCourse'
          element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to="/signup" />}
        />

        <Route
          path='/editCourse/:courseId'
          element={userData?.role === "educator" ? <EditCourse /> : <Navigate to="/signup" />}
        />
        <Route
          path='/createlecture/:courseId'
          element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to="/signup" />}
        />
        <Route
          path='/editlecture/:courseId/:lectureId'
          element={userData?.role === "educator" ? <EditLecture /> : <Navigate to="/signup" />}
/>
<Route 
  path='/viewcourse/:courseId' 
  element={userData ?<ViewCourse /> : <Navigate to="/signup" />} 
/>
<Route path="/payment-success" element={userData ?<PaymentSuccess />: <Navigate to="/signup" />} />
<Route 
  path='/viewlecture/:courseId' element={userData ?<ViewLectures />: <Navigate to="/signup" />}
/>
<Route 
  path='/mycourses' element={userData ?<MyEnrolledCourses />: <Navigate to="/signup" />}
/>
<Route 
  path='/search' element={userData ?<SearchWIthAi />: <Navigate to="/signup" />}
/>
      </Routes>
    </>
  );
};

export default App;
