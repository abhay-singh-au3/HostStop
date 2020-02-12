import React, { Fragment } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Landing = () => {
  return (
    <Fragment>
      <div className="nav">
        <label htmlFor="toggle" className="label">
          &#9776;
        </label>
        <input type="checkbox" id="toggle" />
        <div className="menu">
          <Login title="Login as Host" />
          <Signup title="Become a Host" />
          <Login title="User Login" />
          <Signup title="User Signup" />
        </div>
      </div>
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">WELCOME</h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
