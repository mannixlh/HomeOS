import React, { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [rooms] = useState([
    { name: "Garage", level: "Lower", items: ["2014 Jeep Cherokee", "2018 Hyundai Tucson"] },
    { name: "Kitchen", level: "Main", items: ["Kenmore Elite Fridge"] }
  ]);

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
          <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '10px', width: '250px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{room.name}</h2>
            <p style={{ color: '#65676b', fontSize: '14px' }}>{room.level} Level</p>
            <ul style={{ paddingLeft: '20px' }}>
              {room.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '300px' }}>
            <h2>Add Room</h2>
            <p>Room Name:</p>
            <input type="text" style={{ width: '100%', marginBottom: '10px' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button style={{ backgroundColor: '#1877f2', color: 'white' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;