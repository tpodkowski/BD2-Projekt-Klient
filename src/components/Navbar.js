import React from 'react';

const Navbar = ({
  activeTable,
  handleAdd,
  handleTableChange,
}) => (
  <div className="row">
    <div className="form-check form-check-inline">
      <label className="form-check-label" for="active-table">Tabela:</label>
      <select
        id="active-table"
        className="form-control form-check-input"
        onChange={handleTableChange}
        value={activeTable}
      >
        <option value="kategorie">Kategorie</option>
        <option value="klienci">Klienci</option>
      </select>
    </div>

    <div className="col">
      <button className="btn btn-primary" onClick={handleAdd}>Dodaj klienta</button>
    </div>
  </div>
);

export default Navbar;