export default function Navbar({ username }: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px",
        background: "#eee",
      }}
    >
      <span>ผู้ใช้: {username}</span>
    </div>
  );
}