import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {

  return (
    <div className="bg-primary min-h-screen text-white">
      <header className="py-8 text-center">
        <img
          src="./museslist_logo.png" // Add your logo image path here
          alt="MusesList Logo"
          className="w-32 h-32 mx-auto mb-4" // Adjust the size as needed
        />
        <h1 className="text-4xl font-semibold">Welcome to MusesList</h1>
        <p className="text-lg mt-2">Your Platform for Private Car Booking</p>
      </header>
      <main className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg text-gray-800">
        <h2 className="text-2xl font-semibold mb-4">For Private Car Drivers</h2>
        <p className="mb-4">
          Create your dedicated booking page on MusesList and allow your customers to book rides with ease.
        </p>
        <p className="mb-4">
          Your custom URL will be <strong>museslist.com/d/your-username</strong>.
        </p>
        <p className="mt-6">
          Wanna see examples?{' '}
          <Link to="/drivers" className="text-indigo-600 hover:underline">
           check some out here
          </Link>
        </p>
        <p className="mb-6">
          Express your interest in signing up below, and we'll get in touch with you:
        </p>
        <iframe title='interest_form' src="https://docs.google.com/forms/d/e/1FAIpQLSfh0MikeS6c6IFSQMlTc_9Pzk1mRiS1--PSTaSrJ-Vz4wleBw/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
      </main>
      <footer className="text-center py-4 mt-8">
        &copy; {new Date().getFullYear()} MusesList. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
