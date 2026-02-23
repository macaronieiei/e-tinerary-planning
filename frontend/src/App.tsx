import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./features/welcome/welcome";
import Register from "./features/auth/register/register";
import ConfirmEmail from "./features/auth/confirmEmail/confirmEmail";
import Login from "./features/auth/login/login";
import Dashboard from "./features/home/home";

export default function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/home" element={<Dashboard user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}