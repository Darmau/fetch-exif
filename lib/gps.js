const exifr = require("exifr");
const axios = require("axios");

const GPS = {};

async function getGPS(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const rawData = await exifr.parse(response.data);
    GPS.latitude = rawData.latitude || 0;
    GPS.longitude = rawData.longitude || 0;
    return GPS;
  } catch (err) {
    throw err;
  }
}

module.exports = getGPS;