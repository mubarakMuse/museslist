import React from "react";
import ApartmentList from "./ApartmentList";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
       <nav className="bg-white p-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center">
          <img
            src={require("./museslist_logo.png")}
            alt="Muse's List"
            className="h-12 w-12 mr-2"
          />
          <div className="text-3xl font-bold">Muse's List</div>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/find">
            <button className="bg-black text-white px-3 py-2 rounded-lg shadow  hover:bg-black-100 focus:outline-none">
              Find Me An Apartment [FREE]
            </button>
          </Link>
        </div>
      </nav>
      <div className="flex flex-col items-center text-center font-serif justify-center p-6">
        <p className="text-gray-700 font-bold  lg:text-xl italic mb-4">
          An exclusive list of the best apartment deals in Minnesota.
        </p>
        <p className="text-gray-700 font-bold italic lg:text-l mb-3">
          Carefully vetted and maintained by humans.
        </p>
      </div>
      <div className="">
        <ApartmentList />
      </div>
      <footer className="bg-base text-white py-8 text-center">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center mb-4 lg:mb-0">
            <img
              src={require("./museslist_logo.png")} // Replace with the actual path to your logo image
              alt="Muse's List" // Provide an alt text for accessibility
              className="h-12 w-12 mr-2" // Adjust the height and width as needed
            />
            <div className="text-2xl text-black font-bold">Muse's List</div>
          </div>
          <div className="mt-4 text-black lg:mt-0">
            <p>&copy; {new Date().getFullYear()} Muse's List. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>

  );
};

export default Home;
