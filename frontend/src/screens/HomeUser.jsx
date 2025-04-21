import React from 'react'
import Hero from '../components/Hero'
// import { useUser } from "../context/user.context";
import GetStart from '../components/home/GetStart'
import TopGuides from '../components/home/TopGuides';
import Features from '../components/home/Features';

const HomeUser = () => {
    // const { user } = useUser();
    // console.log(user.name);
  return (
    <>
      <Hero />
      <TopGuides />
      <Features/>
      <GetStart />
      {/* <div className="">{JSON.stringify(user)}</div> */}
    </>
  );
}

export default HomeUser
