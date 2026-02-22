import { Request, Response } from "express";
import { supabase } from "../../config/db";

// Register
export const register = async (req: Request, res: Response) => {
  const { username, email, password, age, gender } = req.body;

  try {
    // 1️⃣ สร้าง user ใน Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173/login", // หลังยืนยัน email แล้วจะถูกส่งกลับมาที่หน้านี้
        data: { username }, // user_metadata
      },
    });

    if (error) return res.status(400).json({ message: error.message });

    // 2️⃣ บันทึก profile ลง users table ของเรา
    const { error: insertError } = await supabase.from("users").insert([
      {
        user_id: data.user?.id,
        username,
        email,
        age,
        gender,
        role: "user",
        is_active: true,
        email_verified: false,
        created_at: new Date(),
      },
    ]);

    if (insertError) return res.status(500).json({ message: insertError.message });

    res.json({
      message:
        "สมัครสมาชิกสำเร็จ! กรุณายืนยัน email ของคุณก่อนเข้าสู่ระบบ.",
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Supabase Auth login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(400).json({ message: error.message });

    const user = data.user;

    // ตรวจสอบ email_verified
    if (!user?.email_confirmed_at) {
      return res.status(403).json({
        message: "กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ",
      });
    }

    // save profile ลง users table ของเราเอง (upsert)
    const { error: upsertError, data: profile } = await supabase
      .from("users")
      .upsert([
        {
          user_id: user.id,
          username: user.user_metadata.username,
          email: user.email,
          role: "user",
          is_active: true,
          email_verified: true,
        },
      ])
      .select()
      .single();

    if (upsertError) console.log("Insert user error:", upsertError);

    res.json({
      message: "Login สำเร็จ",
      user: profile, // ข้อมูลจากตาราง users ของเราเอง
      session: data.session,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

