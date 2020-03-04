import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SearchResults(props) {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get(`/searchPlaces/${props.match.params.cityName}`).then(response => {
      setData([...response.data]);
    });
  }, []);
  const handleOnClick = id => {
    history.push(`/clickedResult/${id}`);
  };
  return (
    <div className="row">
      {data.length < 1 ? (
        <h1 className="text-center mt-5 text-danger">Host some places first</h1>
      ) : (
        data.map(obj => (
          <div className="col-sm-12 col-md-4 col-lg-3" key={obj.id}>
            <div className="card mb-3">
              <img
                className="card-img-top"
                src={obj.images[0]}
                alt="..."
                style={{ maxHeight: "350px" }}
              />
              <div className="card-body">
                <p className="card-text">
                  <small className="text-muted">{obj.city}</small>
                </p>
                <p className="card-text">{obj.header}</p>
                <p>
                  <strong>${obj.price}</strong> / night
                </p>
                <button
                  onClick={() => handleOnClick(obj.id)}
                  className="danger"
                >
                  Book place
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
