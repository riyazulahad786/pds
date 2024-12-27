import { useState } from 'react';
import Modal from './Modal';

const Table = ({ data, setData }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [actionType, setActionType] = useState(null);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setActionType(null);
  };

  const handleActionClick = (action, patient) => {
    setActionType(action);
    setSelectedPatient(patient);
  };

  const handleUpdate = (updatedPatient) => {
    const updatedData = data.map((patient) =>
      patient.id === updatedPatient.id ? updatedPatient : patient
    );
    setData(updatedData);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Contact</th>
            <th>Parent</th>
            <th>Immediate Actions</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((patient) => (
            <tr key={patient.id}>
              <td>
                <button className="link-button" onClick={() => handlePatientClick(patient)}>
                  {patient.name}
                </button>
              </td>
              <td>{patient.contact}</td>
              <td>{patient.parent}</td>
              <td>{patient.actions.join(", ")}</td>
              <td>{patient.dueDate}</td>
              <td className='d-flex gap-1'>
                <button className='btn btn-warning' onClick={() => handleActionClick("Vaccines", patient)}>Vaccines</button>
                <button className='btn btn-primary' onClick={() => handleActionClick("Follow-up", patient)}>Follow-up</button>
                <button className='btn btn-info' onClick={() => handleActionClick("Lab Tests", patient)}>Lab Tests</button>
                <button className='btn btn-success' onClick={() => handleActionClick("Update", patient)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPatient && (
        <Modal
          patient={selectedPatient}
          action={actionType}
          onClose={() => setSelectedPatient(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Table;

