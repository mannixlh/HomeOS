const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { type } = require('os');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(cors());
app.use(express.json());

const roomSchema = new mongoose.Schema({
  name: String,
  level: String,
  paintBrand: String,
  paintColor: String,
  devices: [{
    name: String, 
    status: {type: String, default: 'off'}, 
    lastServiced: {type: Date, default: Date.now}
  }]
});

const Room = mongoose.model('Room', roomSchema);

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log("✅ HomeOS Database Connected!"))
  .catch(err => console.error("❌ Connection error:", err));

//Delete Room
app.delete('/api/rooms/:id', async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Save Room
app.post('/api/rooms', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Add Device to Room
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

//Add service to device
app.put('/api/rooms/:roomId/devices/:deviceIndex/service', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    room.devices[req.params.deviceIndex].lastServiced = Date.now();
    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get All Rooms
app.get('/api/rooms', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

app.get('/', (req, res) => {
  res.send("HomeOS Server is Running");
});


const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
});
