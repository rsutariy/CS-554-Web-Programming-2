import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import axiosInstance from "../../utils/axiosInstance";
import $ from 'jquery';
window.React = React;


export class listofberry extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      next: "",
      prev: "",
      noofberry: "",
      page: null,
      berryList: []
    };
  }

  async getListofberry(page) {
    try {
      this.setState({ loading: true });
      const offset = page * 20;
      let url = `berry/?limt=20&offset=${offset}`;
      if( page=== 0){
        let url = `berry/?limt=20`;
      }
      
      const response = await axiosInstance.get(url);
      const resultdata = response.data.results;
      const nextURL = response.data.next;
      const prevURL = response.data.previous;
      const count = response.data.count;

      this.setState({ loading: false, berryList: resultdata, noofberry: count, page, next: nextURL, prev: prevURL});
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const page = this.props.match.params.page;
    await this.getListofberry(page);
  }

  async componentWillReceiveProps(nextProps) {
    const pageNumber = nextProps.match.params.page;
    const oldpageNumber = this.props.match.params.page;

    if (pageNumber !== oldpageNumber) {
      await this.getListofberry(pageNumber);
    }
  }

  render() {
    let body = null;
    let prevpageNo = this.state.page - 1;
    let nextpageNo =  parseInt(this.state.page) + 1;
    if (this.state.loading) {
      body = <div className="row">Loading...</div>;
    } else if (this.state.berryList.length !== 0) {
      const berryData = this.state.berryList.map(berry => {
        return (
          <li>
            {berry.name}
          </li>
        );
      });
      body = (<div className="row">
      
          {berryData}
       
      </div>);
    } else {
      body = <div className="row">Sorry ! Didn't found berry yet :(</div>;
    }
    return (
      <section>
        <div className="row">
          <div className="col-sm-8">
            <h1>List Of berries</h1>
            <div>
            {body}
            </div>
            <div className="pageNation">
              <Link to={`/berries/page/${prevpageNo}`}><button className="button" disabled={!this.state.prev}>prev</button></Link>
              <Link to={`/berries/page/${nextpageNo}`}><button className="button" disabled={!this.state.next}>Next</button></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

  
export default listofberry;