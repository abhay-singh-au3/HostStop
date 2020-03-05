import React, { Fragment, useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import { NavDropdown, Navbar, Nav, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const Placedetail = props => {
    const [booking, setBooking] = useState({ nights: "", persons: "", city: "", zip: "", checkIn: "", checkOut: "" })
    const [modal, setModal] = useState(false)
    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)
    const [data, setData] = useState(null)
    useEffect(() => {
        axios.get(`/place/${props.match.params.id}`).then(res => {
            setData(res.data)
            setBooking({ ...booking, city: res.data.city, zip: res.data.zip })
        })
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
    const handleChange = e => {
        setBooking({ ...booking, [e.target.name]: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault()
        axios.post('/book/places', {
            total: (booking.nights * data.price) * booking.persons,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            city: booking.city,
            zip: booking.zip,
        }).then(res => {
            closeModal();
            toast.success("Booking details sent to email")
        }).catch(err => {
            toast.error("Something's wrong apoligies")
        })
    }
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
                                            data.images.map((url,idx) =>
                                                <Carousel.Item key={idx}>
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
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col details text-center">
                                    <h2 className="h5">{data.header}</h2>
                                    <p className="lead">{data.description}</p>
                                    <p>Can have upto {data.persons} persons</p>
                                    <p className="lead"><strong>${data.price}</strong> / night</p>
                                    <p className="lead">{data.city} - {data.state} - {data.zip}</p>
                                    <button className="btn btn-danger" onClick={openModal}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <Modal show={modal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Fill details for booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="nights" className="col-6 col-form-label">Total nights</label>
                            <div className="col-6">
                                <input
                                    className="form-control"
                                    type="number"
                                    name="nights"
                                    value={booking.nights}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="persons" className="col-6 col-form-label">Total persons</label>
                            <div className="col-6">
                                <input
                                    className="form-control"
                                    type="number"
                                    name="persons"
                                    value={booking.persons}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="checkIn" className="col-6 col-form-label">Check In</label>
                            <div className="col-6">
                                <input
                                    className="form-control"
                                    type="date"
                                    name="checkIn"
                                    value={booking.checkIn}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="checkOut" className="col-6 col-form-label">Check Out</label>
                            <div className="col-6">
                                <input
                                    className="form-control"
                                    type="date"
                                    name="checkOut"
                                    value={booking.checkOut}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button className="btn btn-danger" type="submit">Confirm Booking</button>
                    </form>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </Fragment>
    );
}

export default Placedetail;