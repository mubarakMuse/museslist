import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { DriversDB } from './DriversDB'; // Import the named export DriversDB

const Drivers = () => {
  const DriverPreviewCard = ({ driverData, name }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <img
          src={driverData.pic} // Use the pic property from driverData
          alt={`${driverData.name}'s Profile`}
          className="w-32 h-32 mx-auto rounded-full"
        />
        <h2 className="text-xl font-semibold text-center mt-4">
          {driverData.name}
        </h2>
        <p className="text-gray-500 text-center">{driverData.location}</p>
        <Link to={`/d/${name}`} className="block mt-4">
          {/* Use Link component to navigate to the driver's URL */}
          <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded-full w-full">
            View Profile
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {Object.keys(DriversDB).map((driverName) => (
        <DriverPreviewCard
          key={driverName}
          driverData={DriversDB[driverName]}
          name= {driverName}
        />
      ))}
    </div>
  );
};

export default Drivers;
