import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import berry from './berry';
import listofberries from './listofberries';

class Berries extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;

    return (
      <div className="row">
        <div className="col-sm-8 col-sm-offset-1">
          <Switch>
            <Route path={`${url}/page/:page`} component={listofberries} />
            <Route path={`${url}/:id`} component={berry} />
            <Redirect from="/" to={`${url}/page/0`} />
            </Switch>
        </div>
      </div>
    );
  }
}


export default Berries;