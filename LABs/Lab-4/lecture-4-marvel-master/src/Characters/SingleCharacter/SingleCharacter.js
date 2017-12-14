import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import CharacterDetail from "./CharacterDetail";
import CharacterComicList from "./CharacterComicList";

class SingleCharacter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: undefined,
      loading: false
    };
  }

  async loadCharacterById(characterId) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`characters/${characterId}`);
      const character = response.data.data.results[0];
      this.setState({ loading: false, character });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const characterId = this.props.match.params.id;
    await this.loadCharacterById(characterId);
  }

  async componentWillReceiveProps(nextProps) {
    const characterId = nextProps.match.params.id;
    const oldCharacterId = this.props.match.params.id;

    if (characterId !== oldCharacterId) {
      await this.loadCharacterById(characterId);
    }
  }

  render() {
    let body = null;

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.character) {
      const url = this.props.match.url;
      body = (
        <div>
          <h2>{this.state.character.name}</h2>
          <ul className="nav nav-tabs">
            <li role="presentation">
              <a href="#">Details</a>
            </li>
            <li role="presentation">
              <a href="#">Comics</a>
            </li>
          </ul>
          <Switch>
            <Route
              path={`${url}/comics`}
              render={() => {
                return (
                  <CharacterComicList
                    comics={this.state.character.comics.items}
                  />
                );
              }}
            />
            <Route
              path={url}
              render={() => {
                return <CharacterDetail character={this.state.character} />;
              }}
            />
          </Switch>
        </div>
      );
    } else {
      body = <div />;
    }

    return <div className="single-character-page">{body}</div>;
  }
}

export default SingleCharacter;
