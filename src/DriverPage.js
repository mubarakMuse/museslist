// DriverPage.js
import React from "react"
import { DriversDB } from './DriversDB'; 
import { useParams } from 'react-router-dom';
import Page from './page';
import Error404 from './Error404';

function DriverPage() {
  const { name } = useParams();
  let drivers = Object.keys(DriversDB)
  return drivers.find(a => a === name) ? <Page name={name} /> : <Error404 />

}


export default DriverPage;
