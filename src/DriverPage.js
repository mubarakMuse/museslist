

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "./page";
import Error404 from "./Error404";
// import { createClient } from "@supabase/supabase-js";
import { supabase } from './supabase'; // Import your Supabase client instance


// const supabase = createClient(
//   "https://wakzuklfbtvgsmkjawuv.supabase.co",process.env.REACT_APP_SUPERBASE_KEY
  
// );

function DriverPage() {
  const { name } = useParams();
  const [drivers, setDrivers] = useState([]);
  // const [driver, setDriver] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// eslint-disable-next-line
  useEffect(() => {
    getDrivers();
  }, );

  async function getDrivers() {
    try {
      const { data, error } = await supabase
        .from("drivers")
        .select()
        .eq("username", name); // Assuming you have a "username" column in your table

      if (error) {
        throw error;
      }

      setDrivers(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  if (loading) {
    // Handle loading state, e.g., show a loading spinner
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle error state, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }

  if (drivers.length > 0) {
    return <Page name={name} driver={drivers[0]} />;
  } else {
    return <Error404 />;
  }
}

export default DriverPage;
