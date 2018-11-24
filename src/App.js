import React, { Component } from 'react';
import Axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientList: [],
    }
  }
  componentDidMount() {
    this.fetchClients();
  }
  
  fetchClients() {
    Axios.get('http://localhost:3000/api/klienci')
      .then(({ data }) => this.setState({ clientList: data }))
  }

  render() {
    const {
      clientList,
    } = this.state;

    return clientList.length > 0 && (
      <div className="container">
        <div className="row">
          <button className="btn btn-primary">Dodaj klienta</button>
          <button className="btn btn-danger">Usuń klienta</button>
        </div>
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                {Object.keys(clientList[0]).map((key, index) => (
                  <th key={index}>
                    { key }
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientList.map(client => (
                <tr key={client.id}>
                  {Object.values(client).map((cell, index) => (
                    <td key={index}>
                      { cell }
                    </td> 
                  ))}
                </tr>
              ))} 
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
