const express = require('express');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const Recording = require('./models/recording');

const app = express();
const upload = multer({ dest: 'uploads/' });

mongoose.connect('mongodb+srv://priyanshuraj30122003:zHNCezvpxt2GGFwZ@cluster0.0dyfbjs.mongodb.net/');

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.post('/recording/', upload.single('soundFile'), async (req, res) => {
  try {
    const soundData = await fs.promises.readFile(req.file.path);
    const base64SoundData = soundData.toString('base64');
    fs.unlinkSync(req.file.path); // Remove temporary file
    
    const newRecording = await Recording.create({
      doctorName: req.body.doctorName,
      patientName: req.body.patientName,
      patientAge: req.body.patientAge,
      dateOfRecording: req.body.dateOfRecording,
      soundFile: base64SoundData
    });

    res.status(201).json(newRecording);
  } catch (error) {
    console.error('Error creating recording:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/recording/', async (req, res) => {
    try {
      const recordings = await Recording.find();
      res.status(200).json(recordings);
    } catch (error) {
      console.error('Error fetching recordings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
