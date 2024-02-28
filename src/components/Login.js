import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    empID: '',
    empBday: new Date().toISOString().split('T')[0], // Default to today's date in 'YYYY-MM-DD' format
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Example React code in Login.js
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/employees/authenticate',
        {
          ...formData,
        }
      );
  
      if (response.data.success) {
        onLogin();
        // Extract empID directly from the response
        const empID = response.data.employee.empID;
        // Pass the empID to the Profile component
        navigate(`/profile/${empID}`);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error during login. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <input
            type="text"
            name="empID"
            value={formData.empID}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Birthday:
          <DatePicker
            selected={new Date(formData.empBday)}
            onChange={(date) =>
              setFormData({ ...formData, empBday: date.toISOString().split('T')[0] })
            }
          />
        </label>
        <br />
        <input type="hidden" name="password" value="dummy_password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
