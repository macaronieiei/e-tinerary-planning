import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { PlaceRecord } from "./types";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const INPUT_PATH = path.join(__dirname, "../data/output.json");
const BATCH_SIZE = 20;

async function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    console.error("❌ output.json not found. Run fetchPlaces.ts first.");
    process.exit(1);
  }

  const places: PlaceRecord[] = JSON.parse(fs.readFileSync(INPUT_PATH, "utf-8"));
  console.log(`📦 Total places to upload: ${places.length}`);

  // Deduplicate
  const seen = new Set<string>();
  const deduplicated = places.filter((p) => {
    const key = p.google_place_id || p.place_name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  console.log(`🔍 After deduplicate: ${deduplicated.length} places`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < deduplicated.length; i += BATCH_SIZE) {
    const batch = deduplicated.slice(i, i + BATCH_SIZE);

    const { error } = await supabase
      .from("places")
      .upsert(batch, { onConflict: "google_place_id" });

    if (error) {
      console.error(`❌ Batch ${i / BATCH_SIZE + 1} error:`, error.message);
      errorCount += batch.length;
    } else {
      successCount += batch.length;
      console.log(
        `✅ Batch ${i / BATCH_SIZE + 1}: uploaded ${batch.length} places (total: ${successCount})`
      );
    }
  }

  console.log(`\n🎉 Upload complete!`);
  console.log(`  ✅ Success: ${successCount}`);
  console.log(`  ❌ Error: ${errorCount}`);
}

main().catch(console.error);