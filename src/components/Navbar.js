import React from 'react';
import TABLES from '../const/Tables';

const Navbar = ({
  activeTable,
  handleAdd,
  handleTableChange,
}) => (
  <div className="row">
    <div className="col">
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
    </div>

    <div className="col">
      <button className="btn btn-primary" onClick={handleAdd}>Dodaj klienta</button>
    </div>
  </div>
);

export default Navbar;