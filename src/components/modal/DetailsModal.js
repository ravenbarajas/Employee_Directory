import React from 'react';
import '../css/DetailsModal.css'; // Import the stylesheet

const DetailsModal = ({ employee, onClose }) => {
  // You can customize the content and styling of the details modal here
  return (
    <div className="details-modal">
      <div className="dm-header">
        <div className='em-header-title'>
          <h2>Employee Details</h2>
        </div>
        <div className='dm-header-close'>
          <i className="fa-regular fa-circle-xmark" onClick={onClose}></i>
        </div>
      </div>
      <div className="dm-content">
        <p><strong>Name:</strong> {employee.empName}</p>
        <p><strong>Birthday:</strong> {employee.empBday}</p>
        <p><strong>Department ID:</strong> {employee.empDeptID}</p>
        <p><strong>Department:</strong> {employee.empDept}</p>
        <p><strong>Salary:</strong> {employee.empSalary}</p>
      </div>
    </div>
  );
};

export default DetailsModal;
