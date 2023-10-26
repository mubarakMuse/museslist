// DriverPage.js
import React, { useState, useRef, useEffect } from 'react';
import { FiStar, FiPhone, FiChevronRight } from 'react-icons/fi';
import { DriversDB } from './DriversDB'; // Import the named export DriversDB
import pic from "./nuurdiin.png"
import BookingForm from './BookingForm';
import { useNavigate,useParams } from 'react-router-dom';
import Overview from './Oveview.js';
import Page from './page';
import Error404 from './Error404';

function DriverPage() {
  const { name } = useParams();
  const navigate = useNavigate(); // Get the navigation function
  let drivers = Object.keys(DriversDB)
  return drivers.find(a=> a == name) ? <Page name={name}/> :<Error404/>

  }


export default DriverPage;
