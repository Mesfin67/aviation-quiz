import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const SignupModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await axios.post('https://aviation-quiz-backend.onrender.com/api/auth/signup', formData);
      setSuccessMsg(res.data.message || 'Signup successful! You can now log in.');
    } catch (error) {
      console.error('Error during signup:', error.response ? error.response.data : error);
      setErrorMsg(error.response?.data.error || 'Signup failed');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="signupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
              autoFocus

            />
          </Form.Group>
          <Form.Group controlId="signupPassword" className="mt-2">
            <Form.Label>Password (min 6 characters)</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
