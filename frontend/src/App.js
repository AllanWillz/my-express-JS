import { Table, Container, Form, Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [developers, setDevelopers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [developerToDelete, setDeveloperToDelete] = useState(null);
  const [editingDeveloper, setEditingDeveloper] = useState(null);
  const [newDeveloper, setNewDeveloper] = useState({
    firstName: '',
    lastName: '',
    otherNames: '',
    gender: '',
    email: '',
    telephone: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const BASE_URL = 'http://localhost:3001/developers';

  const fetchDevelopers = async () => {
    try {
      const response = await axios.get(BASE_URL);
      if (response) {
        setDevelopers(response.data.developers);
      }
    } catch (error) {
      console.error('Error fetching developers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeveloper({ ...newDeveloper, [name]: value });
  };

  const addOrUpdateDeveloper = async () => {
    try {
      const response = isEditing
        ? await axios.put(`${BASE_URL}/${editingDeveloper.id}`, newDeveloper)
        : await axios.post(`${BASE_URL}/create`, newDeveloper);

      if (response) {
        const updatedDevelopers = isEditing
          ? developers.map((dev) => (dev.id === editingDeveloper.id ? response.data.updatedDeveloper : dev))
          : [...developers, response.data.newDeveloper];

        setDevelopers(updatedDevelopers);
        hideEditDeveloperModal();
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'editing' : 'adding'} developer:`, error);
    }
  };

  const showEditDeveloperModal = (developer) => {
    setEditingDeveloper(developer);
    setNewDeveloper({ ...developer });
    setShowEditForm(true);
    setIsEditing(true);
  };

  const hideEditDeveloperModal = () => {
    setEditingDeveloper(null);
    setNewDeveloper({
      firstName: '',
      lastName: '',
      otherNames: '',
      gender: '',
      email: '',
      telephone: '',
      dateOfBirth: '',
    });
    setShowEditForm(false);
    setIsEditing(false);
  };

  const showDeleteConfirmationModal = (developer) => {
    setDeveloperToDelete(developer);
    setShowDeleteConfirmation(true);
  };

  const showAddDeveloperModal = () => {
    setShowAddForm(true);
  };

  const hideAddDeveloperModal = () => {
    setShowAddForm(false);
  };

  const hideDeleteConfirmationModal = () => {
    setDeveloperToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const deleteDeveloper = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/${developerToDelete.id}`);
      if (response) {
        setDevelopers(developers.filter((dev) => dev.id !== developerToDelete.id));
        hideDeleteConfirmationModal();
      }
    } catch (error) {
      console.error('Error deleting developer:', error);
    }
  };

  return (
    <div className="App">
      <Container>
        <Button variant="primary" onClick={showAddDeveloperModal}>
          Add Developer
        </Button>

        <Modal show={showAddForm || showEditForm} onHide={hideAddDeveloperModal}>
          <Modal.Header closeButton>
            <Modal.Title>{showEditForm ? 'Edit Developer' : 'Add Developer'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" name="firstName" value={newDeveloper.firstName} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name="lastName" value={newDeveloper.lastName} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group controlId="formOtherNames">
                <Form.Label>Other Names</Form.Label>
                <Form.Control type="text" placeholder="Enter other names" name="otherNames" value={newDeveloper.otherNames} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text" placeholder="Enter gender" name="gender" value={newDeveloper.gender} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={newDeveloper.email} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group controlId="formTelephone">
                <Form.Label>Telephone</Form.Label>
                <Form.Control type="tel" placeholder="Enter telephone" name="telephone" value={newDeveloper.telephone} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group controlId="formDateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name="dateOfBirth" value={newDeveloper.dateOfBirth} onChange={handleInputChange} />
              </Form.Group>

              {showEditForm && (
                <Button variant="success" onClick={addOrUpdateDeveloper}>
                  Save Changes
                </Button>
              )}

              {!showEditForm && (
                <Button variant="success" onClick={addOrUpdateDeveloper}>
                  Save Developer
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>OtherName</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Date of birth</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {developers?.map((developer, index) => (
              <tr key={developer.id}>
                <td>{index + 1}</td>
                <td>{developer.firstName}</td>
                <td>{developer.lastName}</td>
                <td>{developer.otherNames}</td>
                <td>{developer.gender}</td>
                <td>{developer.email}</td>
                <td>{developer.telephone}</td>
                <td>{developer.dateOfBirth}</td>
                <td>
                 
                  <Button variant="success" onClick={() => showEditDeveloperModal(developer)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => showDeleteConfirmationModal(developer)}>
                    Delete
                  </Button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showDeleteConfirmation} onHide={hideDeleteConfirmationModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this developer?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideDeleteConfirmationModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={deleteDeveloper}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default App;
