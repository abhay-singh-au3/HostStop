import React, { Fragment, useState, useEffect } from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import SearchExperience from "./SearchExperience";
import SearchPlaces from "./SearchPlaces";
import "../styles/hostdashboard.css";
import axios from "axios";
export default function NewNavBar() {
  const [isPlace, setIsPlace] = useState(true);
  const onClickPlace = () => setIsPlace(true);
  const onClickExp = () => setIsPlace(false);

  const onLogout = () => {
    fetch("logout", {
      method: "get",
      credentials: "include"
    })
      .then(function(response) {
        if (response.redirected) {
          return window.location.replace(response.url);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  return (
    <Fragment>
      <div className="dashboard">
        <nav>
          <Navbar className="bg-light">
            <Navbar.Brand>Hoststop</Navbar.Brand>
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end drop-down"
            >
              <Nav>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    View Previous orders
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </nav>
        <div className="container ball-container mt-5">
          <div className="row">
            <div className="col-md-6 d-flex justify-content-end">
              <div
                className="card mb-3"
                style={{ maxWidth: "280px" }}
                onClick={onClickPlace}
              >
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src="https://a0.muscache.com/im/pictures/8b7519ec-2c82-4c09-8233-fd4d2715bbf9.jpg?aki_policy=x_large"
                      className="card-img"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <p className="card-text">Search for place</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="card mb-3"
                style={{ maxWidth: "280px" }}
                onClick={onClickExp}
              >
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src="https://a0.muscache.com/im/pictures/a77ee672-e790-4362-8cc5-52bec1371ece.jpg?aki_policy=x_large"
                      className="card-img"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <p className="card-text">Search experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          {isPlace ? <SearchPlaces /> : <SearchExperience />}
        </div>
      </div>
    </Fragment>
  );
}
