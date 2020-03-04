import React, { Fragment } from 'react';
import { Carousel } from 'react-bootstrap';

const Placedetail = () => {
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
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
                    <div className="col">
                        ...other data here
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Placedetail;