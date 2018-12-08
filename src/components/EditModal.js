import React from 'react';
import Modal from 'react-modal';


const EditModal = ({
  reference,
  clientList,
  isOpen,
  onSubmit,
  onClose,
}) => console.log({ clientList }) || (
  <Modal
    isOpen={isOpen}
    contentLabel="Minimal Modal Example"
    className="add-modal shadow"
  >
    <h2>Edytuj element</h2>
    <form ref={reference} onSubmit={onSubmit}>
      { clientList && Object.entries(clientList).map(([list, value], index) => index > 0 ? (
        <div className="form-group" key={index}>
          <label htmlFor={`${list}-input`}>{list}</label>
          <input
            type="text"
            className="form-control"
            name={list}
            id={`${list}-input`}
            placeholder={value}
          />
        </div>
      ) : null)}
      <div className="row">
        <button
          type="button"
          className="btn btn-link"
          onClick={onClose}
        >Anuluj</button>
        <button
          type="submit"
          className="btn btn-primary"
        >Edytuj</button>
      </div>
    </form>
  </Modal>
);

export default EditModal;