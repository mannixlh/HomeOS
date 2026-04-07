import React, { useState } from 'react';

// This is a "Mini" version of the RoomCard inside this file 
// so we don't have to worry about broken imports for a second.
const LocalRoomCard = ({ name, level }) => (
  <div style={{ border: '2px solid blue', padding: '20px', margin: '10px', borderRadius: '10px', background: 'white' }}>
    <h2 style={{ margin: 0 }}>{name}</h2>
    <p style={{ color: 'gray' }}>{level} Level</p>
  </div>
);

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>HouseOS Dashboard</h1>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
        >
          + Add Room
        </button>
      </div>

      {showModal && (
  <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
    <div style={{ background: 'white', padding: '30px', borderRadius: '15px', width: '350px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
      <h2 style={{ marginBottom: '20px', color: '#1e3a8a' }}>Add New Room</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Room Name</label>
        <input 
          type="text" 
          placeholder="e.g., Garage" 
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Level</label>
        <select style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          <option>Main</option>
          <option>Upper</option>
          <option>Lower</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>Cancel</button>
        <button style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
          Save Room
        </button>
      </div>
    </div>
  </div>
)}

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        <LocalRoomCard name="Garage" level="Lower" />
        <LocalRoomCard name="Kitchen" level="Main" />
      </div>
    </div>
  );
}

export default App;