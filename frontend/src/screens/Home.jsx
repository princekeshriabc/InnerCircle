import React,{useContext} from 'react'
import { UserContext } from '../context/user.context'
import Navbar from '../components/Navbar'

const Home = () => {
  const { user } = useContext(UserContext)
  return (
    <div>
      <Navbar />
      {JSON.stringify(user)}
    </div>
  );
}

export default Home
