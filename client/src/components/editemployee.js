import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { fetchEmployeeById, updateEmployee } from '../services/employeeservice'; 

const EditEmployee = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const loadEmployee = async () => {
      const employee = await fetchEmployeeById(id);
      if (employee) {
        setName(employee.name);
        setEmail(employee.email);
        setPhone(employee.phone);
        setAddress(employee.address);
      }
    };
    loadEmployee();
  }, [id]);

  const handleUpdate = async () => {
    const updatedEmployee = {
      _id: id,
      name,
      email,
      phone,
      address
    };
    await updateEmployee(id, updatedEmployee);
    navigate('/employees'); 
  };

  return (
    <div>
      <h1>Edit Employee</h1>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleUpdate}>
          Update Employee
        </Button>
      </Form>
    </div>
  );
};

export default EditEmployee;
