import React from 'react';
import '../css/DetailsModal.css'; // Import the stylesheet
import placeholderImage from '../assets/employee-profilepic.png';

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
        <div className="dm-content-1strow">
          <div className="dm-content-1strow-1stcol">
            <div className='employee-profilepic'>
              <img src={placeholderImage}/>
            </div>
          </div>
          <div className="dm-content-1strow-2ndcol">
            <p><strong style={{ fontSize: '18px'}}>{employee.empName}</strong></p>
            <p>{employee.empPosition}</p>
            <p>{employee.empDept}, {employee.empCompany}</p>
          </div>
          <div className="dm-content-1strow-3rdcol">
          </div>
        </div>
        <div className="dm-content-2ndrow">
          <div className="dm-content-2ndrow-1stcol">
            <p><strong>Contact Number:</strong> {employee.empPhonenum}</p>
            <p><strong>Email:</strong> {employee.empEmail}</p>
            <p><strong>Date of Birth:</strong> {employee.empBday}</p>
            <p><strong>Home Address:</strong> {employee.empHomeaddress}</p>
          </div>
          <div className="dm-content-2ndrow-2ndcol">
            <p><strong>Gender:</strong> {employee.empGender}</p>
            <p><strong>Marital Status:</strong> {employee.empMaritalstatus}</p>
            <p><strong>Nationality:</strong> {employee.empNationality}</p>
            <p><strong>Religion:</strong> {employee.empReligion}</p>
          </div>
        </div>
        <div className="dm-content-3rdrow">
          <div className="dm-content-3rdrow-1stcol">
            <p><strong>Date of Hire:</strong> {employee.empDateofhire}</p>
            <p><strong>Employment Status:</strong> {employee.empStatus}</p>
            <p><strong>Department ID:</strong> {employee.empDeptID}</p>
          </div>
          <div className="dm-content-3rdrow-2ndcol">
            <p><strong>Company:</strong> {employee.empCompany}</p>
            <p><strong>Company Address:</strong> {employee.empCompanyaddress}</p>
          </div>
        </div>
        <div className="dm-content-4throw">
          <div className="dm-content-4throw-1stcol">
            <p><strong>TIN ID:</strong> {employee.empTinID}</p>
            <p><strong>HDMF ID:</strong> {employee.empHdmfID}</p>
          </div>
          <div className="dm-content-4throw-2ndcol">
            <p><strong>Philhealth ID:</strong> {employee.empPhilhealthID}</p>
            <p><strong>SSS ID:</strong> {employee.empSssID}</p>
          </div>
        </div>
        <div className="dm-content-5throw">
          <p><strong>Emergency Contact Name:</strong> {employee.empEMRGNCname}</p>
          <p><strong>Emergency Contact Relationship:</strong> {employee.empEMRGNCrelationship}</p>
          <p><strong>Emergency Contact Phone Number:</strong> {employee.empEMRGNCphonenum}</p>
        </div>
      </div>
    </div>
  );
};
export default DetailsModal;
