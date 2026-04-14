const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const roomSchema = new mongoose.Schema({
  name: String,
  level: String,
  devices: Array
});

const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());
app.use(express.json());

const Room = mongoose.model('Room', roomSchema);


const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log("✅ HouseOS Database Connected!"))
  .catch(err => console.error("❌ Connection error:", err));

app.delete('/api/rooms/clear', async (req, res) => {
  try {
    const result = await Room.deleteMany({});
    console.log("Wiped Database:", result);
    res.status(200).json({ message: "Database cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/rooms', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/rooms/:id/add-device', async (req, res) => {
  try {
    const { device } = req.body;
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $push: { devices: device } },
      { new: true }
    );
    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/rooms', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

app.get('/', (req, res) => {
  res.send("HouseOS Server is Running");
});

const Room = require('./models/Room');

app.post('/api/rooms', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ error: "Error saving room: " + err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
});
