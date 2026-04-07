import React from 'react';

const RoomCard = ({ roomName, level, assets }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 m-4 w-80 border-t-4 border-blue-500">
      <h2 className="text-2xl font-bold text-gray-800">{roomName}</h2>
      <p className="text-gray-500 text-sm mb-4">{level} Level</p>
      <div className="space-y-2">
        {assets.map((asset, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
            <span className="text-gray-700 font-medium">{asset.itemName}</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              {asset.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCard;