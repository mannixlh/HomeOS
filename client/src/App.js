import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/rooms');
        setRooms(res.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms(); 
  }, []);
  const handleSaveRoom = async (e) => {
    if (e) e.preventDefault();

    if (!newRoomName) return;

      try {
        const response = await axios.post('http://localhost:5000/api/rooms', {
          name: newRoomName,
          devices: [] //default empty devices list
        });
        setRooms([...rooms, response.data]);
        setNewRoomName("");
        setShowModal(false);
      } catch (err) {
        console.error("Error adding room:", err);
      }
    };
    const handleAddDevice = async (roomId) => {
      const deviceName = prompt("Enter device name:");
      if (!deviceName) return;
      
      try {
        const response = await axios.put(`http://localhost:5000/api/rooms/${roomId}/add-device`, {
          device: deviceName
        });
        
        setRooms(rooms.map(room => room._id === roomId ? response.data : room));
      } catch (err) {
        console.error("Error adding device:", err);

      }
    };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>HouseOS Dashboard</h1>
        <button onClick={() => setShowModal(true)} style={{ padding: '10px 20px', backgroundColor: '#1877f2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          + Add Room
        </button>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {rooms.map((room, i) => (
          <div key={room._id || i} style={{ background: 'white', padding: '20px', borderRadius: '10px', width: '250px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{room.name}</h2>
            <ul style={{ paddingLeft: '20px' }}>
              {room.devices && room.devices.map((device, j) => <li key={j}>{device}</li>)}
            </ul>
            <button onClick={() => handleAddDevice(room._id)} style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#1877f2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              + Add Device
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '300px' }}>
            <h2>Add Room</h2>
            <p>Room Name:</p>
            <input 
              type="text" 
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              style={{ width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' }} 
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button 
              type="button"
              onClick={handleSaveRoom}
              style={{ backgroundColor: '#1877f2', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px' }}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;