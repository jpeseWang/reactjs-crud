import { Button, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { postCreateUser, putUpdateUser } from "../services/UserService";

function ModalEditUser(props) {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const nameRef = useRef();

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    if (res && res.updatedAt) {
      //success
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });
      handleClose();
      toast.success("Updated user successfully!");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="form-group mb-3">
                <label for="exampleInputEmail1">Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-grou mb-3">
                <label for="exampleInputPassword1">Job</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Primary Job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;
