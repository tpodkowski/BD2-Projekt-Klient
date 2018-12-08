import React from 'react';

const Table = ({
  list = [],
  handleDelete = () => {},
  handleEdit = () => {},
}) => list.length > 0 ? (
  <table className="table table-bordered table-striped">
    <thead>
      <tr>
        {Object.keys(list[0]).map((key, index) => (
          <th key={index} style={!index ? { width: '50px' } : {}}>
          { key }
          </th>
        ))}
        <th style={{ width: '150px' }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {list.map(row => (
        <tr key={row.id}>
          {Object.values(row).map((cell, index) => (
            <td key={index}>
              { cell }
            </td> 
          ))}
          <td className="d-flex justify-content-between">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(row.id)}>Delete</button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleEdit(row.id)}>Edit</button>
          </td>
        </tr>
      ))} 
    </tbody>
  </table>
) : (
  <div>Brak rekordów</div>
);

export default Table;
