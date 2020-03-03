import React, { useState } from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import useForm from "./useForm";
import validate from "./validateSignup";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function EditProfile(props) {
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
  });

  const { errors } = useForm(validate);
  function handleSubmit(e) {
    e.preventDefault()
    const { firstName, lastName, password } = user;
    axios
      .put("/editProfile", { user: user, type: props.location.state.type })
      .then(response => {
        console.log(response.data);
        props.location.state.type === "host" ? history.push("/hostDashboard") : history.push("/userDashboard")
      });
  }
  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleEditProfile = () => {
    history.push("/editProfile");
  };
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
    <div className="">
      <Navbar className="bg-light">
        <Navbar.Brand>Hoststop</Navbar.Brand>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end drop-down"
        >
          <Nav>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="" onClick={handleEditProfile}>
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
      <div className="container">
        <h1>Edit Your Profile</h1>
        <React.Fragment>
          <form noValidate onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="col-12">
                <label htmlFor="firstName">Firstname</label>
                <input
                  type="text"
                  className="form-control w-25"
                  name="firstName"
                  onChange={handleChange}
                  value={user.firstName}
                />
                {errors.firstName && (
                  <p className="error lead">{errors.firstName}</p>
                )}
              </div>
              <div className="col-12 ">
                <label htmlFor="lastName">Lastname</label>
                <input
                  type="text"
                  className="form-control w-25"
                  name="lastName"
                  onChange={handleChange}
                  value={user.lastName}
                />
                {errors.lastName && (
                  <p className="error lead">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="form-group w-25">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                value={user.password}
              />
              {errors.password && (
                <p className="error lead">{errors.password}</p>
              )}
            </div>
            <div className="form-group w-25">
              <label htmlFor="confirmPass">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPass"
                onChange={handleChange}
                value={user.confirmPass}
              />
              {errors.confirmPass && (
                <p className="error lead">{errors.confirmPass}</p>
              )}
            </div>
            <button className="btn btn-danger" type="submit">
              Submit
            </button>
          </form>
        </React.Fragment>
      </div>
    </div>
  );
}
