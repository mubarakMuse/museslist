import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import emailjs from 'emailjs-com';
import { createClient } from '@supabase/supabase-js';


const BookingFormOb = ({ driverData }) => {
  function formatDateTime(dateTimeValue) {
    const date = new Date(dateTimeValue);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  const supabase = createClient(
    "https://wakzuklfbtvgsmkjawuv.supabase.co",process.env.REACT_APP_SUPERBASE_KEY
    
  );
  const BookingSuccess = () => {
    return (
      <div className="max-w-md bg-green-200 mx-auto p-6 border border-green-400">
        <h2 className="text-lg font-semibold text-green-800 mb-2">Booking Submitted Successfully</h2>
        <p>Your booking request has been successfully submitted. </p> <p>We will reach out to you ASAP via text or call to comfirm you booking. Thank you!</p>
      </div>
    );
  };
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    dropoffLocation: '',
    dateTime: '',
    specialInstructions: '',
    rideType: 'one-way',
    carType: 'SUV',
    numPassengers: '1',
    paymentMethod: 'pay-driver',
    totalCost: 0,
  });
  const [distance, setDistance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [showReview, setShowReview] = useState(false);

  const pickupAutocomplete = useRef(null);
  const dropoffAutocomplete = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handlePlaceSelect = (place, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: place.formatted_address,
    }));

    if (formData.pickupLocation && formData.dropoffLocation) {
      calculateRoute();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name,value)
  };

  useEffect(() => {
    if (formData.pickupLocation && formData.dropoffLocation) {
      calculateRoute();
    }
    // eslint-disable-next-line
  }, [formData.pickupLocation, formData.dropoffLocation, formData.carType]);

  function calculateRoute() {
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
          const distanceinMiles = result.routes[0].legs[0].distance.value / 1609;
          const costPerMile =
            formData.carType === 'SUV' ? driverData.costPerMile : driverData.costPerMileSedan;
          const totalCost =
            distanceinMiles * costPerMile + driverData.startCost < driverData.minRideCost
              ? driverData.minRideCost
              : distanceinMiles * costPerMile;

          setFormData((prevData) => ({
            ...prevData,
            distance,
            duration,
            totalCost,
          }));
          setDistance(distance);
          setTotalCost(totalCost);
        } else {
          console.error('Error calculating route:', status);
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ... (previous code)
  
    try {
      // Insert the form data into your Supabase database table
      const { data, error } = await supabase
        .from('bookings') // Replace 'your_table_name' with the actual table name
        .upsert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            pickup_location: formData.pickupLocation,
            dropoff_location: formData.dropoffLocation,
            date_time: formData.dateTime,
            special_instructions: formData.specialInstructions,
            ride_type: formData.rideType,
            car_type: formData.carType,
            num_passengers: formData.numPassengers,
            payment_method: formData.paymentMethod,
            total_cost: formData.totalCost,
          },
        ]);
  
      if (error) {
        console.error('Error inserting data into Supabase:', error);
      } else {
        console.log('Data inserted into Supabase:', data);
  
        // Email sending logic
        const emailBody = `
          Hello ${driverData.name},
          
          You have received a new booking request from a customer:
          
          Full Name: ${formData.fullName}
          Email: ${formData.email}
          Phone: ${formData.phone}
          Pickup Location: ${formData.pickupLocation}
          Dropoff Location: ${formData.dropoffLocation}
          Date and Time: ${formData.dateTime}
          Special Instructions: ${formData.specialInstructions}
          Ride Type: ${formData.rideType}
          Car Type: ${formData.carType}
          Number of Passengers: ${formData.numPassengers}
          Payment Method: ${formData.paymentMethod}
          Total Cost: $${formData.totalCost.toFixed(2)}
          
          Best wishes,
          Museslist.com/d/${driverData.username}
        `;
  
        const emailParams = {
          to_email: driverData.email,
          message: emailBody,
          to_name: driverData.name,
          reply_to: formData.email,
        };
  
        await emailjs
          .send('default_service', 'template_1jr7eem', emailParams, process.env.REACT_APP_EMAILJS_USER_ID);
  
        console.log('Email sent successfully');
  
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          pickupLocation: '',
          dropoffLocation: '',
          dateTime: '',
          specialInstructions: '',
          rideType: 'one-way',
          carType: 'SUV',
          numPassengers: '1',
          paymentMethod: 'pay-driver',
          totalCost: 0,
        });
        setShowReview(false);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
  };
  
  

  const handleReviewClick = () => {
    setShowReview(true);
  };

  return (
    <div  id="booking" className="max-w-md  bg-base-200 mx-auto p-6 border border-gray-300 ">
      {isSubmitted ? (
        <BookingSuccess />
      ) : (
        <form onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <label htmlFor="carType" className="block text-sm font-medium text-gray-700">
            Car Type
          </label>
          <select
            id="carType"
            name="carType"
            value={formData.carType}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
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
        <div className="mb-4">
          <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
            Distance
          </label>
          <input
            type="text"
            id="distance"
            name="distance"
            value={distance}
            readOnly
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalCost" className="block text-sm font-medium text-gray-700">
            Total Cost
          </label>
          <input
            type="text"
            id="totalCost"
            name="totalCost"
            value={`$${totalCost.toFixed(2)}`}
            readOnly
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          />
        </div>

        {showReview ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">Review Your Booking</h2>
            <p>
              <strong>Full Name:</strong> {formData.fullName}
            </p>
            <p>
              <strong>Time:</strong> {formatDateTime(formData.dateTime)}
            </p>
            <p>
              <strong>Pickup Location:</strong> {formData.pickupLocation}
              
            </p>
            <p>
              <strong>Dropoff Location:</strong> {formData.dropoffLocation}
              
            </p>
            {/* Add other review fields here */}
            <p>
              <strong>Distance:</strong> {distance} Miles
            </p>
            <p>
              <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
            </p>
         
            <button
              type="button"
              onClick={() => setShowReview(false)}
              className="inline-block mt-2 text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleReviewClick}
            className="inline-block mt-4 text-blue-600 hover:text-blue-700"
          >
            Review Booking
          </button>
        )}
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Book Ride
          </button>
        </div>
      </form>
      )}
      
    </div>
  );
};

export default BookingFormOb;
