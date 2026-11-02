require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors()); // Izinkan frontend mengakses backend

app.use(cors());
app.use(express.static(__dirname));
// Route utama
// app.get("/", (req, res) => {
//   res.send(
//     "Server API berjalan. Gunakan endpoint '/weather?city=namakota' untuk mencari informasi cuaca.",
//   );
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/weather", async (req, res) => {
  console.log("Route weather terpanggil");
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "Masukkan nama kota!" });

  try {
    const apiKey = process.env.API_KEY;
    console.log("API Key tersedia:", Boolean(apiKey));
    //
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data dari API");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data dari API!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
