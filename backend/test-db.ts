// test-db.ts
import { supabase } from "./src/config/db"; // ปรับ path ตามโครงสร้างโปรเจคของคุณ

(async () => {
  try {
    const { data, error } = await supabase.from("users").select("*"); // เปลี่ยนชื่อ table ตาม DB ของคุณ
    if (error) throw error;
    console.log("Connected to Supabase!");
    console.log("Data:", data);
  } catch (err) {
    console.error("Error connecting to Supabase:", err);
  }
})();
