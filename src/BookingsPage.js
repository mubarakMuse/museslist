import React, { useState } from 'react';
import { supabase } from './supabase'; // Import your Supabase client instance

const BookingCard = ({ booking }) => {
  return (
    <div className="bg-white shadow-lg p-4 mb-4 rounded-md">
      <h3 className="text-xl font-semibold">{booking.full_name}</h3>
      <p>Email: {booking.email}</p>
      <p>Phone: {booking.phone}</p>
      <p>Pickup Location: {booking.pickup_location}</p>
      <p>Dropoff Location: {booking.dropoff_location}</p>
      <p>Date and Time: {new Date(booking.date_time).toLocaleString()}</p>
      <p>Special Instructions: {booking.special_instructions}</p>
      <p>Ride Type: {booking.ride_type}</p>
      <p>Car Type: {booking.car_type}</p>
      <p>Number of Passengers: {booking.num_passengers}</p>
      <p>Payment Method: {booking.payment_method}</p>
      <p>Total Cost: ${booking.total_cost.toFixed(2)}</p>
    </div>
  );
};

const BookingsPage = () => {
  // Fetch all bookings from the database

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// eslint-disable-next-line
  useEffect(() => {
    getBookings();
  }, );

  async function getBookings() {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select('*');

      if (error) {
        throw error;
      }

      setBookings(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">All Bookings</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {bookings && bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)}
    </div>
  );
};

export default BookingsPage;
