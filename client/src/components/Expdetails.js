import React, { Fragment, useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";


const Expdetails = props => {
    const [data, setData] = useState(null)
    useEffect(() => {
        axios.get(`/exp/${props.match.params.id}`).then(res => setData(res.data))
    }, [])
    const history = useHistory();
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
            {
                data === null ? <p>Loadding..</p>
                    :
                    <div>
                        <div className="container-fluid mt-5">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <Carousel>
                                        {
                                            data.images.map(url =>
                                                <Carousel.Item>
                                                    <img
                                                        className="d-block w-100"
                                                        alt="..."
                                                        src={url}
                                                    />
                                                </Carousel.Item>
                                            )
                                        }
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col text-center details">
                                <h2 className="h5">{data.header}</h2>
                                    <p className="lead">{data.description}</p>
                                    <p>{data.category} <small className="text-muted">category</small></p>
                                    <p className="lead"><strong>${data.price}</strong> / night</p>
                                    <p className="lead">{data.city} - {data.state} - {data.zip}</p>
                                    <button className="btn btn-danger">Book Now</button>
                    </div>
                            </div>
                        </div>
                    </div>
            }
        </Fragment>
    );
}

export default Expdetails;