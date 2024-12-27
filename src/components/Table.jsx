import { useState, useEffect } from 'react';
import Modal from './Modal';

const Table = ({ data, setData }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5); 
  const [loading, setLoading] = useState(false);

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = data.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(data.length / patientsPerPage);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setActionType(null);
  };

  const handleActionClick = (action, patient) => {
    setActionType(action);
    setSelectedPatient(patient);
  };

  const handleUpdate = (updatedPatient) => {
    setLoading(true);
    const updatedData = data.map((patient) =>
      patient.id === updatedPatient.id ? updatedPatient : patient
    );
    setTimeout(() => {
      setData(updatedData);
      setLoading(false);
    }, 1000); // Simulate loader delay
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    setLoading(false); 
  }, [data]);

  return (
    <div className="table-container container-fluid">
      {loading && (
        <div className="loader text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!loading && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
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
              {currentPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <button
                      className="link-button btn btn-link"
                      onClick={() => handlePatientClick(patient)}
                    >
                      {patient.name}
                    </button>
                  </td>
                  <td>{patient.contact}</td>
                  <td>{patient.parent}</td>
                  <td>{patient.actions.join(', ')}</td>
                  <td>{patient.dueDate}</td>
                  <td className="d-flex">
                    <button
                      className="btn btn-warning mx-1"
                      onClick={() => handleActionClick('Vaccines', patient)}
                    >
                      Vaccines
                    </button>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => handleActionClick('Follow-up', patient)}
                    >
                      Follow-up
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() => handleActionClick('Lab Tests', patient)}
                    >
                      Lab Tests
                    </button>
                    {/* <button
                      className="btn btn-success"
                      onClick={() => handleActionClick('Update', patient)}
                    >
                      Update
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && (
        <div className="pagination d-flex justify-content-center my-3">
          <button
            className="btn btn-secondary mx-1"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`btn mx-1 ${
                page === currentPage ? 'btn-primary' : 'btn-outline-primary'
              }`}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-secondary mx-1"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      {selectedPatient && (
        <Modal
          patient={selectedPatient}
          action={actionType}
          onClose={() => setSelectedPatient(null)}
          onUpdate={handleUpdate}
          handleActionClick={handleActionClick}
        />
      )}
    </div>
  );
};

export default Table;
