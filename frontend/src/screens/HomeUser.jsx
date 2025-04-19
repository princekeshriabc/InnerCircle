import React from 'react'
import Hero from '../components/Hero'
// import { useUser } from "../context/user.context";

const HomeUser = () => {
    // const { user } = useUser();
    // console.log(user.name);
  return (
    <>
      <Hero />
      {/* <div className="">{JSON.stringify(user)}</div> */}
    </>
  );
}

export default HomeUser
