// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Apartments from "./Apartments";
import "./App.css"; // Import your CSS file
import SubmissionsListPage from "./SubmissionsListPage";
import SubmissionViewPage from "./SubmissionViewPage";

const App = () => {
  return (
    <div>
      <Router>
        <div className="navbar border font-serif bg-base-100">
          <div className="flex-1">
            {/* <img
              src={require("./assets/museslist_logo.png")}
              alt="Muse's List"
              className="h-10 w-10 "
            /> */}
            <a
              href="/"
              className="lg:px-1 px-1 font-serif  lg:text-2xl text-lg"
            >
              BaseFinds
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu text-sm menu-horizontal">
              <li>
                <a href="/submissions">Submissions</a>
              </li>
              <li>
                <a href="/deals">Deals</a>
              </li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Apartments />} />
          <Route path="/deals" element={<Home />} />
          <Route path="/submissions" element={<SubmissionsListPage />} />
          <Route path="/submissions/:id" element={<SubmissionViewPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
