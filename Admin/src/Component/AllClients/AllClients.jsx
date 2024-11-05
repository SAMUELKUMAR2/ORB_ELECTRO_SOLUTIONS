import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap'; // Import Bootstrap modal
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_BASE_URL;

const AllClients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [clientToDelete, setClientToDelete] = useState(null); // State for client ID to delete

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/clients`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setClients(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/admin/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Filter out the deleted client
      setClients(clients.filter(client => client._id !== id));
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (id) => {
    setClientToDelete(id);
    setShowModal(true);
  };

  if (loading) {
    return <div className='m-3 text-center'>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className='d-flex justify-content-between'>
        <h2 className="mb-4">All Clients</h2>
        <div>
          <button className='btn btn-outline-info' onClick={() => navigate('/products/clients/client')}>
            Add Client
          </button>
        </div>
      </div>
      <div className="table-responsive"> {/* Make the table responsive */}
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>{client._id}</td>
                <td>{client.username}</td>
                <td>{client.email}</td>
                <td>{client.mobile}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => confirmDelete(client._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this client?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(clientToDelete)}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllClients;
