import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import serialize from 'form-serialize';

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
      isAddModalOpen: false,
    }

    this.addElementFormRef = React.createRef();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.handleElementAdd = this.handleElementAdd.bind(this);
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

  closeAddModal() {
    this.setState({ isAddModalOpen: false });
  }

  openAddModal() {
    this.setState({ isAddModalOpen: true });
  }
  
  handleElementAdd(event) {
    event.preventDefault();
    
    const { activeTable } = this.state;
    const formData = serialize(this.addElementFormRef.current, { hash: true });

    axios.post(`${BASE_URL}${activeTable}`, formData)
      .then(({ data }) => this.setState({ clientList: data}, this.closeAddModal()));
  }

  render() {
    const {
      clientList
    } = this.state;

    return (
      <div className="container">
        <Navbar
          handleAdd={this.openAddModal}
          activeTable={this.state.activeTable}
          handleTableChange={this.handleTableChange}
        />
        <div className="row">
          <Table 
            list={clientList}
            handleDelete={this.handleDelete}
          />
        </div>
        <Modal
          isOpen={this.state.isAddModalOpen}
          contentLabel="Minimal Modal Example"
          className="add-modal"
        >
          <h2>Dodaj element</h2>
          <form ref={this.addElementFormRef} onSubmit={this.handleElementAdd}>
            { clientList[0] && Object.keys(clientList[0]).map((list, index) => index > 0 ? (
              <div className="form-group" key={index}>
                <label htmlFor={`${list}-input`}>{list}</label>
                <input
                  type="text"
                  className="form-control"
                  name={list}
                  id={`${list}-input`}
                />
              </div>
            ) : null)}
            <div className="row">
              <button
                type="button"
                className="btn btn-link"
                onClick={this.closeAddModal}
              >Anuluj</button>
              <button
                type="submit"
                className="btn btn-primary"
              >Dodaj</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default App;
