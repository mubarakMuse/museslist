import React, { useEffect, useState } from 'react';
import ApartmentCard from './ApartmentCard';
import { supabase } from './supabase'; // Import your Supabase client instance

const ApartmentList = () => {
  const [apartmentsData, setApartmentsData] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const { data, error } = await supabase.from('apartments').select('*');
        if (error) {
          throw error;
        }
        setApartmentsData(data);
      } catch (error) {
        console.error('Error fetching apartments:', error.message);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {apartmentsData.map((apartment, index) => (
        <ApartmentCard key={index} apartment={apartment} />
      ))}
    </div>
  );
};

export default ApartmentList;
