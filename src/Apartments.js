import React from 'react';
import ApartmentSearchForm from './ApartmentSearchForm';

function Apartments() {

//   const handleCallButtonClick = () => {
//     // Use JavaScript to initiate a phone call
//     window.location.href = 'tel:6128149554';
//   };

  const scrollToBookingForm = () => {
    const bookingForm = document.getElementById('bookingFormSection');
    if (bookingForm) {
      window.scrollTo({
        top: bookingForm.offsetTop,
        behavior: 'smooth', // Smooth scrolling effect
      });
    }
  };
  const scrollToLearnMore = () => {
    const bookingForm = document.getElementById('howItWorks');
    if (bookingForm) {
      window.scrollTo({
        top: bookingForm.offsetTop,
        behavior: 'smooth', // Smooth scrolling effect
      });
    }
  };
  return (
    <div className="h-screen">
    <header className="bg-base-100 border border-base-200">
  <nav className="p-4 flex flex-col lg:flex-row justify-center items-center">
    <div className="flex items-center">
      <img
        src={require("./museslist_logo.png")} // Replace with the actual path to your logo image
        alt="Muse's List" // Provide an alt text for accessibility
        className="h-12 w-12 mr-2" // Adjust the height and width as needed
      />
      <div className="text-3xl font-bold">Muse's List</div>
    </div>
  </nav>
</header>


      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight md:-mb-4">
            Find Your Next Dream Apartment Fast And At Zero Cost!
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            Tell us what kind of apartment you are looking for, and within 24 hours, we'll email you a curated list of apartments that match your preferences.
          </p>
          
          <div>
            <button onClick={scrollToBookingForm} className=" px-6 py-3  bg-black hover:bg-black text-white text-xl rounded-full">
              Get Started Now
            </button>
            <button onClick={scrollToLearnMore} className=" px-6 py-3  bg-black  bg-transparent text-black text-xl rounded-full">
              Learn More <span aria-hidden="true">→</span>
              
            </button>
          </div>
        </div>
        <div className="">
          <img
            src={require("./DALL·E 2023-11-07 11.18.09 - Create a black and white image of a Hispanic man examining several beautiful apartments. The apartments feature diverse modern designs with prominent .png")}
            alt="Product Demo"
            className="lg:w-full border "
            priority={true}
            width={500}
            height={500}
          />
        </div>
      </section>

      <section id= "howItWorks" className="bg-base-200 border border-base-300">
        <div className="p-8 ">
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-bold mb-8">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="card bg-white text-center rounded-lg shadow-md flex flex-col">
                <div
                  className="h-48 w-full bg-cover bg-center rounded-t"
                  style={{ backgroundImage: `url(${require("./form.png")})` }}
                ></div>
                <div className="p-4 flex-grow">
                  <h2 className="text-xl font-semibold mb-2">Fill Out a Form</h2>
                  <p className="text-gray-700">
                    Fill out a form to let us know what you are looking for, including the number of rooms, bathrooms, and more.
                  </p>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="card bg-white  text-center rounded-lg shadow-md flex flex-col">
                <div
                  className="h-48 w-full  bg-cover bg-center rounded-t"
                  style={{ backgroundImage: `url(${require("./email.png")})` }}
                ></div>
                <div className="p-4 flex-grow">
                  <h2 className="text-xl font-semibold mb-2">Receive an Email</h2>
                  <p className="text-gray-700">
                    In 24 hours, we'll email you a curated list of apartments that match your preferences, complete with special deals and discounted rent prices.
                  </p>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="card bg-white  text-center rounded-lg shadow-md flex flex-col">
                <div
                  className="h-48 w-full bg-cover bg-center rounded-t"
                  style={{ backgroundImage: `url(${require("./keys.png")})` }}
                ></div>
                <div className="p-4 flex-grow">
                  <h2 className="text-xl font-semibold mb-2">Move into Your Apartment</h2>
                  <p className="text-gray-700">
                    Move into your dream apartment hassle-free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Why Choose Us" Section */}
      <section className="bg-base-100 shadow-sm py-16 border border-base-300">
        <h2 className="text-center text-4xl font-bold mb-8">Why Choose Us</h2>
        <p className="text-center mb-12">We ensure that every one of your apartment hunting experiences is memorable.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="border p-8 text-center">
          <div className="border-2 border-gray-300 inline-block mb-6">
              <img src={require("./undraw_Security_re_a2rk.png")} alt="Safety First Approach" className="mx-auto p-4 h-24" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Fast and Simple</h3>
            <p>We provide seamless apartment hunting services to give you a first-class experience.</p>
          </div>
          <div className="border p-8 text-center">
            <div className="border-2 border-gray-300  inline-block mb-6">
              <img src={require("./undraw_Security_re_a2rk.png")} alt="Safety First Approach" className="mx-auto p-4 h-24" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Time Saving</h3>
            <p>Your time is valuable. Let us simplify your apartment search and save you time.</p>
          </div>
          <div className="border p-8 text-center">
            <div className="border-2 border-gray-300 inline-block mb-6">
              <img src={require("./undraw_Booking_re_gw4j.png")} alt="Easy Booking" className="mx-auto p-4 h-24" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Discounted Pricing</h3>
            <p>Book your dream apartment hassle-free and enjoy discounted rent prices.</p>
          </div>
          <div className="border p-8 text-center">
            <div className="border-2 border-gray-300 inline-block mb-6">
              <img src={require("./undraw_Browser_stats_re_j7wy.png")} alt="Reliability" className="mx-auto p-4 h-24" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Quality Apartments</h3>
            <p>We ensure that the apartments we recommend meet your quality standards for a comfortable living experience.</p>
          </div>
        </div>
      </section>

      <section className=" py-10 bg-base-200 text-center" id="bookingFormSection">
        <h2 className="text-center text-4xl font-bold mb-8">Find Your Dream Apartment Now</h2>
        <ApartmentSearchForm/>
      </section>

      <footer className="bg-base text-white py-8 text-center">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center mb-4 lg:mb-0">
            <img
              src={require("./museslist_logo.png")} // Replace with the actual path to your logo image
              alt="Muse's List" // Provide an alt text for accessibility
              className="h-12 w-12 mr-2" // Adjust the height and width as needed
            />
            <div className="text-2xl text-black font-bold">Muse's List</div>
          </div>
          <div className="mt-4 text-black lg:mt-0">
            <p>&copy; {new Date().getFullYear()} Muse's List. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Apartments;
