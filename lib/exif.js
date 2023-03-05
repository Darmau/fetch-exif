const exifr = require("exifr");
const axios = require("axios");

const exif = {};

function formatShutterTime(shutterTime) {
  if (!shutterTime) return "0";
  const time = parseFloat(shutterTime);
  if (time >= 1) {
    return time.toFixed(2);
  }
  const fraction = Math.round(1 / time);
  return `1/${fraction}`;
}

async function getExif(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const rawData = await exifr.parse(response.data);
    exif.Maker = rawData.Make || "unknown";
    exif.Model = rawData.Model || "unknown";
    exif.ExposureTime = formatShutterTime(rawData.ExposureTime) || "unknown";
    exif.FNumber = rawData.FNumber || "unknown";
    exif.iso = rawData.ISO || "unknown";
    exif.FocalLength = rawData.FocalLength || "unknown";
    exif.LensModel = rawData.LensModel || "unknown";
    return exif;
  } catch (err) {
    throw err;
  }
}

module.exports = getExif;