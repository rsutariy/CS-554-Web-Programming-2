import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import axiosInstance from "../../utils/axiosInstance";
import $ from 'jquery';
window.React = React;


export class listofpokemon extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      next: "",
      prev: "",
      noofpokemon: "",
      page: null,
      pokemonList: []
    };
  }

  async getListofPokemon(page) {
    try {
      this.setState({ loading: true });
      const offset = page * 20;
      let url = `pokemon/?limt=20&offset=${offset}`;
      if( page=== 0){
        let url = `pokemon/?limt=20`;
      }
      
      const response = await axiosInstance.get(url);
      const resultdata = response.data.results;
      const nextURL = response.data.next;
      const prevURL = response.data.previous;
      const count = response.data.count;

      this.setState({ loading: false, pokemonList: resultdata, noofpokemon: count, page, next: nextURL, prev: prevURL});
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const page = this.props.match.params.page;
    await this.getListofPokemon(page);
  }

  async componentWillReceiveProps(nextProps) {
    const pageNumber = nextProps.match.params.page;
    const oldpageNumber = this.props.match.params.page;

    if (pageNumber !== oldpageNumber) {
      await this.getListofPokemon(pageNumber);
    }
  }

  render() {
    let body = null;
    let prevpageNo = this.state.page - 1;
    let nextpageNo =  parseInt(this.state.page) + 1;
    if (this.state.loading) {
      body = <div className="row">Loading...</div>;
    } else if (this.state.pokemonList.length !== 0) {
      const pokemonData = this.state.pokemonList.map(pokemon => {
        return (
          <li>
            {pokemon.name}
          </li>
        );
      });
      body = (<div className="row">
      
          {pokemonData}
       
      </div>);
    } else {
      body = <div className="row">Sorry ! Didn't found Pokemon yet :(</div>;
    }
    return (
      <section>
        <div className="row">
          <div className="col-sm-8">
            <h1>List Of Pokemons</h1>
            <div>
            {body}
            </div>
            <div className="pageNation">
              <Link to={`/pokemon/page/${prevpageNo}`}><button className="button" disabled={!this.state.prev}>prev</button></Link>
              <Link to={`/pokemon/page/${nextpageNo}`}><button className="button" disabled={!this.state.next}>Next</button></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

  
export default listofpokemon;