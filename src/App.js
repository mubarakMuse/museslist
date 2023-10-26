// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DriverPage from './DriverPage';
import HomePage from './homepage';
import Drivers from './Drivers';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/drivers" element={<Drivers/>} />
          <Route path="/d/:name" element={<DriverPage />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
