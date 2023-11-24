// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import DriverPage from './DriverPage';
// import HomePage from './homepage';
// import Drivers from './Drivers';
// import Landing from './OutboundLimo';
// import BookingsPage from './BookingsPage';
// import LandingPage from './ApartmentSearchForm';
// import Apartments from './Apartments';
// import ApartmentList from './ApartmentList';
import Home from './Home';
import Apartments from './Apartments';
import "./App.css"; // Import your CSS file
// import DriverRegistrationForm from './DriverRegistrationForm';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/find" element={<Apartments/>} />

          {/* <Route path="/outbound-limo" element={<Landing/>} />
          <Route path="/outbound-limo/bookings" element={<BookingsPage/>} /> */}
          {/* <Route path="/drivers" element={<Drivers/>} />
          <Route path="/apartmentfinder" element={<LandingPage/>} />
          <Route path="/a" element={<Apartments/>} /> */}


          {/* <Route path="/drivers/register" element={<DriverRegistrationForm/>} /> */}
          {/* <Route path="/d/:name" element={<DriverPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
