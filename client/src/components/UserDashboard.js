import React, { useState, useEffect } from "react";
import "./UserDashBoard.css";
import Form from "react-bootstrap/Form";
import Bar from "./Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";

function UserDashboard() {
  const [cities, setCities] = useState([]);
  const [id, setId] = useState(0);

  const fetchCities = async () => {
    const response = await axios.get(
      "https://indian-cities-api-nocbegfhqg.now.sh/cities"
    );
    setCities(response.data);
    setId(1);
    console.log(cities);
  };
  useEffect(() => {
    fetchCities();
  }, [id]);

  return (
    <div>
      <Bar />
      <div
        className="Search container"
        style={{
          width: "30%",
          backgroundColor: "white",
          height: "400px",
          color: "#484848"
        }}
      >
        <h4 className="h4  heading">
          Book unique places to stay and unique places to go.
        </h4>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Where</Form.Label>
            <Form.Control style={{ marginBottom: "5px" }} as="select">
              {cities.length
                ? cities.map((city, index) => {
                    return <option key={index}>{city.City}</option>;
                  })
                : null}
            </Form.Control>
            <Form.Group>
              <Form.Label>Check-IN</Form.Label>
              <Form.Control style={{ marginBottom: "5px" }} type="date" />

              <Form.Label>Check-OUT</Form.Label>
              <Form.Control style={{ marginBottom: "5px" }} type="date" />
            </Form.Group>
            <Form.Label>Total Guests</Form.Label>
            <Form.Control style={{ marginBottom: "5px" }} type="number" />
            <Form.Group>
              <Button className="d-flex justify-content-right" variant="danger">
                Search
              </Button>
            </Form.Group>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
export default UserDashboard;
