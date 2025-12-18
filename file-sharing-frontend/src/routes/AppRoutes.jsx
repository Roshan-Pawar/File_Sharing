import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../context/ProtectedRoutes";
import SharedFiles from "../pages/SharedFiles";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
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
