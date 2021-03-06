import React, { Fragment, useState } from "react";
import "../styles/hostdashboard.css";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import HostExp from "./HostForms/HostExp";
import HostPlace from "./HostForms/HostPlace";

export default function HostDashboard() {
    const [isPlace, setIsPlace] = useState(true);
    const history = useHistory();
    const onClickPlace = () => setIsPlace(true);
    const onClickExp = () => setIsPlace(false);
    const onLogout = () => {
        fetch("logout", {
            method: "get",
            credentials: "include"
        })
            .then(function (response) {
                if (response.redirected) {
                    return window.location.replace(response.url);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    const handleEditProfile = () => {
        history.push("/editProfile", { type: "host" });
    };
    return (
        <Fragment>
            <div className="dashboard">
                <nav>
                    <Navbar className="bg-light">
                        <Navbar.Brand><Link to="/hostDashboard">Hoststop</Link></Navbar.Brand>
                        <Navbar.Collapse
                            id="basic-navbar-nav"
                            className="justify-content-end drop-down"
                        >
                            <Nav>
                                <NavDropdown title="Account">
                                    <NavDropdown.Item onClick={handleEditProfile}>
                                        Edit Profile
                  </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link to="/viewHosted/place">View hosted place</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link to="/viewHosted/exp">View hosted exp</Link>
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
                                            <p className="card-text">Host a place</p>
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
                                            <p className="card-text">Host an experience</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">{isPlace ? <HostPlace /> : <HostExp />}</div>
            </div>
        </Fragment>
    );
}
