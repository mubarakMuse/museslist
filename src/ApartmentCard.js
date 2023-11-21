import React from "react";
import { FaPhone, FaExternalLinkAlt } from "react-icons/fa";

const ApartmentCard = ({ apartment }) => {
  const navigateToCompanyWebsite = () => {
    window.open(apartment.companyWebsite, "_blank");
  };

  const handleCallButtonClick = () => {
    window.location.href = `tel:${apartment.phone.replace(/\D/g, "")}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={apartment.image} alt={apartment.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2">{apartment.name}</h2>
        <p className="text-gray-600 text-sm mb-2">{apartment.address}</p>
        
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-lg font-semibold">{apartment.priceRange}</p>
          </div>
        </div>
        
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md mb-4">
          {apartment.deal}
        </span>
        
        <div className="flex items-center space-x-2 mt-4">
          <button
            onClick={handleCallButtonClick}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border border-black focus:outline-none"
          >
            <FaPhone className="mr-2" /> Call
          </button>
          <button
            onClick={navigateToCompanyWebsite}
            className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-black hover:text-white focus:outline-none"
          >
            <FaExternalLinkAlt className="mr-2" /> Visit Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
