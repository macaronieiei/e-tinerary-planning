import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import * as dotenv from "dotenv";
import { CsvRow, GooglePlaceResult, PlaceRecord } from "./types";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY!;
const OUTPUT_PATH = path.join(__dirname, "../data/output.json");
const LIMIT = 100; // จำนวนสถานที่ที่ต้องการ
const DELAY_MS = 200; // หน่วงเวลาป้องกัน rate limit

// ----- Helpers -----

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function parseLatLng(location: string): { lat: number; lng: number } | null {
  const parts = location.split(",").map((s) => s.trim());
  if (parts.length !== 2) return null;
  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);
  if (isNaN(lat) || isNaN(lng)) return null;
  return { lat, lng };
}

// ----- Step 1: Find Place by lat/lng (Nearby Search → ใช้ชื่อช่วย verify) -----

async function findPlaceByLatLng(
  nameTh: string,
  nameEn: string,
  lat: number,
  lng: number
): Promise<GooglePlaceResult | null> {
  try {
    // ใช้ Find Place from Text API (แม่นที่สุดเมื่อมีชื่อ + location bias)
    const searchName = nameEn || nameTh;
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`;
    const res = await axios.get(url, {
      params: {
        input: searchName,
        inputtype: "textquery",
        locationbias: `circle:500@${lat},${lng}`,
        fields: "place_id,name,geometry,rating,price_level,formatted_address,user_ratings_total",
        language: "th",
        key: GOOGLE_API_KEY,
      },
    });

    const candidates = res.data.candidates;
    if (!candidates || candidates.length === 0) return null;

    return candidates[0] as GooglePlaceResult;
  } catch (err: any) {
    console.error(`  ❌ Find Place error: ${err.message}`);
    return null;
  }
}

// ----- Step 2: Get Place Details (เพื่อได้ opening_hours, phone, website) -----

async function getPlaceDetails(placeId: string): Promise<Partial<GooglePlaceResult>> {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json`;
    const res = await axios.get(url, {
      params: {
        place_id: placeId,
        fields:
          "place_id,name,formatted_address,formatted_phone_number,website,opening_hours,rating,price_level,user_ratings_total,geometry",
        language: "th",
        key: GOOGLE_API_KEY,
      },
    });

    if (res.data.status !== "OK") return {};
    return res.data.result as GooglePlaceResult;
  } catch (err: any) {
    console.error(`  ❌ Place Details error: ${err.message}`);
    return {};
  }
}

// ----- Main -----

async function main() {
  // อ่าน CSV
  const csvContent = fs.readFileSync(
    path.join(__dirname, "../data/attraction.csv"),
    "utf8"
  );

  const rows: CsvRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    bom: true,        // ← เพิ่มบรรทัดนี้
    relax_quotes: true, // ← เพิ่มบรรทัดนี้ (CSV มี quote ซับซ้อน)
  });

  console.log(`📋 Total rows in CSV: ${rows.length}`);

  // กรองเฉพาะแถวที่มี location
  const validRows = rows.filter((r) => r.ATT_LOCATION && r.ATT_LOCATION.trim());
  console.log(`✅ Rows with location: ${validRows.length}`);
  console.log(`🎯 Processing first ${LIMIT} places...\n`);

  const results: PlaceRecord[] = [];
  const failed: string[] = [];

  for (let i = 0; i < Math.min(LIMIT, validRows.length); i++) {
    const row = validRows[i];
    const nameTh = row.ATT_NAME_TH?.trim() || "";
    const nameEn = row.ATT_NAME_EN?.trim() || "";
    const displayName = nameEn || nameTh;

    console.log(`[${i + 1}/${LIMIT}] ${displayName}`);

    const coords = parseLatLng(row.ATT_LOCATION);
    if (!coords) {
      console.log(`  ⚠️  Invalid location: "${row.ATT_LOCATION}"`);
      failed.push(displayName);
      continue;
    }

    // Step 1: Find place_id
    const found = await findPlaceByLatLng(nameTh, nameEn, coords.lat, coords.lng);
    await sleep(DELAY_MS);

    if (!found || !found.place_id) {
      console.log(`  ⚠️  Not found on Google Maps`);
      // Fallback: บันทึกจาก CSV โดยไม่มี google_place_id
      results.push({
        google_place_id: "",
        place_name: nameTh || nameEn,
        latitude: coords.lat,
        longitude: coords.lng,
        rating: null,
        price_level: null,
        formatted_address: null,
        phone_number: row.ATT_TEL || null,
        website: row.ATT_WEBSITE || null,
        opening_hours: null,
        province: row.PROVINCE_NAME_TH || "",
        district: row.DISTRICT_NAME_TH || "",
        user_ratings_total: null,
      });
      failed.push(displayName);
      continue;
    }

    // Step 2: Get details
    const details = await getPlaceDetails(found.place_id);
    await sleep(DELAY_MS);

    const record: PlaceRecord = {
      google_place_id: found.place_id,
      place_name: details.name || nameTh || nameEn,
      latitude: details.geometry?.location?.lat ?? coords.lat,
      longitude: details.geometry?.location?.lng ?? coords.lng,
      rating: details.rating ?? null,
      price_level: details.price_level ?? null,
      formatted_address: details.formatted_address ?? null,
      phone_number: details.formatted_phone_number ?? row.ATT_TEL ?? null,
      website: details.website ?? row.ATT_WEBSITE ?? null,
      opening_hours: details.opening_hours ?? null,
      province: row.PROVINCE_NAME_TH || "",
      district: row.DISTRICT_NAME_TH || "",
      user_ratings_total: details.user_ratings_total ?? null,
    };

    results.push(record);
    console.log(
      `  ✅ place_id: ${found.place_id} | rating: ${record.rating ?? "N/A"}`
    );
  }

  // บันทึก output
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2), "utf-8");

  console.log(`\n🎉 Done!`);
  console.log(`  ✅ Success: ${results.length - failed.length}`);
  console.log(`  ⚠️  Failed/Fallback: ${failed.length}`);
  console.log(`  💾 Saved to: ${OUTPUT_PATH}`);
}

main().catch(console.error);