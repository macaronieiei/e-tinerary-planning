import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, age, gender }),
    });
    const data = await res.json();

    if (res.ok) {
      setIsError(false);
      setIsEmailDuplicate(false);
      setMessage(data.message);
      navigate("/confirm-email");
    } else {
      setIsError(true);
      setShakeKey((k) => k + 1);
      setMessage(data.message);
      setIsEmailDuplicate(res.status === 409);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#ffb6b9]/60 bg-white/80 text-[#6b3a2a] placeholder-[#c9a99a] focus:outline-none focus:ring-2 focus:ring-[#ffb6b9] transition-all duration-200";

  const labelClass = "font-prompt text-sm font-semibold text-[#6b3a2a]";

  return (
    <div className="font-sarabun relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fcedd3] py-10">

      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#5990c0] opacity-30 blur-[70px] pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-[#015185] opacity-25 blur-[70px] pointer-events-none" />
      <div className="absolute top-16 right-24 w-52 h-52 rounded-full bg-[#102a6b] opacity-20 blur-[60px] pointer-events-none" />

      {/* Card */}
      <div className="animate-slide-up-1 relative z-10 w-[90%] max-w-md px-12 py-14 rounded-[36px] border border-[#5990c0]/30 shadow-2xl bg-white/80 backdrop-blur-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="block text-5xl mb-4">🗺️</span>
          <h2 className="animate-slide-up-2 font-prompt font-extrabold text-3xl text-[#102a6b]">
            สมัครสมาชิก
          </h2>
          <p className="animate-slide-up-3 text-[#5990c0] text-sm mt-1">
            สร้างบัญชีใหม่กับเรา
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Username */}
          <div className="animate-slide-up-3 flex flex-col gap-1">
            <label className={labelClass}>ชื่อผู้ใช้</label>
            <input
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="animate-slide-up-4 flex flex-col gap-1">
            <label className={labelClass}>อีเมล</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className="animate-slide-up-5 flex flex-col gap-1">
            <label className={labelClass}>รหัสผ่าน</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Age + Gender */}
          <div className="animate-slide-up-6 flex gap-3">
            <div className="flex flex-col gap-1 w-1/2">
              <label className={labelClass}>อายุ</label>
              <input
                type="number"
                placeholder="อายุ"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min={1}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label className={labelClass}>เพศ</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={inputClass}
              >
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
              </select>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              key={shakeKey}
              className={`animate-shake text-center text-sm rounded-xl px-4 py-2 ${isError
                  ? "text-red-500 bg-red-50 border border-red-200"
                  : "text-green-600 bg-green-50 border border-green-200"
                }`}
            >
              <p>{isError ? "⚠️" : "✅"} {message}</p>
              {isEmailDuplicate && (
                <p className="mt-1">
                  <span
                    onClick={() => navigate("/login")}
                    className="font-semibold text-[#015185] underline underline-offset-2 cursor-pointer hover:text-[#102a6b] transition-colors duration-200"
                  >
                    คลิกที่นี่เพื่อเข้าสู่ระบบ →
                  </span>
                </p>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="animate-slide-up-7 font-prompt font-semibold w-full py-4 mt-2 rounded-2xl text-white bg-gradient-to-r from-[#102a6b] to-[#015185] shadow-[0_6px_20px_rgba(1,81,133,0.4)] hover:shadow-[0_10px_28px_rgba(1,81,133,0.6)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
          >
            สมัครสมาชิก
          </button>
        </form>

        {/* Footer */}
        <p className="animate-slide-up-8 text-center text-sm text-[#5990c0] mt-6">
          มีบัญชีอยู่แล้ว?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold text-[#015185] underline underline-offset-2 cursor-pointer hover:text-[#102a6b] transition-colors duration-200"
          >
            เข้าสู่ระบบ
          </span>
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-[#102a6b]" />
          <div className="w-2 h-2 rounded-full bg-[#015185]" />
          <div className="w-2 h-2 rounded-full bg-[#5990c0]" />
          <div className="w-2 h-2 rounded-full bg-[#cfe5f6]" />
        </div>
      </div>
    </div>
  );
}