import React, { Component } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";

class home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="character-search-page">
        <p className="App-intro">
This is a consumption-only API - only the HTTP GET method is available on resources.
No authentication is required to access this API. All resources are fully open and available.
There is, however, a daily rate limit of 300 requests per resource per IP address. So a single IP address can call the bulbasaur resource 300 times a day. Not 300 requests across the entire dataset! This is to stop our database from falling over under heavy load.
       
       You can find out resourse list as below.
       
        </p>
        <hr />
        <h3>
            <Link to={`/pokemon/`}>Pokemon List</Link>
        </h3>
        <h3>
            <Link to={`/berries/`}>Berries List</Link>
        </h3>
        <h3>
            <Link to={`/machines/`}>Machine List</Link>
        </h3>
      </div>
    );
  }
}
export default home;