import React, { Fragment, useState, useEffect } from 'react';
import "../styles/hostdashboard.css";
import jwt_decode from 'jwt-decode';

export default function HostDashboard() {
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", error: {} })
    useEffect(() => {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        setUser({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email
        })
    }, [])

    return (
        <Fragment>
            <div className="dashboard">
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand">
                        Hoststop
                    </span>
                    <span className="navbar-brand pull-right" title="Edit your profile">Hey {user.firstName}</span>
                </nav>
            </div>
            <div className="ball-container">
                <div className="place">
                    <p>Host a place</p>
                    <img src="https://a0.muscache.com/im/pictures/8b7519ec-2c82-4c09-8233-fd4d2715bbf9.jpg?aki_policy=large"
                    />
                </div>
                <div className="exp">
                    <p>Host an experience</p>
                    <img src="https://a0.muscache.com/im/pictures/38f2bfd6-1f4d-46d7-babf-61657deef302.jpg?aki_policy=large" />
                </div>
            </div>
        </Fragment>
    )
}