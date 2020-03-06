import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";

export default function SearchResultsExp(props) {
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`/searchExp/${props.match.params.cityName}`).then(response => {
            setData([...response.data]);
        });
    }, []);
    const handleOnClick = id => {
        history.push(`/clickedResult/exp/${id}`);
    };
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
        history.push("/editProfile", { type: "user" });
    };
    return (
        <Fragment>
            <nav>
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
            </nav>
            <div className="row">
                {data.length < 1 ? (
                    <h1 className="text-center mt-5 text-danger">Host some places first</h1>
                ) : (
                        data.map(obj => (
                            <div className="col-sm-12 col-md-4 col-lg-3" key={obj.id}>
                                <div className="card mb-3">
                                    <img
                                        className="card-img-top"
                                        src={obj.images[0]}
                                        alt="..."
                                        style={{ maxHeight: "350px" }}
                                    />
                                    <div className="card-body">
                                        <p className="card-text">
                                            <small className="text-muted">{obj.city}</small>
                                        </p>
                                        <p className="card-text">{obj.header}</p>
                                        <p>
                                            <strong>${obj.price}</strong> / night
                                        </p>
                                        <button
                                            onClick={() => handleOnClick(obj.id)}
                                            className="btn btn-danger"
                                        >
                                            Book place
                </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
            </div>
        </Fragment>
    );
}
