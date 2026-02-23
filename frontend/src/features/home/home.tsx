import { useAuth } from "../auth/hooks/useAuth";
import Navbar from "../../components/navbar";
import "./Home.css";

export default function Home() {
  const { user } = useAuth(); // ✅ ดึงจาก context แทน props
  const username = user?.username;

  return (
    <div className="font-sarabun relative min-h-screen bg-[#fae3d9] overflow-hidden">

      {/* Background blobs */}
      <div className="blob-1 absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#ffb6b9] opacity-40 blur-[70px] pointer-events-none" />
      <div className="blob-2 absolute bottom-0 -right-16 w-72 h-72 rounded-full bg-[#61c0bf] opacity-30 blur-[70px] pointer-events-none" />
      <div className="blob-3 absolute bottom-32 left-20 w-60 h-60 rounded-full bg-[#bbded6] opacity-40 blur-[60px] pointer-events-none" />

      {/* Navbar */}
      <Navbar username={username} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 text-center">

        {/* Greeting */}
        <div className="animate-slide-up-1 mb-6">
          <span className="text-7xl">🌍</span>
        </div>

        <h2 className="animate-slide-up-2 font-prompt font-extrabold text-4xl text-[#6b3a2a] mb-3">
          หน้าหลักเว็บ
        </h2>

        <p className="animate-slide-up-3 text-[#9c6b55] text-lg">
          ยินดีต้อนรับ{" "}
          <span className="font-prompt font-bold text-[#6b3a2a]">
            {username}
          </span>{" "}
          🌸
        </p>

        {/* Dots */}
        <div className="animate-slide-up-3 flex justify-center gap-2 mt-10">
          <div className="w-2 h-2 rounded-full bg-[#ffb6b9]" />
          <div className="w-2 h-2 rounded-full bg-[#fae3d9]" />
          <div className="w-2 h-2 rounded-full bg-[#bbded6]" />
          <div className="w-2 h-2 rounded-full bg-[#61c0bf]" />
        </div>
      </div>
    </div>
  );
}