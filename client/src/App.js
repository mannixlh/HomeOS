import React from 'react';
import RoomCard from './components/RoomCard';

function App() {
  const myRooms = [
    {
      name: "Garage",
      level: "Lower",
      assets: [
        { itemName: "2014 Jeep Cherokee", status: "Healthy" },
        { itemName: "2007 Jeep Grand Cherokee", status: "Healthy" }
      ]
    },
    {
      name: "Kitchen",
      level: "Main",
      assets: [
        { itemName: "Kenmore Elite Fridge", status: "Running" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-900">HouseOS</h1>
        <p className="text-gray-600">Split-Level Management System</p>
      </header>
      
      <div className="flex flex-wrap justify-center">
        {myRooms.map((room, index) => (
          <RoomCard 
            key={index} 
            roomName={room.name} 
            level={room.level} 
            assets={room.assets} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;