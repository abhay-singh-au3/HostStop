import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./components/Landing";
import Profile from "./components/Profile";
import Sample from "./components/Sample";
import UserDashboard from "./components/UserDashboard";
import HostDashboard from "./components/HostDashboard";
import withAuth from "./components/withAuth";
import Viewhosted from "./components/Viewhosted";
import EditProfile from "./components/EditProfile";
import SearchResults from "./components/SearchResults";
import SearchResultsExp from "./components/SearchResultsExp";
import Placedetail from "./components/Placedetail";
import Expdetails from "./components/Expdetails";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Route exact path="/" component={Landing} />
        <Route path="/profile" component={withAuth(Profile)} />
        <Route path="/sample" component={withAuth(Sample)} />
        <Route path="/UserDashboard" component={withAuth(UserDashboard)} />
        <Route path="/hostDashboard" component={withAuth(HostDashboard)} />
        <Route path="/viewHosted/:type" component={withAuth(Viewhosted)} />
        <Route path="/editProfile" component={withAuth(EditProfile)} />
        <Route
          path="/searchResults/place/:cityName"
          component={withAuth(SearchResults)}
        />
        <Route
          path="/searchResults/exp/:cityName"
          component={withAuth(SearchResultsExp)}
        />
        <Route path="/clickedResult/place/:id" component={withAuth(Placedetail)} />
        <Route path="/clickedResult/exp/:id" component={withAuth(Expdetails)} />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
