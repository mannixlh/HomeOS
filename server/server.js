require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace this with your actual URI from the .env file
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