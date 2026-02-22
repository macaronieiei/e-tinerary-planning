import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>ยินดีต้อนรับ!</h1>
      <button onClick={() => navigate("/register")}>สมัครสมาชิก</button>
      <button onClick={() => navigate("/login")}>เข้าสู่ระบบ</button>
    </div>
  );
}