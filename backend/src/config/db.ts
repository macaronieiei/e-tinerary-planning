// src/db/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// โหลดค่าจาก .env
dotenv.config();

// สร้าง client Supabase
export const supabase = createClient(
  process.env.SUPABASE_URL!,      
  process.env.SUPABASE_ANON_KEY!  
);
