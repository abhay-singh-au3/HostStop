import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import Sample from "./components/Sample";
const App = () => {
  return (
    <Router>
      <div className="app">
        <Route exact path="/" component={Landing} />
        <Route path="/profile" component={Profile} />
        <Route path="/sample" component={Sample} />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
