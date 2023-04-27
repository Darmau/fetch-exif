const express = require("express");
const mongoose = require("mongoose");
const getRaw = require("./lib/getRaw");
const { Raw } = require("./lib/database");

const app = express();
const port = 1216;

mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/exif", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Filed to connect to MongoDB", err));

app.get("/exif", async (req, res) => {
  const url = req.query.url;
  const data = await Raw.findOne({ url: url });

  if (!data) {
    const rawData = await getRaw(url);
    return res.json(rawData.exif);
  } else {
    return res.json(data.exif);
  }
});

app.get("/gps", async (req, res) => {
  const url = req.query.url;
  const data = await Raw.findOne({ url: url });

  if (!data) {
    const rawData = await getRaw(url);
    return res.json(rawData.gps);
  } else {
    return res.json(data.gps);
  }
});

app.listen(port, () => console.log(`Fetch EXIF is running on port ${port}!`));
