import { Routes, Route } from "react-router-dom";

import Home from "../pages/shared/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import QueueHistory from "../pages/user/QueueHistory";
import Profile from "../pages/user/Profile";
import QueueDetails from "../pages/shared/QueueDetails";
import NotFound from "../pages/shared/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/history" element={<QueueHistory />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/student" element={<UserDashboard />} />
      <Route path="/queue/:id" element={<QueueDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;