import React, { useEffect } from "react";
import Login from "./Login";
import Signup from './Signup';

const Landing = () => {
    return (
        <div className="nav">
            <label htmlFor="toggle" className="label">&#9776;</label>
            <input type="checkbox" id="toggle" />
            <div className="menu">
                <Login title="Login as Host" />
                <Signup title="Become a Host" />
                <Login title="User Login" />
                <Signup title="User Signup" />
            </div>
        </div>
    );
};

export default Landing;