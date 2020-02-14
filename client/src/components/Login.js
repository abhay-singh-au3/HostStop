import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { userLogin, hostLogin } from "./UserLoginSignupFunctions";

const Login = props => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [modal, setmodal] = useState(false);
  const history = useHistory();
  const open = () => {
    setmodal(true);
  };
  const close = () => {
    setmodal(false);
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = () => {
    const { email, password } = user;
    const newUser = { email, password };
    if (props.title === "User Login") {
      userLogin(newUser).then(res => {
        if (res) {
          // After success login do something here

          console.log("User Loggedin with token: ", res);
        } else {
          // After fail login do something here
          console.log("Invalid Credintials");
        }
      });
    } else {
      hostLogin(newUser).then(res => {
        if (res) {
          // after success login do something here
          history.push("/hostDashboard");
          console.log("Host Logged with token", res);
        } else {
          // After fail login do something here
          console.log("Invalid Credintials");
        }
      });
    }
  };

  return (
    <React.Fragment>
      <span className="links" onClick={open}>
        {props.title}
      </span>
      <Modal show={modal} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                placeholder="Enter email"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                placeholder="Enter password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <button className="btn btn-danger" onClick={handleSubmit}>
            Login
          </button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Login;
