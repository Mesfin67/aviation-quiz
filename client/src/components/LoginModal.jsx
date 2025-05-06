import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const LoginModal = ({ show, handleClose }) => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    console.log('Submitting login with formData:', formData);
    try {
      const res = await axios.post('https://aviation-quiz-backend.onrender.com/api/auth/login', formData);
      console.log('Login response from server:', res.data);
      login(res.data.token);
      handleClose();
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error);
      setErrorMsg(error.response?.data.error || 'Login failed');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login to discover</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="loginUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              autocomplete="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
              autoFocus

            />
          </Form.Group>
          <Form.Group controlId="loginPassword" className="mt-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              autocomplete="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" className="mt-3 w-100">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
