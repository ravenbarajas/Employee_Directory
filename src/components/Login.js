import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../authSlice';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ empUsername: '', empPass: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/employees/login', credentials);

      if (response.ok) {
        const data = response.data;
        dispatch(setAuthToken(data.token));
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="text" name="empUsername" placeholder="Username" onChange={handleInputChange} />
      <input type="password" name="empPass" placeholder="Password" onChange={handleInputChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
