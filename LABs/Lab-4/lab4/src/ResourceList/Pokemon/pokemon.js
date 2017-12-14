import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";


class pokemon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: undefined,
      loading: false
    };
  }
  async loadPokemonById(pokemonId) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`pokemon/${pokemonId}`);
      const pokemon = response.data;
      this.setState({ loading: false, pokemon });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const pokemonId = this.props.match.params.id;
    
    await this.loadPokemonById(pokemonId);
  }

  async componentWillReceiveProps(nextProps) {
    const pokemonId = nextProps.match.params.id;
    const oldpokemonId = this.props.match.params.id;

    if (pokemonId !== oldpokemonId) {
      await this.loadPokemonById(pokemonId);
    }
  }

  render() {
    let body = null;

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.pokemon) {
      const url = this.props.match.url;
      body = (
        <div>
          <h1><u>Details </u> </h1>
          <h2>Name : {this.state.pokemon.name}</h2>
        </div>
      );
    } else {
      body = <div />;
    }

    return <div className="single-character-page">{body}</div>;
  }
}

export default pokemon;
