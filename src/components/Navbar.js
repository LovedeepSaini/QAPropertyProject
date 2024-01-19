import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import {  HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';


function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar navbar-expand-sm sticky-top">
        <div className="container-fluid">
          <NavLink exact to="/" className="nav-logo ">
            <span><FontAwesomeIcon icon={faHome} size ="2x" />QA Properties</span>
            {/* <i className="fas fa-code"></i> */}
            
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
              <NavLink
                exact
                to="/Home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                 <FontAwesomeIcon icon={faHome} />Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/seller"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                 <FontAwesomeIcon icon={faBriefcase} />Sellers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/buyer"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                 <FontAwesomeIcon icon={faUsers} />Buyers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/property"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <FontAwesomeIcon icon={faBuilding} /> Property 
              </NavLink>
            </li>
          
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;