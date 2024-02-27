import React, { useState, useEffect } from 'react';
import '../css/EditModal.css'; // Import the stylesheet

const EditModal = ({ employee, onClose, onUpdate }) => {
  const [updatedEmployeeData, setUpdatedEmployeeData] = useState({ ...employee });

  useEffect(() => {
    // Reset the updatedEmployeeData whenever the employee prop changes
    setUpdatedEmployeeData({ ...employee });
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const isConfirmed = window.confirm('Are you sure you want to update this employee?');
    if (!isConfirmed) {
      // If the user cancels the confirmation, return early
      return;
    }
    try {
      // Perform update logic using an API call or other suitable method
      const response = await fetch(`http://localhost:8000/api/employees/${employee.empID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployeeData),
      });

      if (response.ok) {
        console.log('Updating employee:', updatedEmployeeData);

        // Notify the parent component that an employee is updated
        if (onUpdate) {
          onUpdate(updatedEmployeeData);
        }

        // Close the modal
        onClose();

        // Show a dialog box for successful update
        window.alert('Employee updated successfully!');
      } else {
        // Log the error details
        const errorDetails = await response.json();
        console.error('Failed to update employee:', errorDetails);

        // Throw an error to be caught in the catch block
        throw new Error('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="edit-modal">
      <div className="em-header">
        <div className='em-header-title'>
          <h2>Edit Employee</h2>
        </div>
        <div className='em-header-close'>
          <i className="fa-regular fa-circle-xmark" onClick={onClose}></i>
        </div>
      </div>
      <form>
        <label>Name: </label>
        <input
          type="text"
          name="empName"
          value={updatedEmployeeData.empName}
          onChange={handleInputChange}
        />

        <label>Birthday: </label>
        <input
          type="date"
          name="empBday"
          value={updatedEmployeeData.empBday}
          onChange={handleInputChange}
        />

        <label>Department ID: </label>
        <input 
          type="text" 
          name="empDeptID" 
          value={updatedEmployeeData.empDeptID} 
          readOnly />

        <label>Department: </label>
        <input
          type="text"
          name="empDept"
          value={updatedEmployeeData.empDept}
          readOnly
        />

        <label>Salary: </label>
        <input
          type="text"
          name="empSalary"
          value={updatedEmployeeData.empSalary}
          onChange={handleInputChange}
        />

        {/* Add other fields as needed */}
      </form>
      <div className='em-form-action'>
        <button className='em-update' onClick={handleUpdate}>
          Update Employee
        </button>
      </div>
    </div>
  );
};

export default EditModal;
