// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Functional component
const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employees/getProfile/${empID}');

        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('Error fetching employee profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Employee Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {employee && (
        <div>
          <p>Employee ID: {employee.empID}</p>
          <p>Name: {employee.empName}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

// Export the component
export default Profile;
