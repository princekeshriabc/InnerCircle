import React, { useContext } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { UserContext } from '../context/user.context'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Zoom from '../components/Zoom'
import WhocanJoin from '../components/home/WhocanJoin'
import Testimonial from '../components/home/Testonomial';
import GetStart from '../components/home/GetStart';
import Features from '../components/home/Features';

const Home = () => {
  // const location = useLocation();
  const { user } = useContext(UserContext)
  // const renderMainContent = () => {
  //   switch (location.pathname) {
  //     case "/login":
  //       return <Login />;
  //     case "/register":
  //       return <Register />;
  //     default:
  //       return <Hero />;
  //   }
  // };
  return (
    <div className="min-h-screen">
      {/* <Navbar />Render the Navbar component */}
      {/* Add padding-top to account for fixed navbar */}
      {/* {renderMainContent()} Call the function to render content */}
      <Hero />
      <WhocanJoin />
      <Testimonial />
      <Features />
      <GetStart />
      {/* <Zoom/> */}
      {/* <div className="">{JSON.stringify(user)}</div> */}
    </div>
  );
}

export default Home
