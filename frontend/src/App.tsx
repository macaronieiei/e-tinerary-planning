import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./features/welcome/welcome.tsx";
import Register from "./features/auth/register/register";
import ConfirmEmail from "./features/auth/confirmEmail/confirmEmail";
import Login from "./features/auth/login/login";
import Dashboard from "./features/home/home.tsx";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/login" element={<Login />} />
        
        {/* หน้าที่ต้อง login ก่อนเข้าได้ */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}