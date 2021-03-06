import React, { Fragment } from "react";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Login from "./Login";
import Signup from "./Signup";

const options = {
    timeout: 5000,
    position: positions.MIDDLE_RIGHT
};

const Landing = () => {
    return (
        <Provider template={AlertTemplate} {...options}>
            <Fragment>
                <div className="landing">
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
                </div>
            </Fragment>
        </Provider>
    );
};

export default Landing;
