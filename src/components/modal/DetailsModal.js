import React from 'react';
import '../css/DetailsModal.css'; // Import the stylesheet
import placeholderImage from '../assets/employee-profilepic.png';

const DetailsModal = ({ employee, onClose }) => {
  // You can customize the content and styling of the details modal here
  return (
    <div className="details-modal">
      <div className="dm-header">
        <div className='dm-header-title'>
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
            <p></p>
            <p>{employee.empPhonenum}</p>
            <p>{employee.empEmail}</p>
          </div>
        </div>
        <div className='dm-2nd-section'>
          <div className='dm-row-header'>
            <p>Personal Information</p>
          </div>
          <div className="dm-2nd-row">
            <div className="dm-content-2ndrow-1stcol">
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Date of Birth:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empBday}</p>
                </div>
              </div>
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Gender:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empGender}</p>
                </div>
              </div>
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Home Address:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empHomeaddress}</p>
                </div>
              </div>
            </div>
            <div className="dm-content-2ndrow-2ndcol">
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Marital Status:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empMaritalstatus}</p>
                </div>
              </div>
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Nationality:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empNationality}</p>
                </div>
              </div>
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Religion:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empReligion}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dm-3rd-section">
          <div className='dm-row-header'>
            <p>Work Profile</p>
          </div>
          <div className='dm-3rd-row'>
            <div className="dm-content-3rdrow-1stcol">
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Date of Hire:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empDateofhire}</p>
                </div>
              </div>
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Employment Status:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empStatus}</p>
                </div>
              </div>
            </div>
            <div className="dm-content-3rdrow-2ndcol">
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Department ID:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empDeptID}</p>
                </div>
              </div>
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Company Address:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empCompanyaddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='dm-4th-section'>
          <div className='dm-row-header'>
            <p>Government IDs</p>
          </div>
          <div className="dm-4th-row">
            <div className="dm-content-4throw-1stcol">
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>TIN ID:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empTinID}</p>
                </div>
              </div>
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>HDMF ID:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empHdmfID}</p>
                </div>
              </div>
            </div>
            <div className="dm-content-4throw-2ndcol">
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Philhealth ID:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empHdmfID}</p>
                </div>
              </div>
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>SSS ID:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empHdmfID}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='dm-5th-section'>
          <div className='dm-row-header'>
            <p>Emergency Contact</p>
          </div>
          <div className='dm-5th-row'>
            <div className="dm-5th-row-L">
            <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Emergency Contact Name:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empEMRGNCname}</p>
                </div>
              </div>
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Emergency Contact Relationship:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empEMRGNCrelationship}</p>
                </div>
              </div>
            </div>
            <div className="dm-5th-row-R">
              <div className='dm-datafield-wrapper'>
                <div className='dm-label-wrapper'>
                  <label>Emergency Contact Phone Number:</label>
                </div>
                <div className='dm-data-wrapper'>
                  <p>{employee.empEMRGNCphonenum}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailsModal;
