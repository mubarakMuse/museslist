import React from 'react';
import { DriversDB } from './DriversDB';
import BookingFormOb from './BookingFormOb';

function OutboundLimo() {
  const driverData = DriversDB["outbound_limo"];

  const handleCallButtonClick = () => {
    // Use JavaScript to initiate a phone call
    window.location.href = 'tel:6128149554';
  };

  const scrollToBookingForm = () => {
    const bookingForm = document.getElementById('bookingFormSection');
    if (bookingForm) {
      window.scrollTo({
        top: bookingForm.offsetTop,
        behavior: 'smooth', // Smooth scrolling effect
      });
    }
  };
  return (
    <div className="h-screen">
      <header className="bg-base-200">
        <nav className="p-4 flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center mb-4 lg:mb-0">
            <img
              src={require("./outboundlogo.png")} // Replace with the actual path to your logo image
              alt="Private Limo Logo" // Provide an alt text for accessibility
              className="h-12 w-12 mr-2" // Adjust the height and width as needed
            />
            <div className="text-2xl font-bold">Outbound Limo</div>
          </div>
          <div className="space-x-4 flex flex-col lg:flex-row">
            <button
              onClick={handleCallButtonClick}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full mb-2 lg:mb-0"
            >
              Call {DriversDB.outbound_limo.phoneNumber}
            </button>
            <button
              onClick={scrollToBookingForm} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
            >
              Book Now
            </button>
            
          </div>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
            Experience Luxury Travel
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            Arrive in style, comfort, and elegance with Outbound Limo.
          </p>
          
          <div>
          <button onClick={handleCallButtonClick} className=" px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white text-xl font-semibold">
          Call {DriversDB.outbound_limo.phoneNumber}
            </button>
            <button onClick={scrollToBookingForm} className=" px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold">
              Book Your Exclusive Ride Today
            </button>

          </div>
        </div>
        <div className="lg:w-full">
          <img
            src={require("./2022-chevrolet-suburban-premier-suv-angular-front.png")}
            alt="Product Demo"
            className="w-full"
            priority={true}
            width={500}
            height={500}
          />
        </div>
      </section>

      <section className="bg-base-300">
        <div className="p-8 ">
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-bold mb-8">Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="card bg-white rounded-lg shadow-md flex flex-col">
                <div
                  className="h-48 w-full bg-cover bg-center rounded-t"
                  style={{ backgroundImage: `url(${require("./airport_transfer.png")})` }}
                ></div>
                <div className="p-4 flex-grow">
                  <h2 className="text-xl font-semibold mb-2">AIRPORT TRANSFERS</h2>
                  <p className="text-gray-700">
                    Let’s get you to or from the airport in style & convenience. Sit back and
                    enjoy top-quality chauffeured transportation service.
                  </p>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="card bg-white rounded-lg shadow-md flex flex-col">
                <div
                  className="h-48 w-full bg-cover bg-center rounded-t"
                  style={{ backgroundImage: `url(${require("./coparate_travel.png")})` }}
                ></div>
                <div className="p-4 flex-grow">
                  <h2 className="text-xl font-semibold mb-2">CORPORATE TRAVEL</h2>
                  <p className="text-gray-700">
                    Take advantage of our first-class limo transportation service to enjoy a
                    stress-free business road trip and arrive at your destination safely & on
                    time.
                  </p>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="card bg-white rounded-lg shadow-md flex flex-col">
                <div
                  className="h-48 w-full bg-cover bg-center rounded-t"
                  style={{ backgroundImage: `url(${require("./event_lesiure.png")})` }}
                ></div>
                <div className="p-4 flex-grow">
                  <h2 className="text-xl font-semibold mb-2">EVENT LEISURE</h2>
                  <p className="text-gray-700">
                    Leave the “how you will get there in style” worries to us. Our premium limo
                    service will get you to your event destination in flair.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Why Choose Us" Section */}
      <section className="bg-base-100 py-16">
        <h2 className="text-center text-4xl font-bold mb-8">WHY CHOOSE US</h2>
        <p className="text-center mb-12">We ensure that every one of your road trips is memorable.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="border p-8 text-center">
            <div className="border-2 border-gray-300 inline-block mb-6">
              <img
                src={require("./undraw_delivery_truck_vt6p.png")}
                alt="Professional Services"
                className="mx-auto p-4 h-24"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">PROFESSIONAL SERVICES</h3>
            <p>We provide seamless limo transportation service to give you a first-class ground trip experience.</p>
          </div>
          <div className="border p-8 text-center">
            <div className="border-2 border-gray-300  inline-block mb-6">
              <img src={require("./undraw_Security_re_a2rk.png")} alt="Safety First Approach" className="mx-auto p-4 h-24" />
            </div>
            <h3 className="text-xl font-semibold mb-4">SAFETY FIRST APPROACH</h3>
            <p>Your safety is our priority. Our limos are always in great condition, and our chauffeurs are well-trained.</p>
          </div>
          <div className="border p-8 text-center">
            <div className="border-2 border-gray-300 inline-block mb-6">
              <img src={require("./undraw_Booking_re_gw4j.png")} alt="Easy Booking" className="mx-auto p-4 h-24" />
            </div>
            <h3 className="text-xl font-semibold mb-4">EASY BOOKING</h3>
            <p>Book your memorable experience with us via our fast online booking form, Call or send SMS.</p>
          </div>
          <div className="border p-8 text-center">
            <div className="border-2 border-gray-300 inline-block mb-6">
              <img src={require("./undraw_Browser_stats_re_j7wy.png")} alt="Reliability" className="mx-auto p-4 h-24" />
            </div>
            <h3 className="text-xl font-semibold mb-4">RELIABILITY</h3>
            <p>We take the hassle off your neck and ensure that you or your guests arrive at the destination in comfort.</p>
          </div>
        </div>
      </section>

      <section className="bg-base-300 py-16 text-center" id="bookingFormSection">
        <h2 className="text-center text-4xl font-bold mb-8">MAKE YOUR RESERVATION NOW</h2>
        <BookingFormOb driverData={driverData} />
      </section>

      <footer className="bg-base-100 text-white py-8 text-center">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center mb-4 lg:mb-0">
            <img
              src={require("./outboundlogo.png")} // Replace with the actual path to your logo image
              alt="Private Limo Logo" // Provide an alt text for accessibility
              className="h-12 w-12 mr-2" // Adjust the height and width as needed
            />
            <div className="text-2xl text-black font-bold">Outbound Limo</div>
          </div>
          <div className="mt-4 text-black lg:mt-0">
            <p>&copy; {new Date().getFullYear()} Outbound Limo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default OutboundLimo;
