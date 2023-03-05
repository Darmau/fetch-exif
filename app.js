const express = require("express");
const getExif = require("./lib/exif");
const getGPS = require("./lib/gps");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 43200 });

const app = express();
const port = 1216;

app.get("/exif", async (req, res) => {
  const url = req.query.url;
  const cacheKey = `exif:${url}`;
  let exifData = cache.get(cacheKey);

  if (!exifData) {
    try {
      exifData = await getExif(url);
    } catch (err) {
      return res.status(500).send(err.message);
    }
    cache.set(cacheKey, exifData, 3600);
    res.json(exifData);
  } else {
    res.json(exifData);
  }

});

app.get("/gps", async (req, res) => {
  const url = req.query.url;
  const cacheKey = `gps:${url}`;
  let gpsData = cache.get(cacheKey);

  if (!gpsData) {
    try {
      gpsData = await getGPS(url);
    } catch (err) {
      return res.status(500).send(err.message);
    }
    cache.set(cacheKey, gpsData, 3600);
    res.json(gpsData);
  } else {
    res.json(gpsData);
  }
});

app.listen(port, () => console.log(`Exif查询接口正在运行 ${port}!`));
