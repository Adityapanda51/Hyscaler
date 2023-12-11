import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
// import { set } from "mongoose";

const Navbar = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    window.location.reload();
  };
  return (
    <div>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">DreamHome Realty!</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/service">Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              {!isloggedIn && (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
              {isloggedIn && (
                <>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleLogout}>Logout</NavLink>
                  </li>
                  <li style={{ display: "flex" }}>
                    <input
                      type="text"
                      placeholder="Search"
                      // Add your search functionality here
                    />
                    <button type="button">Search</button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
