

import React, { useEffect, useState } from 'react';
import { Table, Button, Form, FormControl} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchEmployees, deleteEmployee, searchEmployees } from '../services/employeeservice'; 
import AddEmployee from '../components/addemployee'; 

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const loadEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    loadEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    await deleteEmployee(employeeId);
    setEmployees(employees.filter(emp => emp._id !== employeeId));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await searchEmployees(searchQuery);
    setEmployees(data);
  };

  return (
    <div>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Employee List</h1>
        <Form inline onSubmit={handleSearch}>
          <FormControl
            type="text"
            placeholder="Search by name or address"
            className="mr-sm-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>
        <Link to="/employees/add" className="btn btn-primary">Add Employee</Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.address}</td>
              <td>
                <Link to={`/employees/${employee._id}`} className="btn btn-warning">Edit</Link>
                <Button variant="danger" onClick={() => handleDelete(employee._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;
