import React from 'react'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import Login from '../screens/Login';
import Home from '../screens/Home';
import Register from '../screens/Register';
import MainLayout from '../components/layout/MainLayout'


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout >
      <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRoutes
