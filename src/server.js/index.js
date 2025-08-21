// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const EmployeeModels = require('./Employes');

const app = express();
app.use(express.json())
app.use(cors());

mongoose.connect('mongodb://localhost:27017/')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await EmployeeModels.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newEmployee = await EmployeeModels.create({
      name,
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: { name: newEmployee.name, email: newEmployee.email }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await EmployeeModels.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      message: 'Login successful!',
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});