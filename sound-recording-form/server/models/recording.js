// This is the recording.js file
const mongoose = require('mongoose');

const SoundSchema = new mongoose.Schema({
    name: String,
    data: Buffer
});

const recordingSchema = new mongoose.Schema({
  doctorName: String,
  patientName: String,
  patientAge: Number,
  dateOfRecording: Date,
  soundFile: String, // This will store the file path
});

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;
