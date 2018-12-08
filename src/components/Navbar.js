import React from 'react';
import TABLES from '../const/Tables';

const Navbar = ({
  activeTable,
  handleAdd,
  handleTableChange,
}) => (
  <nav className="navbar navbar-dark bg-primary shadow">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="active-table">Tabela:</label>
          <select
            id="active-table"
            className="form-control form-check-input"
            onChange={handleTableChange}
            value={activeTable}
          >
            {Object.values(TABLES).map((category, index) =>(
              <option
                key={index}
                value={category}
              >{category}</option>
            ))}
          </select>
        </div>
      </li>

    </ul>
    <div>
      <button className="btn btn-outline-light" onClick={handleAdd}>Dodaj element</button>
    </div>
  </nav>
);

export default Navbar;