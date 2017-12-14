import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import "./App.css";

import logo from './logo.svg';
import ResourceList from "./ResourceList";


class App extends Component {
  render() {
    //    alert("Hello -- ");
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h2>
              <Link to="/">{this.props.title}</Link>
            </h2>
            <cite>
              Brought to you by {this.props.author} on{" "}
              {this.props.now.toDateString()}
            </cite>
          </div>
          <div className="App-body">
          
              <Route path="/" component={ResourceList} />
             
           
          </div>
      
    
        </div>
      </Router>
    );
  }
}

export default App;