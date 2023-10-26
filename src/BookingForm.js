import React, { useState, useRef } from 'react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ driverData }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Use the driver's Google Maps API key
    libraries: ['places'],
  });
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    dropoffLocation: '',
    dateTime: '',
    specialInstructions: '',
    rideType: 'one-way',
    numPassengers: '1',
    paymentMethod: 'pay-driver',
    totalCost: 0,
  });

  const pickupAutocomplete = useRef(null);
  const dropoffAutocomplete = useRef(null);

  const handlePlaceSelect = (place, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: place.formatted_address,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateRoute = () => {
    if (formData.pickupLocation === '' || formData.dropoffLocation === '') {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: formData.pickupLocation,
        destination: formData.dropoffLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          const distance = result.routes[0].legs[0].distance.text;
          const duration = result.routes[0].legs[0].duration.text;

          // Calculate cost based on distance using driver's rate
          const distanceinMiles = result.routes[0].legs[0].distance.value / 1609;
          const costPerMile = driverData.costPerMile || 10; // Use driver's rate or default to 10 if not specified
          const totalCost = distanceinMiles * costPerMile < 70 ? 70 : distanceinMiles * costPerMile;

          setFormData((prevData) => ({
            ...prevData,
            distance,
            duration,
            totalCost,
          }));
        } else {
          console.error('Error calculating route:', status);
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send booking data to a server
    console.log('Booking data:', formData);
    // Prepare the email parameters
    const emailParams = {
      to_email: driverData.email, // Use the driver's email address
      message: JSON.stringify(formData),
      to_name: driverData.name,
      // ... (other email parameters based on your template)
    };

    // Send the email using Email.js
    emailjs.send('default_service', 'template_1jr7eem', emailParams, process.env.REACT_APP_EMAILJS_USER_ID)
      .then((response) => {
        console.log('Email sent successfully:', response);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          pickupLocation: '',
          dropoffLocation: '',
          dateTime: '',
          specialInstructions: '',
          rideType: 'one-way',
          numPassengers: '1',
          paymentMethod: 'pay-driver',
          totalCost: 0,
        });
        navigate("/")
      })
      .catch((error) => {
        console.error('Email send error:', error);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
            Pickup Location
          </label>
          {isLoaded && (
            <Autocomplete
              onLoad={(autocomplete) => {
                pickupAutocomplete.current = autocomplete;
                autocomplete.setFields(['formatted_address']);
              }}
              onPlaceChanged={() =>
                handlePlaceSelect(pickupAutocomplete.current.getPlace(), 'pickupLocation')
              }
            >
              <input
                type="text"
                id="pickupLocation"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </Autocomplete>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700">
            Dropoff Location
          </label>
          {isLoaded && (
            <Autocomplete
              onLoad={(autocomplete) => {
                dropoffAutocomplete.current = autocomplete;
                autocomplete.setFields(['formatted_address']);
              }}
              onPlaceChanged={() =>
                handlePlaceSelect(dropoffAutocomplete.current.getPlace(), 'dropoffLocation')
              }
            >
              <input
                type="text"
                id="dropoffLocation"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </Autocomplete>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
            Date and Time
          </label>
          <input
            type="datetime-local"
            id="dateTime"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rideType" className="block text-sm font-medium text-gray-700">
            Ride Type
          </label>
          <select
            id="rideType"
            name="rideType"
            value={formData.rideType}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="one-way">One-Way</option>
            <option value="two-way">Two-Way</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="numPassengers" className="block text-sm font-medium text-gray-700">
            Number of Passengers
          </label>
          <input
            type="number"
            id="numPassengers"
            name="numPassengers"
            value={formData.numPassengers}
            onChange={handleInputChange}
            min="1"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="pay-driver">Pay Driver</option>
            <option value="pay-now">Pay Now</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700">
            Special Instructions
          </label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleInputChange}
            rows="4"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <h1>Cost: ${formData.totalCost.toFixed(2)}</h1>
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={calculateRoute}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
