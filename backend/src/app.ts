import express from "express";
import cors from "cors";
import authRoutes from "./features/auth/authRoutes";
import placesRoutes from "./features/places/placesRoutes";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL || "",
  ],
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/places", placesRoutes);

export default app;