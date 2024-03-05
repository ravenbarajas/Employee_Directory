import React, { useEffect, useState  } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../authSlice';
import axios from 'axios';

const Profile = () => {
  const token = useSelector(selectToken);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/employees/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = response.data;
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [token]);

  return (
    <div>
      <h1>Profile Page</h1>
      {profileData ? (
        <div>
          <p>Employee ID: {profileData.empID}</p>
          <p>Employee Name: {profileData.empName}</p>
          {/* Add other profile information here */}
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default Profile;
