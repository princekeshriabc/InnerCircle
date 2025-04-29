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
import Profile from '../screens/Profile';
import MyGuides from '../components/guides/MyGuides'
import PurchasePlan from '../screens/PurchasePlan';
import Project from '../screens/Project';
import ChatSection from '../screens/ChatSection';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomeUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/guides"
            element={
              <ProtectedRoute>
                <Guides />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides/create"
            element={
              <ProtectedRoute>
                <CreateGuide />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides/:id"
            element={
              <ProtectedRoute>
                <GuideDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides/edit/:id"
            element={
              <ProtectedRoute>
                <EditGuide />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-guides"
            element={
              <ProtectedRoute>
                <MyGuides />
              </ProtectedRoute>
            }
          />
          <Route path="/purchase-plan" element={<PurchasePlan />} />
          <Route path="/project" element={<Project />} />
          <Route path="/chatsection" element={<ChatSection />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRoutes
