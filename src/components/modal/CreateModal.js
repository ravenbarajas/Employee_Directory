import React, { useState } from 'react';
import '../css/CreateModal.css'; // Import the stylesheet

const CreateModal = ({ onClose, onEmployeeCreated }) => {
  const [newEmployeeData, setNewEmployeeData] = useState({
    empUsername: '',
    empPass: '',
    empName: '',
    empName: '',
    empBday: '', // Employee Birthday (date picker)
    empDeptID: '', // Department ID field (manual input)
    empDept: '', // Department Name (dropdown)
    empSalary: '', // Salary field (manual input)
    // Add other fields as needed
  });

  // Hardcoded department list
  const departmentListDD = [
    { "deptID": 101, "deptName": "Marketing" },
    { "deptID": 102, "deptName": "IT" },
    { "deptID": 103, "deptName": "HR" },
    { "deptID": 104, "deptName": "Finance" },
    { "deptID": 105, "deptName": "Sales" },
    { "deptID": 106, "deptName": "Research and Development" },
    { "deptID": 107, "deptName": "Customer Support" },
    { "deptID": 108, "deptName": "Operations" },
    { "deptID": 109, "deptName": "Public Relations" },
    { "deptID": 110, "deptName": "Legal" },
    // ... other departments
  ];

  const [departmentList, setDepartmentList] = useState(departmentListDD);

  const generateRandomPassword = () => {
    const getRandomChar = (characters) =>
        characters[Math.floor(Math.random() * characters.length)];

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numericChars = '0123456789';
    const specialChars = '!@#$%^&*+#';
    const minLength = 8;

    const randomPassword =
        getRandomChar(uppercaseChars) +
        getRandomChar(lowercaseChars) +
        getRandomChar(numericChars) +
        getRandomChar(specialChars) +
        Array.from({ length: minLength - 4 }, () => getRandomChar(uppercaseChars + lowercaseChars + numericChars + specialChars))
            .join('');

    return randomPassword;
};

  // Function to generate empID based on the existing logic

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

  const handleDepartmentChange = (e) => {
    const selectedDepartment = departmentList.find((dept) => dept.deptName === e.target.value);

    setNewEmployeeData((prevData) => ({
      ...prevData,
      empDeptID: selectedDepartment ? selectedDepartment.deptID : '',
      empDept: e.target.value,
    }));
  };

  const handleCreate = async () => {
    const isConfirmed = window.confirm('Are you sure the entered information is correct?');
    if (!isConfirmed) {
      // If the user cancels the confirmation, return early
      return;
    }
    try {
      // Perform create logic using an API call or other suitable method
      const response = await fetch('http://localhost:8000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployeeData),
      });

      if (response.ok) {
        console.log('Creating new employee:', newEmployeeData);

        // Close the modal
        onClose();

        // Notify the parent component that a new employee is created
        if (onEmployeeCreated) {
          onEmployeeCreated();
        }
        // Show a dialog box for successful creation
        window.alert('Employee created successfully!');

        // Refresh the entire page
        window.location.reload();
      } else {
        // Log the error details
        const errorDetails = await response.json();
        console.error('Failed to create new employee:', errorDetails);

        // Throw an error to be caught in the catch block
        throw new Error('Failed to create new employee');
      }
    } catch (error) {
      console.error('Error creating new employee:', error);
    }
  };

  return (
    <div className="create-modal">
      <div className="cm-header">
        <div className="cm-header-title">
          <h2>Create Employee</h2>
        </div>
        <div className="cm-header-close">
          <i className="fa-regular fa-circle-xmark" onClick={onClose}></i>
        </div>
      </div>
      <form>
        <label>Name: </label>
        <input
          type="text"
          name="empName"
          value={newEmployeeData.empName}
          onChange={handleInputChange}
        />
        <label>Birthday: </label>
        <input
          type="date"
          name="empBday"
          value={newEmployeeData.empBday}
          onChange={handleInputChange}
        />
        <label>Department ID: </label>
        <input 
          type="text" 
          name="empDeptID" 
          value={newEmployeeData.empDeptID} 
          readOnly 
        />
        <label>Department: </label>
        <select className="cm-dept" name="empDept" value={newEmployeeData.empDept} onChange={handleDepartmentChange}>
          <option value="">Select Department</option>
          {departmentList.map((dept) => (
            <option key={dept.deptID} value={dept.deptName}>
              {`${dept.deptID} - ${dept.deptName}`}
            </option>
          ))}
        </select>
        <label>Salary: </label>
        <input
          type="text"
          name="empSalary"
          value={newEmployeeData.empSalary}
          onChange={handleInputChange}
        />
        {/* Add other fields as needed */}
      </form>
      <div className="cm-form-action">
        <button className="cm-create" onClick={handleCreate}>
          Create Employee
        </button>
      </div>
    </div>
  );
};

export default CreateModal;