import React, { useState } from "react";
import Select from "react-select"; // Install this library

import cityOptions from "./cities"; // Import city options
// import emailjs from 'emailjs-com';
import { supabase } from './supabase'; // Import your Supabase client instance

function ApartmentSearchForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: [],
    beds: "Any",
    baths: "Any",
    priceMin: 0,
    priceMax: 0,
    moveInDate: null,
    amenities: [],
  });
  const [submissionMessage, setSubmissionMessage] = useState("")

  const handleAmenityClick = (amenity) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a) => a !== amenity),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity],
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          amenities: [...formData.amenities, value],
        });
      } else {
        setFormData({
          ...formData,
          amenities: formData.amenities.filter((amenity) => amenity !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleLocationChange = (selectedOption) => {
    setFormData({ ...formData, location: selectedOption });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Insert the form data into your Supabase database table
      const { data, error } = await supabase
        .from('apartment_requests') // Replace 'your_table_name' with the actual table name
        .upsert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            beds: formData.beds,
            baths: formData.baths,
            priceMin: formData.priceMin,
            priceMax: formData.priceMax,
            moveInDate: formData.moveInDate,
            amenities: formData.amenities,
          }
        ]);
  
      if (error) {
        console.error('Error inserting data into Supabase:', error);
        setSubmissionMessage("Error: Something went wrong. Please try again later.")

      } else {
        console.log('Data inserted into Supabase:', data);        
  
        // const emailParams = {
        //   to_email: "mubarak014@gmail.com",
        //   message: JSON.stringify(formData),
        //   to_name: "Mubarak",
        //   reply_to: formData.email,
        // };
  
        // await emailjs
        //   .send('default_service', 'template_1jr7eem', emailParams, process.env.REACT_APP_EMAILJS_USER_ID);
  
        console.log('Email sent successfully');
        setSubmissionMessage(`Thank you for submitting your request, ${formData.name}! We will work diligently to find the best apartment and deal for you. You will receive an email at ${formData.email} within 24 hours.`)
  
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: [],
          beds: "Any",
          baths: "Any",
          priceMin: "",
          priceMax: "",
          moveInDate: "",
          amenities: [],
        });
    
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmissionMessage("Error: Something went wrong. Please try again later.")

    }

  
  };
  const SubmissionMessage = ({ submissionStatus }) => {
    if (!submissionStatus) {
      return null; // Don't render anything if there's no submission status
    }
  
    // Define a CSS class based on the submission status (success or error)
    const messageClass = submissionStatus.includes("Error")
      ? "bg-red-100 border border-red-400 text-red-700"
      : "bg-green-100 border border-green-400 text-green-700";
  
    return (
      <div className={`${messageClass} px-4 py-3 rounded relative`} role="alert">
        <strong className="font-bold">
          {submissionStatus.includes("Error") ? "Error!" : "Success!"}
        </strong>
        <span className="block sm:inline ml-2">
          {submissionStatus}
        </span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className={`fill-current h-6 w-6 ${
              submissionStatus.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.293 5.293a1 1 0 0 0-1.414 0L10 8.586 6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 0 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10l3.293-3.293a1 1 0 0 0 0-1.414z" />
          </svg>
        </span>
      </div>
    );
  };
  
  
  

  return (
    <div id="booking" className="max-w-md w-4/5  mx-auto p-6 border border-gray-300">
    {/* <div className="bg-base p-4 md:p-8 rounded shadow-md w-full md:w-96"> */}
    {submissionMessage? <SubmissionMessage submissionStatus={submissionMessage} /> :
      <form onSubmit={handleSubmit}>
  
        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-800 font-bold mb-2">
            Locations:
          </label>
          <Select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleLocationChange}
            options={cityOptions}
            placeholder="Select cities..."
            isMulti
            isSearchable
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        {/* Number of Beds */}
        <div className="mb-4">
          <label htmlFor="beds" className="block text-gray-800 font-bold mb-2">
            Number of Beds:
          </label>
          <select
            id="beds"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Any">Any</option>
            <option value="Studio">Studio</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4+</option>
          </select>
        </div>
  
        {/* Number of Baths */}
        <div className="mb-4">
          <label htmlFor="baths" className="block text-gray-800 font-bold mb-2">
            Number of Baths:
          </label>
          <select
            id="baths"
            name="baths"
            value={formData.baths}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Any">Any</option>
            <option value="1+">1+</option>
            <option value="2+">2+</option>
            <option value="3+">3+</option>
          </select>
        </div>
  
        {/* Price Range (Min) */}
        <div className="mb-4">
          <label htmlFor="priceMin" className="block text-gray-800 font-bold mb-2">
            Price Range (Min):
          </label>
          <input
            type="number"
            id="priceMin"
            name="priceMin"
            value={formData.priceMin}
            onChange={handleChange}
            className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        {/* Price Range (Max) */}
        <div className="mb-4">
          <label htmlFor="priceMax" className="block text-gray-800 font-bold mb-2">
            Price Range (Max):
          </label>
          <input
            type="number"
            id="priceMax"
            name="priceMax"
            value={formData.priceMax}
            onChange={handleChange}
            className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        {/* Move-In Date */}
        <div className="mb-4">
          <label htmlFor="moveInDate" className="block text-gray-800 font-bold mb-2">
            Move-In Date:
          </label>
          <input
            type="date"
            id="moveInDate"
            name="moveInDate"
            value={formData.moveInDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        {/* Amenities */}
        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-2">Amenities:</label>
          <div className="flex flex-wrap">
            {amenitiesOptions.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => handleAmenityClick(amenity)}
                className={`${
                  formData.amenities.includes(amenity)
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-800'
                } rounded-full px-4 py-2 m-1 focus:outline-none focus:ring-black`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>
  
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-800 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        {/* Phone (Optional) */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-800 font-bold mb-2">
            Phone (Optional):
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </form>}
    </div>
  // </div>
  
  );
}

const amenitiesOptions = [
  "Air Conditioning",
  "In Unit Washer & Dryer",
  "Washer & Dryer Hookups",
  "Dishwasher",
  "Wheelchair Access",
  "Parking",
  "Laundry Facilities",
  "Fitness Center",
  "Pool",
  "Elevator",
  "Doorman",
  "Dog Friendly",
  "Cat Friendly",
  "Furnished",
  "Lofts",
  "Utilities Included",
  "Gated",
  "Fireplace",
  "Patio",
  "Garage",
  "Hardwood Floors",
  "Balcony",
  "Office",
  "Den",
  "Yard",
  "Clubhouse",
  "Business Center",
  "Controlled Access",
  "Playground",
  "Basement",
  "Walk-In Closets",
  "Concierge",
  "EV Charging",
  "Storage Units",
  "Dog Park",
  "High Ceilings",
];

export default ApartmentSearchForm;
