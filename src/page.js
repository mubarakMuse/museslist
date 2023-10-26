import React, { useState } from 'react';
import { FiStar, FiPhone, FiChevronRight } from 'react-icons/fi';
import { DriversDB } from './DriversDB'; // Import the named export DriversDB
import BookingForm from './BookingForm';
import Overview from './Oveview.js';

function Page({name}) {

  let driverData = DriversDB[name];

  const [activeTab, setActiveTab] = useState('overview');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCallButtonClick = () => {
    // Use the tel: URI to open the user's default phone app with the number pre-filled
    window.location.href = `tel:${driverData.phoneNumber}`;
  };

  const handleBookButtonClick = () => {
    // Switch to the "Booking" tab
    setActiveTab('booking');
  };

  return (
    <div className="bg-white-600 p-2 shadow-lg rounded-lg w-96 mx-auto mt-7">
      <div className="text-center mb-4">
        <img
          src={driverData.pic}
          alt="Driver's Profile"
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        <h2 className="text-2xl font-semibold">{driverData.name}</h2>
        <p className="text-gray-500">{driverData.location}</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <button
          className={`${activeTab === 'overview'
            ? 'bg-primary text-white'
            : 'text-gray-500'
            } px-4 py-2 rounded-l-lg transition-colors hover:bg-primary`}
          onClick={() => handleTabChange('overview')}
        >
          <FiStar className="mr-1 inline-block" /> Overview
        </button>
        <button
          className={`${activeTab === 'booking'
            ? 'bg-primary text-white'
            : 'text-gray-500'
            } px-4 py-2 rounded-r-lg transition-colors hover:bg-primary`}
          onClick={() => handleTabChange('booking')}
        >
          <FiChevronRight className="mr-1 inline-block" /> Book a Ride
        </button>
      </div>

      {activeTab === 'overview' && ( 
        <div className="text-center">
          <Overview driverData={driverData} />
          <button
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary transition-colors duration-300 ease-in-out"
            onClick={handleBookButtonClick}
          >
            <FiChevronRight className="mr-2 inline-block" /> Book Now
          </button>
          <button
            className="bg-neutral text-white py-2 px-4 ml-2 rounded-md hover:bg-neutral transition-colors duration-300 ease-in-out"
            onClick={handleCallButtonClick}
          >
            <FiPhone className="mr-2 inline-block" /> Call {driverData.phoneNumber}
          </button>
        </div>
      )}

      {activeTab === 'booking' && (
        <div className="text-center">
          <BookingForm driverData={driverData}/>
        </div>
      )}
    </div>
  );
  }


export default Page;
