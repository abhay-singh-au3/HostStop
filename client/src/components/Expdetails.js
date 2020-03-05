import React, { Fragment, useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import { NavDropdown, Navbar, Nav, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const Expdetails = props => {
    const [modal, setModal] = useState(false)
    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)
    const [persons, setPersons] = useState("")
    const [data, setData] = useState(null)
    useEffect(() => {
        axios.get(`/exp/${props.match.params.id}`).then(res => {
            setData(res.data)
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
        setPersons(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault()
        axios.post("/book/exp", {
            total: persons * data.price,
            city: data.city,
            zip: data.zip
        }).then(res => {
            closeModal();
            toast.success("Details sent to your email")
        }).catch(err => {
            toast.error("Something's wrong.. Apoligies")
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
                                            data.images.map((url, idx) =>
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
                        <div className="container">
                            <div className="row">
                                <div className="col text-center details">
                                    <h2 className="h5">{data.header}</h2>
                                    <p className="lead">{data.description}</p>
                                    <p>{data.category} <small className="text-muted">category</small></p>
                                    <p className="lead"><strong>${data.price}</strong></p>
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
                            <label htmlFor="persons" className="col-6 col-form-label">Total persons</label>
                            <div className="col-6">
                                <input
                                    className="form-control"
                                    type="number"
                                    name="persons"
                                    value={persons}
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

export default Expdetails;