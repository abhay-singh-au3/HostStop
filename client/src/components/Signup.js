import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Form from './Form';

const Signup = (props) => {
    const [hostSignup, setHostSignup] = useState(false)
    const openHostSignup = () => { setHostSignup(true) }
    const closeHostSignup = () => { setHostSignup(false) }

    return (
        <React.Fragment>
            <span className="links" onClick={openHostSignup}>{props.title}</span>
            <Modal show={hostSignup} onHide={closeHostSignup} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form type={props.title} />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default Signup;