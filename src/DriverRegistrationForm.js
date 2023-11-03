import React, { useState } from "react";

const DriverRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    location: "",
    rating: 0,
    trips: 0,
    years_in_service: 0,
    car: "",
    services: [],
    phone_number: "",
    pic: "",
    email: "",
    cost_per_mile: 0.0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleServiceChange = (e) => {
    const { options } = e.target;
    const selectedServices = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedServices.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      services: selectedServices,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can submit the form data to your backend or perform any other actions here
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Driver Registration</h1>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for each data point */}
        <div className="mb-4">
          <label htmlFor="username" className="block font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        {/* Add more input fields for other data points */}
        {/* Example: */}
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>

        {/* Services selection (multiple) */}
        <div className="mb-4">
          <label htmlFor="services" className="block font-semibold">
            Services
          </label>
          <select
            id="services"
            name="services"
            multiple
            value={formData.services}
            onChange={handleServiceChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="Corporate Transportation">Corporate Transportation</option>
            <option value="Airport car service">Airport car service</option>
            <option value="Weddings, Proms, Sports & Social Events">
              Weddings, Proms, Sports & Social Events
            </option>
            <option value="Executive Limo">Executive Limo</option>
          </select>
        </div>

        {/* Add more input fields for other data points */}
        {/* Example: */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>

        {/* Submit button */}
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverRegistrationForm;
