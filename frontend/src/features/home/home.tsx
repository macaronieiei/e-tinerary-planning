import { useAuth } from "../auth/hooks/useAuth";
import Navbar from "../../components/navbar";
import "./Home.css";

export default function Home() {
  const { user } = useAuth(); // ดึงจาก context
  const username = user?.username;

  // ตัวอย่างสถานที่ท่องเที่ยว
  const demoPlaces = [
    { name: "ตลาดน้ำอัมพวา", location: "สมุทรสงคราม", emoji: "🛶" },
    { name: "เขาใหญ่", location: "นครราชสีมา", emoji: "🏞️" },
    { name: "ภูเก็ต", location: "ภูเก็ต", emoji: "🏝️" },
    { name: "เชียงใหม่", location: "เชียงใหม่", emoji: "🌄" },
  ];

  return (
    <div className="font-sarabun relative min-h-screen bg-[#fae3d9] overflow-hidden">

      {/* Background blobs */}
      <div className="blob-1 absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#ffb6b9] opacity-40 blur-[70px] pointer-events-none" />
      <div className="blob-2 absolute bottom-0 -right-16 w-72 h-72 rounded-full bg-[#61c0bf] opacity-30 blur-[70px] pointer-events-none" />
      <div className="blob-3 absolute bottom-32 left-20 w-60 h-60 rounded-full bg-[#bbded6] opacity-40 blur-[60px] pointer-events-none" />

      {/* Navbar */}
      <Navbar username={username} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 text-center">

        {/* Greeting */}
        <div className="animate-slide-up-1 mb-6 text-6xl">
          🌍
        </div>

        <h2 className="animate-slide-up-2 font-prompt font-extrabold text-4xl text-[#6b3a2a] mb-3">
          วางแผนเที่ยวกับเรา
        </h2>

        <p className="animate-slide-up-3 text-[#9c6b55] text-lg mb-6">
          ยินดีต้อนรับ{" "}
          <span className="font-prompt font-bold text-[#6b3a2a]">
            {username || "นักท่องเที่ยว"}
          </span>{" "}
          🌸 ลองดูตัวอย่างสถานที่น่าสนใจสำหรับคุณ
        </p>

        {/* Demo places */}
        <div className="animate-slide-up-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {demoPlaces.map((place, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-md hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">{place.emoji}</div>
              <div className="font-bold text-lg">{place.name}</div>
              <div className="text-sm text-gray-500">{place.location}</div>
            </div>
          ))}
        </div>

        {/* Start planning button */}
        <button className="animate-slide-up-4 px-6 py-3 bg-[#61c0bf] text-white font-bold rounded-full shadow-lg hover:bg-[#4aa9a4] transition-colors">
          เริ่มวางแผนเที่ยว 🌟
        </button>

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