import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./features/welcome/Welcome";
import Register from "./features/auth/Register";
import ConfirmEmail from "./features/auth/ConfirmEmail";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/home";

export default function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}