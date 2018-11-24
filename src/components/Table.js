import React from 'react';

const Table = ({
  list = [],
  handleDelete = () => {},
}) => list.length > 0 && (
  <table className="table table-striped">
    <thead>
      <tr>
        {Object.keys(list[0]).map((key, index) => (
          <th key={index}>
          { key }
          </th>
        ))}
        <th>Actions</th>
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
          <td>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(row.id)}>X</button>
          </td>
        </tr>
      ))} 
    </tbody>
  </table>
);

export default Table;
