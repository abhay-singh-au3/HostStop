import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const PlacesCard = props => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(props.url).then(res => setData([...res.data])).catch(err => console.log(err))
    }, [])
    return (
        <Fragment>
            {
                data.length < 1 ?
                    <h1 className="text-center mt-5 text-danger">Host some places first</h1>
                    :
                    data.map(obj =>
                        <div className="col-sm-12 col-md-4 col-lg-3" key={obj.id}>
                            <div className="card mb-3">
                                <img className="card-img-top" src={obj.images[0]} alt="..." style={{ maxHeight: "350px" }} />
                                <div className="card-body">
                                    <p className="card-text"><small className="text-muted">{obj.city}</small></p>
                                    <p className="card-text">{obj.header}</p>
                                    <p><strong>${obj.price}</strong> / night</p>
                                </div>
                            </div>
                        </div>
                    )
            }
        </Fragment>
    );
}

export default PlacesCard;