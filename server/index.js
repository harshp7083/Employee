const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Employee = require('./models/employee');

const app = express();
const PORT = 5100;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Test', {
  
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/employees', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const employee = new Employee({ name, email, phone, address });
    await employee.save();
    res.json(employee);
  } catch (error) {
    console.error('Error adding employee', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const employee = await Employee.findByIdAndUpdate(id, { name, email, phone, address }, { new: true });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error updating employee', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error('Error deleting employee', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
