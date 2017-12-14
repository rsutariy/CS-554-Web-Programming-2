import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import "./App.css";
import Characters from "./Characters";

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
            <Switch>
              <Route path="/character" component={Characters} />
              <Redirect from="/" to="/character" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
