import { useNavigate } from "react-router-dom";
import "./welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="font-sarabun relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fae3d9]">

      {/* Background blobs */}
      <div className="blob-1 absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#ffb6b9] opacity-50 blur-[70px] pointer-events-none" />
      <div className="blob-2 absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-[#61c0bf] opacity-40 blur-[70px] pointer-events-none" />
      <div className="blob-3 absolute bottom-20 left-20 w-60 h-60 rounded-full bg-[#bbded6] opacity-50 blur-[60px] pointer-events-none" />
      <div className="blob-4 absolute top-16 right-24 w-52 h-52 rounded-full bg-[#ffb6b9] opacity-30 blur-[60px] pointer-events-none" />

      {/* Card */}
      <div className="animate-slide-up-1 relative z-10 w-[90%] max-w-md text-center px-12 py-14 rounded-[36px] border border-white/80 shadow-2xl bg-white/70 backdrop-blur-2xl">

        {/* Icon */}
        <span className="animate-bounce-icon block text-6xl mb-5">🌸</span>

        {/* Title */}
        <h1 className="animate-slide-up-2 font-prompt font-extrabold text-4xl text-[#6b3a2a] mb-2">
          ยินดีต้อนรับ!
        </h1>
        <p className="animate-slide-up-3 text-[#9c6b55] text-base mb-10">
          เริ่มต้นการเดินทางของคุณกับเรา
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/register")}
            className="animate-slide-up-4 font-prompt font-semibold w-full py-4 rounded-2xl text-white bg-gradient-to-r from-[#ffb6b9] to-[#fae3d9] shadow-[0_6px_20px_rgba(255,182,185,0.5)] hover:shadow-[0_10px_28px_rgba(255,182,185,0.65)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 text-[#6b3a2a]"
          >
            ✨ สมัครสมาชิก
          </button>
          <button
            onClick={() => navigate("/login")}
            className="animate-slide-up-5 font-prompt font-semibold w-full py-4 rounded-2xl text-white bg-gradient-to-r from-[#bbded6] to-[#61c0bf] shadow-[0_6px_20px_rgba(97,192,191,0.4)] hover:shadow-[0_10px_28px_rgba(97,192,191,0.55)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
          >
            🔑 เข้าสู่ระบบ
          </button>
        </div>

        {/* Dots */}
        <div className="animate-slide-up-6 flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-[#ffb6b9]" />
          <div className="w-2 h-2 rounded-full bg-[#fae3d9]" />
          <div className="w-2 h-2 rounded-full bg-[#bbded6]" />
          <div className="w-2 h-2 rounded-full bg-[#61c0bf]" />
        </div>
      </div>
    </div>
  );
}