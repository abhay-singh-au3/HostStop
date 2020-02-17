import React, { useState } from 'react';
import './style.css';

export default function HostPlace() {
    const [place, setPlace] = useState({
        header: "",
        desc: "",
        city: "",
        state: "",
        zip: "",
        persons: "",
        price: "",
        images: []
    })
    const handleChange = e => setPlace({ ...place, [e.target.name]: e.target.value })
    const handleSubmit = e => {
        e.preventDefault()
        console.log(place)
    }
    return (
        <div className="contianer mt-5">
            <div className="row">
                <div className="col-sm-12 col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit} className="host-form">
                        <div className="form-group">
                            <label htmlFor="header">Title of your place</label>
                            <input
                                type="text"
                                name="header"
                                className="form-control"
                                onChange={handleChange}
                                value={place.header}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc">Describe of your Place</label>
                            <textarea
                                type="textarea"
                                name="desc"
                                className="form-control"
                                rows="3"
                                onChange={handleChange}
                                value={place.desc}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <div className="form-row">
                                <div className="col-4">
                                    <input type="text" className="form-control" placeholder="City" name="city" value={place.city} onChange={handleChange} required />
                                </div>
                                <div className="col-5">
                                    <input type="text" className="form-control" placeholder="State" name="state" value={place.state} onChange={handleChange} required />
                                </div>
                                <div className="col-3">
                                    <input type="number" className="form-control" placeholder="Zip" name="zip" value={place.zip} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Per person charge in <strong>₹</strong></label>
                            <input
                                type="number"
                                name="price"
                                className="form-control"
                                value={place.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="persons">Number of persons can accomadate</label>
                            <input
                            type="number"
                            name="persons"
                            className="form-control"
                            value={place.persons}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <button className="btn btn-danger" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}