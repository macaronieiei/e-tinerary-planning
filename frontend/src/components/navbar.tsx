import { useNavigate } from "react-router-dom";
import { supabase } from "../config/db";
import "./navbar.css";

export default function Navbar({ username }: any) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="animate-slide-down font-sarabun sticky top-0 z-50 w-full px-6 py-3 flex items-center justify-between bg-white/70 backdrop-blur-xl border-b border-[#ffb6b9]/30 shadow-sm">

      {/* Logo */}
      <div className="animate-fade-in-1 flex items-center gap-2">
        <span className="text-2xl">🌸</span>
        <span className="font-prompt font-extrabold text-lg text-[#6b3a2a]">E-tinerary Planning Trip</span>
      </div>

      {/* Right side */}
      <div className="animate-fade-in-2 flex items-center gap-3">

        {/* User badge */}
        <div className="flex items-center gap-2 bg-[#fae3d9]/80 border border-[#ffb6b9]/50 rounded-full px-4 py-1.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ffb6b9] to-[#61c0bf] flex items-center justify-center text-white text-xs font-bold font-prompt">
            {username?.charAt(0).toUpperCase() || "?"}
          </div>
          <span className="font-prompt text-sm font-semibold text-[#6b3a2a]">
            {username || "ผู้ใช้"}
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="font-prompt text-sm font-semibold px-4 py-1.5 rounded-full border border-[#ffb6b9]/60 text-[#6b3a2a] bg-white/60 hover:bg-[#ffb6b9]/20 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
        >
          ออกจากระบบ
        </button>
      </div>
    </nav>
  );
}
