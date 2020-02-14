import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import Sample from "./components/Sample";
import UserDashboard from "./components/UserDashboard";
import HostDashboard from "./components/HostDashboard";
const App = () => {
  return (
    <Router>
      <div className="app">
        <Route exact path="/" component={Landing} />
        <Route path="/profile" component={Profile} />
        <Route path="/sample" component={Sample} />
        <Route path="/UserDashboard" component={UserDashboard} />
        <Route path="/hostDashboard" component={HostDashboard} />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
