import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import CharacterSearchPage from "./CharacterSearch/CharacterSearchPage";
import SingleCharacter from "./SingleCharacter/SingleCharacter";

class Characters extends Component {
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
            <Route path={`${url}/:id`} component={SingleCharacter} />
            <Route path={`${url}/`} component={CharacterSearchPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Characters;
