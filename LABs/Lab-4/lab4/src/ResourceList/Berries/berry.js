import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import NotFound from "../NotFound";

class berry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      berry: undefined,
      loading: false
    };
  }
  async loadBerryById(berryId) {
    try {
      this.setState({ loading: true });

      const response = await axiosInstance.get(`berry/${berryId}`);

      const berry = response.data;
      this.setState({ loading: false, berry });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const berryId = this.props.match.params.id;
    await this.loadBerryById(berryId);
  }

  async componentWillReceiveProps(nextProps) {
    const berryId = nextProps.match.params.id;
    const oldberryId = this.props.match.params.id;

    if (berryId !== oldberryId) {
      await this.loadBerryById(berryId);
    }
  }

  render() {
    let body = null;

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.berry) {
      const url = this.props.match.url;
      body = (
        <div>
          <h1>
            <u>Details </u>{" "}
          </h1>
          <h2>Name : {this.state.berry.name}</h2>
          <h2>Smoothness : {this.state.berry.smoothness}</h2>
          <h2>Size : {this.state.berry.size}</h2>
        </div>
      );
    } else {
      body = <div />;
    }

    return <div className="single-character-page">{body}</div>;
  }
}

export default berry;
