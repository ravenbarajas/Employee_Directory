import React, { useState, useEffect } from 'react';
import countries from '../assets/countries.json';
import '../css/CreateModal.css'; // Import the stylesheet

const CreateModal = ({ onClose, onEmployeeCreated }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const itemsPerPage = 1; // Number of row sections to display per page
  const [allowResize, setAllowResize] = useState(true); // State to track resizing

  const handleTextareaResize = (e) => {
    const textarea = e.target;
    if (textarea.scrollHeight > textarea.clientHeight) {
      setAllowResize(false); // Disable resizing if content exceeds visible area
    } else {
      setAllowResize(true); // Allow resizing if content fits
    }
  };

  // Function to handle pagination
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const [newEmployeeData, setNewEmployeeData] = useState({
    empName: '',
    empBday: '', 
    empGender: '', 
    empHomeaddress: '',
    empMaritalstatus: '',
    empNationality: '',
    empReligion: '', 
    empPhonenum: '',
    empEmail: '',
    empStatus: '',
    empCompany: '',
    empCompanyaddress: '',
    empDeptID: '',
    empDept: '',
    empPosition: '', 
    empDateofhire: '', 
    empTinID: '',
    empHdmfID: '',
    empPhilhealthID: '',   
    empSssID: '',
    empEMRGNCname: '', 
    empEMRGNCrelationship: '',
    empEMRGNCphonenum: '',  
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

  const [nationalities, setNationalities] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState('');

   // Predefined marital status options
  const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];

     // Predefined employment status options
  const employmentStatusOptions = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Temporary'];
  
  useEffect(() => {
    // Extract nationalities from the imported countries data
    const nationalitiesList = countries.map(country => country.name);
    setNationalities(nationalitiesList);
  }, []);

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

const handleDialCodeChange = (e) => {
  const { name, value } = e.target;
  if (name === 'empNationality') {
    // Update the selected nationality
    setSelectedNationality(value);
    // Find the selected nationality object
    const selectedNationalityObj = countries.find(country => country.name === value);
    // Set the phone number input value to the dial code of the selected nationality
    setNewEmployeeData(prevData => ({
      ...prevData,
      empNationality: value,
      empPhonenum: selectedNationalityObj ? selectedNationalityObj.dial_code : ''
    }));
  } else {
    setNewEmployeeData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }
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

  // Render row sections based on the current page
  const renderRowSections = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            {/* Personal Information */}
            <div className="row">
              <div className="row-section">
                <div className='cm-1strow'>
                  <div className='cm-1strow-header'>
                    <p>Personal Information</p>
                  </div>
                  <div className='cm-1strow-body'>
                    <div className='cm-1strow-1stcol'>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Name: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input
                            type="text"
                            name="empName"
                            value={newEmployeeData.empName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Birthday: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input
                            type="date"
                            name="empBday"
                            value={newEmployeeData.empBday}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Gender: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <select
                            className='cm-gender'
                            name="empGender"
                            value={newEmployeeData.empGender}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="LGBTQIA+">LGBTQIA+</option>
                            <option value="Prefer not to answer">Prefer not to answer</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='cm-1strow-2ndcol'>
                    <div className='cm-datafield-wrapper'>
                      <div className='cm-label-wrapper'>
                        <label>Marital Status: </label>
                      </div>
                      <div className='cm-input-wrapper'>
                      <select
                        className='cm-maritalstatus'
                        name="empMaritalstatus"
                        value={newEmployeeData.empMaritalstatus}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Marital Status</option>
                        {maritalStatusOptions.map((status, index) => (
                          <option key={index} value={status}>{status}</option>
                        ))}
                      </select>
                      </div>
                    </div>
                    <div className='cm-datafield-wrapper'>
                      <div className='cm-label-wrapper'>
                        <label>Nationality: </label>
                      </div>
                      <div className='cm-input-wrapper'>
                        <select
                          className='cm-nationality'
                          name="empNationality"
                          value={newEmployeeData.empNationality}
                          on
                          onChange={handleDialCodeChange}
                        >
                          <option value="">Select Nationality</option>
                          {nationalities.map((nationality, index) => (
                            <option key={index} value={nationality}>{nationality}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className='cm-datafield-wrapper'>
                      <div className='cm-label-wrapper'>
                        <label>Religion: </label>
                      </div>
                      <div className='cm-input-wrapper'>
                        <input
                          type="text"
                          name="empReligion"
                          value={newEmployeeData.empReligion}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    </div>
                  </div>
                  <div className='cm-datafield-wrapper'>
                    <div className='cm-label-wrapper'>
                      <label>Home Address: </label>
                    </div>
                    <div className='cm-input-wrapper'>
                      <textarea
                        className="create-modal-input" // Apply the same class as other inputs
                        name="empHomeaddress"
                        value={newEmployeeData.empHomeaddress}
                        onChange={handleInputChange}
                        rows={2} // Set the number of rows here
                        onInput={handleTextareaResize} // Handle resize
                        style={{ resize: allowResize ? 'both' : 'horizontal' }} // Control resize behavior
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            {/* Contact Information */}
            <div className="row">
              <div className="row-section">
                <div className='cm-2ndrow'>
                  <div className='cm-2ndrow-header'>
                    <p>Contact Information</p>
                  </div>
                  <div className='cm-2ndrow-body'>
                    <div className='cm-2ndrow-1stcol'>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Phone Number: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input
                            type="text"
                            name="empPhonenum"
                            value={newEmployeeData.empPhonenum}
                            onChange={handleDialCodeChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='cm-2ndrow-1stcol'>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Email Address: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input
                            type="text"
                            name="empEmail"
                            value={newEmployeeData.empEmail}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            {/* Work Profile */}
            <div className="row">
              <div className="row-section">
                <div className='cm-3rdrow'>
                  <div className='cm-3rdrow-header'>
                    <p>Work Profile</p>
                  </div>
                  <div className='cm-3rdrow-body'>
                    <div className='cm-3rdrow-1stcol'>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Employment Status: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <select
                          className='cm-empstatus'
                            name="empStatus"
                            value={newEmployeeData.empStatus}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Employment Status</option>
                            {employmentStatusOptions.map((status, index) => (
                              <option key={index} value={status}>{status}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Position: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input 
                            type="text" 
                            name="empPosition" 
                            value={newEmployeeData.empPosition} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Company: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input 
                            type="text" 
                            name="empCompany" 
                            value={newEmployeeData.empCompanys} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='cm-3rdrow-2ndcol'>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Department ID: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input 
                            type="text" 
                            name="empDeptID" 
                            value={newEmployeeData.empDeptID} 
                            readOnly 
                          />
                        </div>
                      </div>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Department: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <select className="cm-dept" name="empDept" value={newEmployeeData.empDept} onChange={handleDepartmentChange}>
                            <option value="">Select Department</option>
                            {departmentList.map((dept) => (
                              <option key={dept.deptID} value={dept.deptName}>
                                {`${dept.deptID} - ${dept.deptName}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Date of Hire: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input 
                            type="date"
                            name="empDateofhire" 
                            value={newEmployeeData.empDateofhire} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='cm-datafield-wrapper'>
                    <div className='cm-label-wrapper'>
                      <label>Company Address: </label>
                    </div>
                    <div className='cm-input-wrapper'>
                      <textarea 
                        type="text" 
                        name="empCompanyaddress" 
                        value={newEmployeeData.empCompanyaddress} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            {/* Government IDs */}
            <div className="row">
              <div className="row-section">
                <div className='cm-4throw'>
                  <div className='cm-4throw-header'>
                    <p>Government IDs</p>
                  </div>
                  <div className='cm-4throw-body'>
                    <div className='cm-4throw-1stcol'>
                    <div className='cm-datafield-wrapper'>
                      <div className='cm-label-wrapper'>
                        <label>TIN ID: </label>
                      </div>
                      <div className='cm-input-wrapper'>
                        <input 
                          type="text" 
                          name="empTinID" 
                          value={newEmployeeData.empTinID} 
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className='cm-datafield-wrapper'>
                      <div className='cm-label-wrapper'>
                        <label>HDMF ID: </label>
                      </div>
                      <div className='cm-input-wrapper'>
                        <input 
                          type="text" 
                          name="empHdmfID" 
                          value={newEmployeeData.empHdmfID} 
                          onChange={handleInputChange}
                        />  
                      </div>
                    </div>
                    </div>
                    <div className='cm-4throw-2ndcol'>
                      <div className='cm-datafield-wrapper'>
                      <div className='cm-label-wrapper'>
                        <label>PhilHealth ID: </label>
                      </div>
                        <div className='cm-input-wrapper'>
                          <input 
                            type="text" 
                            name="empPhilhealthID" 
                            value={newEmployeeData.empPhilhealthID} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>SSS ID: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input 
                            type="text" 
                            name="empSssID" 
                            value={newEmployeeData.empSssID} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            {/* Emergency Contact */}
            <div className="row">
              <div className="row-section">
                <div className='cm-5throw'>
                  <div className='cm-5throw-header'>
                    <p>Emergency Contact</p>
                  </div>
                  <div className='cm-5throw-body'>
                    <div className='cm-5throw-1stcol'>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Name: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input 
                            type="text" 
                            name="empEMRGNCname" 
                            value={newEmployeeData.empEMRGNCname} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Relationship: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input 
                            type="text" 
                            name="empEMRGNCrelationship" 
                            value={newEmployeeData.empEMRGNCrelationship} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='cm-5throw-2ndcol'>
                      <div className='cm-datafield-wrapper'>
                        <div className='cm-label-wrapper'>
                          <label>Phone Number: </label>
                        </div>
                        <div className='cm-input-wrapper'>
                          <input 
                            type="text" 
                            name="empEMRGNCphonenum" 
                            value={newEmployeeData.empEMRGNCphonenum} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
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
        {/* Render row sections based on the current page */}
        {renderRowSections()}
      </form>
      {/* Pagination controls */}
      <div className="cm-pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <span className='pagination-indicator'>{`${currentPage} of ${totalPages}`}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === 5}>
          <i className="fa-solid fa-caret-right"></i>
        </button>
      </div>
      <div className="cm-form-action">
        <button className="cm-create" onClick={handleCreate}>
          Create Employee
        </button>
      </div>
    </div>
  );
};

export default CreateModal;