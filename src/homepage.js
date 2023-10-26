import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-indigo-900 text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Muse's List </h1>
      <p className="text-lg mb-8">
        the One stop shop for black car drivers 
      </p>
      <div className="space-y-4">
        <Link
          to="/drivers"
          className="bg-indigo-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-600 transition duration-300 ease-in-out"
        >
          View Drivers
        </Link>
        <Link
          to="/about"
          className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-600 hover:border-indigo-600 transition duration-300 ease-in-out"
        >
          About Us
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
