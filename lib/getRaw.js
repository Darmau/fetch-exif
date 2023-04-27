const exifr = require("exifr");
const axios = require("axios");
const mongoose = require("mongoose");
const { Raw } = require("./database");

mongoose.connect("mongodb://localhost:27017/exif");

function formatShutterTime(shutterTime) {
  if (!shutterTime) return "0";
  const time = parseFloat(shutterTime);
  if (time >= 1) {
    return time.toFixed(2);
  }
  const fraction = Math.round(1 / time);
  return `1/${fraction}`;
}

async function getRaw(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const rawData = await exifr.parse(response.data);
    const image = new Raw({
      url,
      exif: {
        Maker: rawData.Make || "unknown",
        Model: rawData.Model || "unknown",
        ExposureTime: formatShutterTime(rawData.ExposureTime),
        FNumber: rawData.FNumber || "unknown",
        iso: rawData.ISO || "unknown",
        FocalLength: rawData.FocalLength || "unknown",
        LensModel: rawData.LensModel || "unknown",
      },
      gps: {
        latitude: rawData.latitude,
        longitude: rawData.longitude,
      }
    });
    await image.save();
    return image;
  } catch (err) {
    throw err;
  }
}

module.exports = getRaw;
