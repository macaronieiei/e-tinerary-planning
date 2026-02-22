import Navbar from "../../components/Navbar";

export default function Dashboard({ user }: any) {
  return (
    <div>
      <Navbar username={user?.username || user?.user_metadata?.username} />
      <h2>หน้าหลักเว็บ</h2>
      <p>ยินดีต้อนรับ {user?.username || user?.user_metadata?.username}!</p>
    </div>
  );
}