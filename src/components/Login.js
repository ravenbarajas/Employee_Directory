// Login.js
import React, { useState } from 'react';
import './css/Login.css';  // Import your login stylesheet

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform your authentication logic here
    // Check if the username and password are correct
    // For simplicity, let's assume a simple check here
    if (username === 'admin' && password === 'password') {
      onLogin();  // Notify the parent component that login is successful
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
