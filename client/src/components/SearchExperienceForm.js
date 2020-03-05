import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "../styles/hostform.css";
import { useHistory } from "react-router-dom";

function SearchExperienceForm() {
  const [cities, setCities] = useState([]);
  const [id, setId] = useState(0);
  const [searchDetail, setSearchDetail] = useState({ city: "", state: "" });
  const history = useHistory();
  const [result, setResult] = useState([]);
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
  const handleOnChange = e => {
    setSearchDetail({ ...searchDetail, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = e => {
    e.preventDefault();
    history.push(`/searchResults/exp/${searchDetail.city}`);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-md-6 offset-md-3">
          <h4 className="h4  heading">
            One-of-a-kind activities hosted by locals.
          </h4>
          <Form className="host-form" onSubmit={handleOnSubmit}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Where</Form.Label>
              <Form.Control style={{ marginBottom: "3px" }} as="select" name="city" onChange={handleOnChange}>
                {cities.length
                  ? cities.map((city, index) => {
                      return <option key={index}>{city.City}</option>;
                    })
                  : null}
              </Form.Control>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control style={{ marginBottom: "3px" }} as="select">
                  <option>Adventure</option>
                  <option>Cooking</option>
                  <option>Animals</option>
                </Form.Control>
              </Form.Group>
              <Form.Label>Total Explorers</Form.Label>
              <Form.Control style={{ marginBottom: "3px" }} type="number" />
              <Form.Group>
                <Button variant="danger" type="submit">Search</Button>
              </Form.Group>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default SearchExperienceForm;
