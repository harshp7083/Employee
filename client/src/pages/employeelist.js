import React, { useEffect, useState } from 'react';
import { fetchEmployees, deleteEmployee } from '../services/employeeService';
import { Table, Button } from 'react-bootstrap';
import EditEmployeeModal from './EditEmployeeModal';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    loadEmployees();
  }, []);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleDelete = async (employeeId) => {
    await deleteEmployee(employeeId);
    setEmployees(employees.filter(employee => employee._id !== employeeId));
  };

  const handleModalClose = () => {
    setEditingEmployee(null);
  };

  const handleModalSave = (updatedEmployee) => {
    setEmployees(employees.map(employee => (employee._id === updatedEmployee._id ? updatedEmployee : employee)));
    setEditingEmployee(null);
  };

  return (
    <div>
      <h1>Employee List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.address}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(employee)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(employee._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {editingEmployee && (
        <EditEmployeeModal
          show={!!editingEmployee}
          employee={editingEmployee}
          onHide={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default EmployeeList;
