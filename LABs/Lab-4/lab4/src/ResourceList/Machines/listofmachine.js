import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import axiosInstance from "../../utils/axiosInstance";
import $ from 'jquery';
window.React = React;


export class listofmachine extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      next: "",
      prev: "",
      noofmachine: "",
      page: null,
      machineList: []
    };
  }

  async getListofmachine(page) {
    try {
      this.setState({ loading: true });
      const offset = page * 20;
      let url = `machine/?limt=20&offset=${offset}`;
      if( page=== 0){
        let url = `machine/?limt=20`;
      }
      
      const response = await axiosInstance.get(url);
      const resultdata = response.data.results;
      const nextURL = response.data.next;
      const prevURL = response.data.previous;
      const count = response.data.count;

      this.setState({ loading: false, machineList: resultdata, noofmachine: count, page, next: nextURL, prev: prevURL});
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const page = this.props.match.params.page;
    await this.getListofmachine(page);
  }

  async componentWillReceiveProps(nextProps) {
    const pageNumber = nextProps.match.params.page;
    const oldpageNumber = this.props.match.params.page;

    if (pageNumber !== oldpageNumber) {
      await this.getListofmachine(pageNumber);
    }
  }

  render() {
    let body = null;
    let prevpageNo = this.state.page - 1;
    let nextpageNo =  parseInt(this.state.page) + 1;
    if (this.state.loading) {
      body = <div className="row">Loading...</div>;
    } else if (this.state.machineList.length !== 0) {
      const machineData = this.state.machineList.map(machine => {
        return (
          <li>
           Machine - {machine.url.replace('https://pokeapi.co/api/v2/machine/','')}
          </li>
        );
      });
      body = (<div className="row">
      
          {machineData}
       
      </div>);
    } else {
      body = <div className="row">Sorry ! Didn't found machine yet :(</div>;
    }
    return (
      <section>
        <div className="row">
          <div className="col-sm-8">
            <h1>List Of machines</h1>
            <div>
            {body}
            </div>
            <div className="pageNation">
              <Link to={`/machines/page/${prevpageNo}`}><button className="button" disabled={!this.state.prev}>prev</button></Link>
              <Link to={`/machines/page/${nextpageNo}`}><button className="button" disabled={!this.state.next}>Next</button></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

  
export default listofmachine;