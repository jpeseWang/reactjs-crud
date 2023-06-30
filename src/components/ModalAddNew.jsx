import { Button, Modal } from "react-bootstrap";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { postCreateUser } from "../services/UserService";

function ModalAddNew(props) {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const nameRef = useRef();

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);

    if (res && res.id) {
      //success
      handleClose();
      setName("");
      setJob("");
      toast.success("A User is created successfully");
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      //error
      toast.error("Something went wrong, please try again later!");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new User</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;
