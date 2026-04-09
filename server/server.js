const cors = require('cors');
app.use(cors());
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
  name: String,
  level: String,
  assets: Array
});

const Room = mongoose.model('Room', roomSchema);

app.post('/api/rooms', async (req, res) => {
  const newRoom = new Room(req.body);
  await newRoom.save();
  res.json(newRoom);
});

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log("✅ HouseOS Database Connected!"))
  .catch(err => console.error("❌ Connection error:", err));

app.get('/', (req, res) => {
  res.send("HouseOS Server is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
});
