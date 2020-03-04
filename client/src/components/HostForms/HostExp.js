import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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
        images: [],
        loaded: 0
    })
    const handleChange = e => setExp({ ...exp, [e.target.name]: e.target.value })
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
            setExp({ ...exp, images: e.target.files, loaded: 0 })
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        for (let x = 0; x < exp.images.length; x++) {
            formData.append('file', exp.images[x])
        }
        for(let key in exp) {
            if(key === "images" || key === "loaded") {
                break;
            }
            formData.append(key, exp[key])
        }
        
        axios.post('/uploadExp', formData, {
            onUploadProgress: ProgressEvent => {
                setExp({ ...exp, loaded: (ProgressEvent.loaded / ProgressEvent.total * 100) })
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
            <h1 className="h4 text-center">Host Experience</h1>
            <div className="row">
                <div className="col-sm-12 col-md-6 offset-md-3">
                    <hr className="mb-5" />
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
                                    <input type="text" className="form-control" expholder="City" name="city" value={exp.city} onChange={handleChange} required />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" expholder="State" name="state" value={exp.state} onChange={handleChange} required />
                                </div>
                                <div className="col">
                                    <input type="number" className="form-control" expholder="Zip" name="zip" value={exp.zip} onChange={handleChange} required />
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
                        <div className="form-group">
                            <ToastContainer />
                            <Progress max="100" color="success" value={exp.loaded}>{Math.round(exp.loaded, 2)}</Progress>
                            <label htmlFor="photos">Choose upto 5 pictures</label>
                            <input
                                type="file"
                                multiple
                                className="form-control"
                                name="photos"
                                onChange={imageHandler}
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