import React from "react";
import ApartmentCard from "./ApartmentCard"; // Import your ApartmentCard component
import apartmentsData from "./ApartmentData"; // Import your sample data

const ApartmentList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {apartmentsData.map((apartment, index) => (
        <ApartmentCard key={index} apartment={apartment} />
      ))}
    </div>
  );
};

export default ApartmentList;
