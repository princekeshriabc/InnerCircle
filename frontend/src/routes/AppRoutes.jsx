import React from 'react'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import Login from '../screens/Login';
import Home from '../screens/Home';
import Register from '../screens/Register';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes
