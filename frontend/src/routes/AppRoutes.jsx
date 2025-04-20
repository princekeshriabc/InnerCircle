import React from 'react'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import Login from '../screens/Login';
import Home from '../screens/Home';
import Register from '../screens/Register';
import MainLayout from '../components/layout/MainLayout'
import Guides from "../screens/Guides";
import CreateGuide from "../screens/CreateGuide";
import GuideDetail from "../screens/GuideDetail";
import HomeUser from '../screens/HomeUser'
import EditGuide from '../screens/EditGuide';
import ProtectedRoute from '../components/ProtectedRoute'


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomeUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/guides" element={<ProtectedRoute><Guides /></ProtectedRoute>} />
          <Route path="/guides/create" element={<ProtectedRoute><CreateGuide /></ProtectedRoute>} />
          <Route path="/guides/:id" element={<ProtectedRoute><GuideDetail /></ProtectedRoute>} />
          <Route path="/guides/edit/:id" element={<ProtectedRoute><EditGuide /></ProtectedRoute>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRoutes
