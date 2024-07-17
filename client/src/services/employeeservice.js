import axios from 'axios';

const API_URL = 'http://localhost:5100/employees';

const fetchEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees', error);
    throw error;
  }
};

const fetchEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}`, error);
    throw error;
  }
};

const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, employee);
    return response.data;
  } catch (error) {
    console.error('Error updating employee', error);
    throw error;
  }
};

const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}`, error);
    throw error;
  }
};


const searchEmployees = async (query) => {
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { query },
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching employees`, error);
      throw error;
    }
  };

export { fetchEmployees, fetchEmployeeById, updateEmployee, deleteEmployee, searchEmployees };
