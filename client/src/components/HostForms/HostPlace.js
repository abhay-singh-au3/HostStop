import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function HostPlace() {
    const [place, setPlace] = useState({
        header: "",
        desc: "",
        city: "",
        state: "",
        zip: "",
        persons: "",
        price: "",
        images: [],
        loaded: 0
    })

    const checkMimeType = e => {
        let files = e.target.files
        let err = []
        const types = ['image/png', 'image/jpeg', 'image/gif']
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err[x] = files[x].type + ' is not a supported format\n';
            }
        };
        for (var z = 0; z < err.length; z++) {
            toast.error(err[z])
            e.target.value = null
        }
        return true;
    }
    const maxSelectFile = (event) => {
        let files = event.target.files
        if (files.length > 5) {
            const msg = 'Only 5 images can be uploaded at a time'
            event.target.value = null
            toast.warn(msg)
            return false;
        }
        return true;
    }
    const checkFileSize = (event) => {
        let files = event.target.files
        let size = 2000000
        let err = [];
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err[x] = files[x].type + 'is too large, please pick a smaller file\n';
            }
        };
        for (var z = 0; z < err.length; z++) {
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    }
    const imageHandler = e => {
        if (maxSelectFile(e) && checkMimeType(e) && checkFileSize(e)) {
            setPlace({ ...place, images: e.target.files, loaded: 0 })
        }
    }
    const handleChange = e => {
        setPlace({ ...place, [e.target.name]: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        for (let x = 0; x < place.images.length; x++) {
            formData.append('file', place.images[x])
        }
        for(let key in place) {
            if(key === "images" || key === "loaded") {
                break;
            }
            formData.append(key, place[key])
        }
        
        axios.post('/uploadPlace', formData, {
            onUploadProgress: ProgressEvent => {
                setPlace({ ...place, loaded: (ProgressEvent.loaded / ProgressEvent.total * 100) })
            },
        })
            .then(res => {
                toast.success('upload success')
            })
            .catch(err => {
                toast.error('upload fail')
            })
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
                            <label htmlFor="desc">Describe your Place</label>
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
                        <div className="form-group">
                            <ToastContainer />
                            <Progress max="100" color="success" value={place.loaded}>{Math.round(place.loaded, 2)}</Progress>
                            <label htmlFor="photos">Choose upto 5 pictures</label>
                            <input
                                type="file"
                                multiple
                                className="form-control"
                                name="photos"
                                onChange={imageHandler}
                            />
                        </div>
                        <button className="btn btn-danger" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}