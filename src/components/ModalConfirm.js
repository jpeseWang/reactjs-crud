import { Button, Modal } from "react-bootstrap";
import { useRef, useState } from "react";

function ModalConfirm(props) {
  const { show, handleClose, dataUserDelete } = props;
  const confirmDelelte = () => {};
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <p className="text-danger font-weight-bold">
              <b>
                Are you sure you want to delete User,<br></br> this action can't
                be undone!
              </b>
            </p>
            Email:
            <b> {dataUserDelete.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelelte()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
