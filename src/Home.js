import React from "react";
import ApartmentList from "./ApartmentList";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center text-center font-serif justify-center p-6">
        <p className="text-gray-700 font-bold   italic mb-4">
          An exclusive list of the best apartment deals in Minnesota.
        </p>
        <p className="text-gray-600 italic text-sm mb-3">
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
              src={require("./assets/museslist_logo.png")} // Replace with the actual path to your logo image
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
