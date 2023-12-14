import React from "react";
import ApartmentSearchForm from "./ApartmentSearchForm";

function Apartments() {
  const scrollToBookingForm = () => {
    const bookingForm = document.getElementById("form");
    if (bookingForm) {
      window.scrollTo({
        top: bookingForm.offsetTop,
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  };


  return (
    <div className="h-screen font-serif">
      {/* <header className="bg-base-100 border border-base-200">
        <nav className="bg-white p-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center">
          <Link to="/" className="text-2xl">
          Muse's List
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/submissions" className="text-black">
              View Submissions
            </Link>
          </div>
        </nav>
      </header> */}

      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight md:-mb-4">
            Find Your Dream Apartment Quickly{" "}
            <mark className="bg-base-800">Without Any Cost!</mark>
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            Tell us what you're looking for in an apartment, and apartment
            managers will connect you with the perfect unit.
          </p>

          <div>
            <button
              onClick={scrollToBookingForm}
              className="px-6 py-3 bg-black hover:bg-black text-white text-xl rounded-full"
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="">
          <img
            src={require("./assets/apartment-hunting.png")}
            alt="Apartment Hunting"
            className="lg:w-full border"
            priority={true}
            width={500}
            height={500}
          />
        </div>
      </section>

      <section className="py-10 bg-base-200 text-center" id="form">
        <ApartmentSearchForm />
      </section>

      <footer className="bg-base text-white py-8 text-center">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center mb-4 lg:mb-0">
            <img
              src={require("./assets/museslist_logo.png")}
              alt="Muse's List Logo"
              className="h-12 w-12 mr-2"
            />
            <div className="text-2xl text-black font-bold">Muse's List</div>
          </div>
          <div className="mt-4 text-black lg:mt-0">
            <p>
              &copy; {new Date().getFullYear()} Muse's List. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Apartments;
