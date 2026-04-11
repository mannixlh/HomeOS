const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const roomSchema = new mongoose.Schema({
  name: String,
  level: String,
  assets: Array
});

const app = express();
app.use(cors());
app.use(express.json());

const Room = mongoose.model('Room', roomSchema);

app.post('/api/rooms', async (req, res) => {
  const newRoom = new Room(req.body);
  await newRoom.save();
  res.json(newRoom);
});

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log("✅ HouseOS Database Connected!"))
  .catch(err => console.error("❌ Connection error:", err));

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
});
