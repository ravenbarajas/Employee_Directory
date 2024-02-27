// App.js
import React, { useState } from 'react';
import TableView from './components/TableView';
import Login from './components/Login';
import './App.css';  // Import your main stylesheet

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <TableView />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
