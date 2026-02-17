import app from "./app";

app.get("/api/test", (_req, res) => {
  res.json({ message: "Backend working 🚀" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
