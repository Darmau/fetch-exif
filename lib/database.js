const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  exif: {
    Maker: { type: String, default: 'unknown' },
    Model: { type: String, default: 'unknown' },
    ExposureTime: { type: String, default: 'unknown' },
    FNumber: { type: String, default: 'unknown' },
    iso: { type: String, default: 'unknown' },
    FocalLength: { type: String, default: 'unknown' },
    LensModel: { type: String, default: 'unknown' }
  },
  gps: {
    latitude: { type: Number, required: true, default: 0 },
    longitude: { type: Number, required: true, default: 0 }
  },
  createdAt: { type: Date, expires: '90d', default: Date.now }
})

module.exports = {
  Raw: mongoose.model('Raw', imageSchema)
}