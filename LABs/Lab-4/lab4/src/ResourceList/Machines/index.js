import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import machine from "./machine";
import listofmachine from "./listofmachine";

class Machine extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;

    return (
      <div className="row">
        <div className="col-sm-8 col-sm-offset-1">
          <Switch>
            <Route path={`${url}/page/:page`} component={listofmachine} />
            <Route path={`${url}/:id`} component={machine} />
            <Redirect from="/" to={`${url}/page/0`} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Machine;
