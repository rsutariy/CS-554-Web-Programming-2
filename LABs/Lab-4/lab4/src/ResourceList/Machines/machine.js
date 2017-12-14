import React, { Component } from "react";
import { BrowserRouter as Router, Route,Redirect, Link, Switch } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";


class machine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machine: undefined,
      loading: false
    };
  }
  async loadMachineById(machineId) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`machine/${machineId}`);
      const machine = response.data;
      this.setState({ loading: false, machine });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const machineId = this.props.match.params.id;
    if(!machineId)
    {
      
    }
    await this.loadMachineById(machineId);
  }

  async componentWillReceiveProps(nextProps) {
    const machineId = nextProps.match.params.id;
    const oldmachineId = this.props.match.params.id;

    if (machineId !== oldmachineId) {
      await this.loadMachineById(machineId);
    }
  }

  render() {
    let body = null;

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.machine) {
      const url = this.props.match.url;
      body = (
        <div>
          <h1><u>Details </u> </h1>
          <h2>Name : {this.state.machine.item.name}</h2>
          
        </div>
      );
    } else {
      body = <div />;
    }

    return <div className="single-character-page">{body}</div>;
  }
}

export default machine;
