import React, { useState } from 'react';
import './style.css';

export default function HostExp() {
    const [exp, setExp] = useState({
        header: "",
        desc: "",
        category: "",
        city: "",
        state: "",
        zip: "",
        date: "",
        price: "",
        images: []
    })
    const handleChange = e => setExp({ ...exp, [e.target.name]: e.target.value })
    const handleSubmit = e => {
        e.preventDefault()
        console.log(exp)
    }
    return (
        <div className="contianer mt-5">
            <div className="row">
                <div className="col-sm-12 col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit} className="host-form">
                        <div className="form-group">
                            <label htmlFor="header">Title of your experience</label>
                            <input
                                type="text"
                                name="header"
                                className="form-control"
                                onChange={handleChange}
                                value={exp.header}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc">Descripe of your experience</label>
                            <textarea
                                type="textarea"
                                name="desc"
                                className="form-control"
                                rows="3"
                                onChange={handleChange}
                                value={exp.desc}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select
                                className="form-control"
                                name="category"
                                onChange={handleChange}
                                required
                            >
                                <option value="sports">Sports</option>
                                <option value="cooking">Cooking</option>
                                <option value="edu">Educational</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <div className="form-row">
                                <div className="col-7">
                                    <input type="text" className="form-control" placeholder="City" name="city" value={exp.city} onChange={handleChange} required />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="State" name="state" value={exp.state} onChange={handleChange} required />
                                </div>
                                <div className="col">
                                    <input type="number" className="form-control" placeholder="Zip" name="zip" value={exp.zip} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date of the event</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={exp.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Per person charge in <strong>₹</strong></label>
                            <input
                                type="number"
                                name="price"
                                className="form-control"
                                value={exp.price}
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