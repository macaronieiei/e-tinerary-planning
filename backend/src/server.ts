import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./features/auth/authRoutes";
import placesRoutes from "./features/places/placesRoutes";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/places", placesRoutes);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../fontend/dist/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));