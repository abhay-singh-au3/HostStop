import React, { Fragment, useEffect, useState } from 'react';
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

import PlacesCard from './PlacesCard';
import ExpCard from './ExpCard';

const Viewhosted = (props) => {
    const [type, setType] = useState(props.match.params.type)
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
    const history = useHistory();
    const handleEditProfile = () => {
        history.push("/editProfile", { type: "host" });
    };
    const clickPlace = () => setType("place")
    const clickExp = () => setType("exp")
    return (
        <Fragment>
            <nav className="mb-5">
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
                                    <Link to="/viewHosted/place" onClick={clickPlace}>View hosted place</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/viewHosted/exp" onClick={clickExp}>View hosted exp</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </nav>
            {
                type === "place" ? <PlacesCard url="/viewHosted/place" /> : <ExpCard url="/viewHosted/exp" />
            }
        </Fragment>
    );
}

export default Viewhosted;