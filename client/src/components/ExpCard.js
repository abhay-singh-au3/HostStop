import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const ExpCard = props => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(props.url).then(res => setData([...res.data])).catch(err => console.log(err))
    }, [])
    return (
        <Fragment>
            {
                data.length > 0 ? data.map(obj =>
                    <div className="col-sm-12 col-md-4 col-lg-3" key={obj.id}>
                        <div className="card mb-3">
                            <img className="card-img-top" src={obj.images[0]} alt="..." style={{ maxHeight: "350px" }} />
                            <div className="card-body">
                                <p className="card-text"><small className="text-muted">{obj.city}</small></p><span><small className="text-muted">{obj.category}</small></span>
                                <p className="card-text">{obj.header}</p>
                                <p><strong>${obj.price}</strong> / person</p>
                            </div>
                        </div>
                    </div>
                ) : <h1 className="text-center text-danger mt-5">Host some experiences first</h1>

            }
        </Fragment>
    );
}

export default ExpCard;