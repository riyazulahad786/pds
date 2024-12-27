import { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";

const Modal = ({ patient, action, onClose, onUpdate,handleActionClick }) => {
  const [updatedPatient, setUpdatedPatient] = useState(patient);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPatient({ ...updatedPatient, [name]: value });
  };

  const handleActionsChange = (e) => {
    const actions = e.target.value.split(",").map((action) => action.trim());
    setUpdatedPatient({ ...updatedPatient, actions });
  };

  const handleUpdate = () => {
    onUpdate(updatedPatient);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content mx-2">
        <div className="d-flex justify-content-end">
          <button className="close-button" onClick={onClose}>
            <IoCloseSharp size={40} />
          </button>
        </div>
        {action === "Update" ? (
          <div>
            <h2>Update Patient Details</h2>
            <form>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={updatedPatient.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Contact:</label>
                <input
                  type="text"
                  name="contact"
                  value={updatedPatient.contact}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Parent:</label>
                <input
                  type="text"
                  name="parent"
                  value={updatedPatient.parent}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Immediate Actions:</label>
                <input
                  type="text"
                  name="actions"
                  value={updatedPatient.actions.join(", ")}
                  onChange={handleActionsChange}
                />
              </div>
              <div>
                <label>Due Date:</label>
                <input
                  type="date"
                  name="dueDate"
                  value={updatedPatient.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              <button className='btn btn-success' type="button" onClick={handleUpdate}>
                Save Changes
              </button>
            </form>
          </div>
        ) : action ? (
          <div>
            <h2>{action} Details</h2>
            <p>Details for action: {action} on patient {patient.name}.</p>
            <button
                      className="btn btn-success"
                      onClick={() => handleActionClick('Update', patient)}
                    >
                      Update
                    </button>
          </div>
        ) : (
          <div>
            <h2>Patient Details</h2>
            <p>Name: {patient.name}</p>
            <p>Contact: {patient.contact}</p>
            <p>Parent: {patient.parent}</p>
            <p>Immediate Actions: {patient.actions.join(", ")}</p>
            <p>Due Date: {patient.dueDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
