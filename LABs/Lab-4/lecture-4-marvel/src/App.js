import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CharacterList from "./CharcterList";

class App extends Component {

constructor(props){
super(props);

  this.state={
    searchQuery:"Search"

  }
}
  


   componentDidMount(){
   //  alert("Hello");
   }
componentWillRecieveProps(nextProps){
    // alert("Hello");
   }



   changesearchQuery=searchQuery=>{
     this.setState({searchQuery});
   }

   searchforMatches()
   {
     const {searchQuery}=this.state;
     const url="https://gateway.marvel.com:443/v1/public/characters?nameStartsWith={searchQuery}&apikey=0e3532d8bf7d9cb08a6cb9eef90b0dea";
     alert(url);
   }
  render()
   {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.props.title}</h2>
          <cite>
            Brought to you by {this.props.author} on{""}

{this.props.now.toDateString()}
            </cite>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form>
           <input type="text" onchange={e=>{
             e.preventdefault();
             this.changesearchQuery(e.target.value)}
          } 
          value={this.state.searchQuery}
           />
          <input type="text" value={this.state.searchQuery}/>
          <button type="submit">Search!</button>
          <CharacterList/>
          </form>
      </div>
    );
  }
}

export default App;
