import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import home from "./home";
import Berries from "./Berries";
import Machines from "./Machines";
import Pokemon from "./Pokemon";

class ResourceList extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;

    return (
      <div className="row">
        <div className="col-sm-3">
          <div className="list-group">
            <Link className="list-group-item" to={`${url}`}>
              Back to search
            </Link>
          </div>
        </div>
        <div className="col-sm-8 col-sm-offset-1">
        <Switch>
      <Route exact path="/" component={home}/>
      <Route path="/berries" component={Berries}/>
      <Route path="/machines" component={Machines}/>
      <Route path="/pokemon" component={Pokemon}/>
  
   </Switch>
        </div>
      </div>
    );
  }
}

export default ResourceList;
