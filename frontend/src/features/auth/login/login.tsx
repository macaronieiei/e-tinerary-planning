import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || "";

  // ✅ รับ token หลังยืนยัน email แล้ว redirect มาที่ /login
  useEffect(() => {
    const hash = window.location.hash;
    console.log("hash:", window.location.hash); // ดูว่ามี hash ไหม
    if (hash.includes("access_token") && hash.includes("type=signup")) {
      setIsSuccess(true);
      setMessage("ยืนยันอีเมลสำเร็จ! กรุณาเข้าสู่ระบบ");
      window.history.replaceState(null, "", "/login");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
      login(data.user, data.session);
      navigate("/home");
    } else {
      setIsSuccess(false);
      setMessage(data.message);
      setShakeKey((k) => k + 1);
    }
  };

  return (
    <div className="font-sarabun relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fae3d9]">

      {/* Background blobs */}
      <div className="blob-1 absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#ffb6b9] opacity-50 blur-[70px] pointer-events-none" />
      <div className="blob-2 absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-[#61c0bf] opacity-40 blur-[70px] pointer-events-none" />
      <div className="blob-3 absolute top-16 right-24 w-52 h-52 rounded-full bg-[#bbded6] opacity-40 blur-[60px] pointer-events-none" />

      {/* Card */}
      <div className="animate-slide-up-1 relative z-10 w-[90%] max-w-md px-12 py-14 rounded-[36px] border border-white/80 shadow-2xl bg-white/70 backdrop-blur-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="block text-5xl mb-4">🔑</span>
          <h2 className="animate-slide-up-2 font-prompt font-extrabold text-3xl text-[#6b3a2a]">
            เข้าสู่ระบบ
          </h2>
          <p className="animate-slide-up-3 text-[#9c6b55] text-sm mt-1">
            ยินดีต้อนรับกลับมา!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div className="animate-slide-up-3 flex flex-col gap-1">
            <label className="font-prompt text-sm font-semibold text-[#6b3a2a]">
              อีเมล
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#ffb6b9]/60 bg-white/80 text-[#6b3a2a] placeholder-[#c9a99a] focus:outline-none focus:ring-2 focus:ring-[#ffb6b9] transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="animate-slide-up-4 flex flex-col gap-1">
            <label className="font-prompt text-sm font-semibold text-[#6b3a2a]">
              รหัสผ่าน
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#ffb6b9]/60 bg-white/80 text-[#6b3a2a] placeholder-[#c9a99a] focus:outline-none focus:ring-2 focus:ring-[#ffb6b9] transition-all duration-200"
            />
          </div>

          {/* Message — รองรับทั้ง success และ error */}
          {message && (
            <p
              key={shakeKey}
              className={`animate-shake text-center text-sm rounded-xl px-4 py-2 ${
                isSuccess
                  ? "text-green-600 bg-green-50 border border-green-200"
                  : "text-red-400 bg-red-50 border border-red-200"
              }`}
            >
              {isSuccess ? "✅" : "⚠️"} {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="animate-slide-up-5 font-prompt font-semibold w-full py-4 mt-2 rounded-2xl text-[#6b3a2a] bg-gradient-to-r from-[#ffb6b9] to-[#fae3d9] shadow-[0_6px_20px_rgba(255,182,185,0.5)] hover:shadow-[0_10px_28px_rgba(255,182,185,0.65)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        {/* Footer */}
        <p className="animate-slide-up-6 text-center text-sm text-[#9c6b55] mt-6">
          ยังไม่มีบัญชี?{" "}
          <span
            onClick={() => navigate("/register")}
            className="font-semibold text-[#6b3a2a] underline underline-offset-2 cursor-pointer hover:text-[#ffb6b9] transition-colors duration-200"
          >
            สมัครสมาชิก
          </span>
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-[#ffb6b9]" />
          <div className="w-2 h-2 rounded-full bg-[#fae3d9]" />
          <div className="w-2 h-2 rounded-full bg-[#bbded6]" />
          <div className="w-2 h-2 rounded-full bg-[#61c0bf]" />
        </div>
      </div>
    </div>
  );
}