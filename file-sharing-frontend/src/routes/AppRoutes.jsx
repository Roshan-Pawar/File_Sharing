import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../context/ProtectedRoutes";
import SharedFiles from "../pages/SharedFiles";
import Register from "../pages/Register";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/shared"
      element={
        <ProtectedRoute>
          <SharedFiles />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
