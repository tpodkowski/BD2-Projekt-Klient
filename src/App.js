import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Table from './components/Table';
import TABLES from './const/Tables';
import './App.css';

const BASE_URL = 'http://localhost:3000/api/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientList: [],
      activeTable: TABLES.CATEGORIES,
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentDidMount() {
    this.fetchClients();
  }
  
  fetchClients() {
    const { activeTable } = this.state;
    axios.get(`${BASE_URL}${activeTable}`)
      .then(({ data }) => this.setState({ clientList: data }))
  }

  handleDelete(clientId) {
    const { activeTable } = this.state;
    axios.delete(`${BASE_URL}${activeTable}/${clientId}`)
      .then(({ data }) => this.setState({ clientList: data}));
  }

  handleTableChange({ target }) {
    const activeTable = target.value;
    this.setState({ activeTable }, this.fetchClients);
  }

  render() {
    const {
      clientList,
    } = this.state;

    return (
      <div className="container">
        <Navbar
          handleAdd={() => {}}
          activeTable={this.state.activeTable}
          handleTableChange={this.handleTableChange}
        />
        <div className="row">
          <Table 
            list={this.state.clientList}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default App;
