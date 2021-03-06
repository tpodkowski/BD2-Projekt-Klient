import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import serialize from 'form-serialize';

import Navbar from './components/Navbar';
import Table from './components/Table';
import EditModal from './components/EditModal';
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
      isEditModalOpen: false,
      editedId: null,
    }

    this.addElementFormRef = React.createRef();
    this.editElementFormRef = React.createRef();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.closeModals = this.closeModals.bind(this);
    this.handleElementAdd = this.handleElementAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleElementEdit = this.handleElementEdit.bind(this);
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

  handleEdit(id) {
    this.setState({
      editedId: id,
      isEditModalOpen: true,
    });
  }

  handleTableChange({ target }) {
    const activeTable = target.value;
    this.setState({ activeTable }, this.fetchClients);
  }

  closeModals() {
    this.setState({
      isAddModalOpen: false,
      isEditModalOpen: false,
    });
  }

  openAddModal() {
    this.setState({ isAddModalOpen: true });
  }
  
  handleElementAdd(event) {
    event.preventDefault();
    
    const { activeTable } = this.state;
    const formData = serialize(this.addElementFormRef.current, { hash: true });

    axios.post(`${BASE_URL}${activeTable}`, formData)
      .then(({ data }) => this.setState({ clientList: data}, this.closeModals()));
  }

  handleElementEdit(event) {
    event.preventDefault();

    const { activeTable, editedId } = this.state;
    const formData = serialize(this.editElementFormRef.current, { hash: true });

    axios.patch(`${BASE_URL}${activeTable}/${editedId}`, formData)
      .then(({ data }) => this.setState({
        clientList: data,
        editedId: null,
      }, this.closeModals()));
  }


  render() {
    const {
      clientList
    } = this.state;

    return (
      <Fragment>
        <Navbar
          handleAdd={this.openAddModal}
          activeTable={this.state.activeTable}
          handleTableChange={this.handleTableChange}
        />
        <div style={{ paddingTop: '54px' }}>
          <Table 
            list={clientList}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
          <Modal
            isOpen={this.state.isAddModalOpen}
            contentLabel="Minimal Modal Example"
            className="add-modal shadow"
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
                  onClick={this.closeModals}
                >Anuluj</button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >Dodaj</button>
              </div>
            </form>
          </Modal>
          <EditModal
            clientList={clientList.find(({ id }) => id === this.state.editedId)}
            isOpen={this.state.isEditModalOpen}
            onClose={this.closeModals}
            onSubmit={this.handleElementEdit}
            reference={this.editElementFormRef}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
