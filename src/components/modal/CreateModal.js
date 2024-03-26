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
    dialCodePN: '',  
    dialCodeEMRGNC: '',  
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
  const employmentStatusOptions = ['Full-time', 'Part-time', 'Probation', 'Contract', 'Freelance', 'Internship'];
  
  useEffect(() => {
    // Extract nationalities from the imported countries data
    const nationalitiesList = countries.map(country => country.nationality);
    setNationalities(nationalitiesList);

    setNewEmployeeData({
      empName: '',
      empDeptID: '',
      empTinIDPart1: '',
      empTinIDPart2: '',
      empTinIDPart3: '',
      empTinIDPart4: '',
      empHdmfIDPart1: '',
      empHdmfIDPart2: '',
      empHdmfIDPart3: '',
      empPhilhealthIDPart1: '',
      empPhilhealthIDPart2: '',
      empPhilhealthIDPart3: '',
      empSssIDPart1: '',
      empSssIDPart2: '',
      empSssIDPart3: '',
      empEMRGNCname: '',
      empEMRGNCrelationship: '',
      empEMRGNCphonenum: '',
      dialCodePN: '',
      dialCodeEMRGNC: '',
    });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the field was previously null
    const wasNull = !newEmployeeData[name];

    setNewEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    
    // Reset border color and helper text color if the field was previously null and is now filled
    if (wasNull && value.trim() !== '') {
      const element = document.getElementsByName(name)[0];
      if (element) {
          // Reset border color
          element.style.borderColor = '';
          // Reset border width
          element.style.borderWidth = '';

          // Reset helper text color
          const helperTextId = name + 'Helper'; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  }
  };

  // For autofill country code based on the nationality selected
  const handleDialCodeChange = (e) => {
    const { name, value } = e.target;
    // Check if the field was previously null
    const wasNull = !newEmployeeData[name];

    if (name === 'empNationality') {
        // Update the selected nationality
        setSelectedNationality(value);
        // Find the selected nationality object
        const selectedNationalityObj = countries.find(country => country.nationality === value);
        const dialCodeValue = selectedNationalityObj ? selectedNationalityObj.dial_code : '';
        // Set the phone number input value to the dial code of the selected nationality
        setNewEmployeeData(prevData => ({
            ...prevData,
            empNationality: value,
            dialCodePN: dialCodeValue, // Unique dial code name for empPhonenum
            dialCodeEMRGNC: dialCodeValue, // Unique dial code name for empEMRGNCphonenum
        }));

        // Reset border color and width for the nationality dropdown field
        const element = document.getElementsByName(name)[0];
        if (element) {
            element.style.borderColor = '';
            element.style.borderWidth = '';

            // Reset helper text color
            const helperTextId = name + 'Helper'; // Construct helper text id
            const helperText = document.getElementById(helperTextId);
            if (helperText) {
                helperText.style.color = '#ebebeb';
            }
        }

        // Reset border color and width for the changed dialCode fields
        const dialCodeFields = ['dialCodePN', 'dialCodeEMRGNC'];
        dialCodeFields.forEach(dialCodeField => {
            const dialCodeElement = document.getElementsByName(dialCodeField)[0];
            if (dialCodeElement) {
                dialCodeElement.style.borderColor = '';
                dialCodeElement.style.borderWidth = '';
            }
        });

        // Reset border color and width for the phone number fields
        const phoneFields = ['empPhonenum', 'empEMRGNCphonenum'];
        phoneFields.forEach(phoneField => {
            const phoneElement = document.getElementsByName(phoneField)[0];
            if (phoneElement) {
                // Check if the value meets the minLength requirement
                const minLength = phoneElement.minLength ? parseInt(phoneElement.minLength, 10) : 0;
                if (value.trim().length >= minLength) {
                    phoneElement.style.borderColor = '';
                    phoneElement.style.borderWidth = '';
                    // Reset helper text color
                    const helperTextId = phoneField + 'Helper'; // Construct helper text id
                    const helperText = document.getElementById(helperTextId);
                    if (helperText) {
                        helperText.style.color = '#ebebeb';
                    }
                }
            }
        });
    } else {
        const updatedPhoneNumber = newEmployeeData[name === 'empPhonenum' ? 'dialCodePN' : 'dialCodeEMRGNC'] + value;
        setNewEmployeeData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        const inputElement = document.getElementsByName(name)[0];
        const minLength = inputElement ? parseInt(inputElement.minLength, 10) : 0;

        // Check if the minLength requirement is met for empPhonenum and empEMRGNCphonenum
        if ((name === 'empPhonenum' || name === 'empEMRGNCphonenum') && value.trim().length < minLength) {
            const helperText = document.getElementById(name + 'Helper');
            if (helperText) {
                helperText.style.color = 'red';
            }
        } else {
            // Reset border color and helper text color if the field was previously null and is now filled
            if (wasNull && value.trim() !== '') {
                // Reset border color and width for the changed dialCode field
                const dialCodeFieldName = name === 'empPhonenum' ? 'dialCodePN' : 'dialCodeEMRGNC';
                const dialCodeElement = document.getElementsByName(dialCodeFieldName)[0];
                if (dialCodeElement) {
                    dialCodeElement.style.borderColor = '';
                    dialCodeElement.style.borderWidth = '';
                }
            }

            // Reset border color and width for the changed phone number field
            const element = document.getElementsByName(name)[0];
            if (element) {
                element.style.borderColor = '';
                element.style.borderWidth = '';

                // Reset helper text color
                const helperTextId = name + 'Helper'; // Construct helper text id
                const helperText = document.getElementById(helperTextId);
                if (helperText) {
                    helperText.style.color = '#ebebeb';
                }
            }
        }
    }
  };

  //For processing the Phone numbers in Standard Format
  const parsePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      // Handle empty or undefined dates
      return null;
    }
    // Ensure phoneNumber is treated as a string
    const phoneNumberString = String(phoneNumber);
  
    // Assuming the phone number format is "639212806805"
    // You may need to adjust this based on your actual phone number format
    const countryCode = phoneNumberString.slice(0, 3);
    const areaCode = phoneNumberString.slice(3, 6);
    const subscriberNumber1 = phoneNumberString.slice(6, 9);
    const subscriberNumber2 = phoneNumberString.slice(9);
  
    // Format the phone number as per your requirements
    return `${countryCode} (${areaCode}) ${subscriberNumber1} ${subscriberNumber2}`;
  };
  
  // For DeptID autofill based on Department Selected
  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;

    // Check if the field was previously null
    const wasNull = !newEmployeeData.empDeptID;

    // Set Department and Department ID
    const selectedDepartment = departmentList.find((dept) => dept.deptName === value);
    const deptID = selectedDepartment ? selectedDepartment.deptID : '';
    setNewEmployeeData((prevData) => ({
      ...prevData,
      empDept: value,
      empDeptID: deptID,
    }));

    // Reset border color and helper text color if the field was previously null and is now filled
    if (wasNull && value.trim() !== '') {
      // Reset border color for the department dropdown
      const deptDropdown = document.querySelector('.cm-dept');
      if (deptDropdown) {
        deptDropdown.style.borderColor = '';
        deptDropdown.style.borderWidth = '';
      }

      // Reset helper text color for the department dropdown
      const deptHelperText = document.getElementById('empDeptHelper');
      if (deptHelperText) {
        deptHelperText.style.color = '#ebebeb';
      }

      // Reset border color for the department ID field
      const deptIDElement = document.querySelector('.cm-deptID');
      if (deptIDElement) {
        deptIDElement.style.borderColor = '';
        deptIDElement.style.borderWidth = '';
      }

      // Reset helper text color for the department ID field
      const deptIDHelperText = document.getElementById('empDeptIDHelper');
      if (deptIDHelperText) {
        deptIDHelperText.style.color = '#ebebeb';
      }
    }
  };

  const handleTinIDPart1Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empTinIDPart1: value,
    }));
    const element = document.getElementsByName('empTinIDPart1')[0];
    if (element && value.trim().length >= element.minLength) {
        element.style.borderColor = ''; // Reset border color
        element.style.borderWidth = ''; // Reset border width

        // Reset helper text color
        const helperTextId = `empTinIDHelper`; // Construct helper text id
        const helperText = document.getElementById(helperTextId);
        if (helperText) {
            helperText.style.color = '#ebebeb';
        }
    }
  };

  const handleTinIDPart2Change = (e) => {
      const { value } = e.target;
      setNewEmployeeData(prevData => ({
          ...prevData,
          empTinIDPart2: value,
      }));
      const element = document.getElementsByName('empTinIDPart2')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empTinIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  const handleTinIDPart3Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empTinIDPart3: value,
    }));
    const element = document.getElementsByName('empTinIDPart3')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empTinIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  const handleTinIDPart4Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empTinIDPart4: value,
    }));
    const element = document.getElementsByName('empTinIDPart4')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empTinIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  const handleHdmfIDPart1Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empHdmfIDPart1: value,
    }));
    const element = document.getElementsByName('empHdmfIDPart1')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empHdmfIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  const handleHdmfIDPart2Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empHdmfIDPart2: value,
    }));
    const element = document.getElementsByName('empHdmfIDPart2')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empHdmfIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  const handleHdmfIDPart3Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empHdmfIDPart3: value,
    }));
    const element = document.getElementsByName('empHdmfIDPart3')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empHdmfIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  const handlePhilhealthIDPart1Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empPhilhealthIDPart1: value,
    }));
    const element = document.getElementsByName('empPhilhealthIDPart1')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empPhilhealthIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  const handlePhilhealthIDPart2Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empPhilhealthIDPart2: value,
    }));
    const element = document.getElementsByName('empPhilhealthIDPart2')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empPhilhealthIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  const handlePhilhealthIDPart3Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empPhilhealthIDPart3: value,
    }));
    const element = document.getElementsByName('empPhilhealthIDPart3')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empPhilhealthIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  const handleSssIDPart1Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empSssIDPart1: value,
    }));
    const element = document.getElementsByName('empSssIDPart1')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empSssIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  const handleSssIDPart2Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empSssIDPart2: value,
    }));
    const element = document.getElementsByName('empSssIDPart2')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empSssIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  const handleSssIDPart3Change = (e) => {
    const { value } = e.target;
    setNewEmployeeData(prevData => ({
        ...prevData,
        empSssIDPart3: value,
    }));
    const element = document.getElementsByName('empSssIDPart3')[0];
      if (element && value.trim().length >= element.minLength) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width

          // Reset helper text color
          const helperTextId = `empSssIDHelper`; // Construct helper text id
          const helperText = document.getElementById(helperTextId);
          if (helperText) {
              helperText.style.color = '#ebebeb';
          }
      }
  };

  //For saving the inputs to database
  const handleCreate = async () => {
    const isConfirmed = window.confirm('Are you sure the entered information is correct?');
    if (!isConfirmed) {
      return;
    }
    // Check if any required fields are null
    const requiredFields = ['empName', 'empMaritalstatus', 'empBday', 'empNationality', 'empGender', 'empReligion', 'empHomeaddress',
                            'dialCodePN','dialCodeEMRGNC','empPhonenum', 'empEmail',
                            'empEMRGNCname', 'empEMRGNCphonenum', 'empEMRGNCrelationship',
                            'empStatus', 'empDeptID', 'empPosition', 'empDept', 'empCompany', 'empDateofhire', 'empCompanyaddress'];
   
    const hasNullValues = requiredFields.some(field => !newEmployeeData[field]);

    // Highlight textboxes with null values
    requiredFields.forEach(field => {
      const element = document.getElementsByName(field)[0];
      if (element) {
        element.style.borderColor = hasNullValues && !newEmployeeData[field] ? 'red' : ''; // Reset border color if no null value
        element.style.borderWidth = hasNullValues && !newEmployeeData[field] ? '2px' : ''; // Set border width to 2px if there is a null value
     
        // Set helper text color to red if there's a null value
        const helperTextId = field + 'Helper'; // Construct helper text id
        const helperText = document.getElementById(helperTextId);
        if (helperText) {
            helperText.style.color = hasNullValues && !newEmployeeData[field] ? 'red' : '#ebebeb';
        }
      }
    });

    const govIDFields = [   'empTinIDPart1', 'empTinIDPart2', 'empTinIDPart3', 'empTinIDPart4', 
                            'empHdmfIDPart1', 'empHdmfIDPart2', 'empHdmfIDPart3', 
                            'empPhilhealthIDPart1', 'empPhilhealthIDPart2', 'empPhilhealthIDPart3', 
                            'empSssIDPart1', 'empSssIDPart2', 'empSssIDPart3'];

    // Flag to track if any gov ID field doesn't meet the minLength requirement
    let hasInvalidInputs = false;

    // Loop through each gov ID field
    govIDFields.forEach(field => {
      const element = document.getElementsByName(field)[0];
      if (element) {
          element.style.borderColor = ''; // Reset border color
          element.style.borderWidth = ''; // Reset border width
          
          // Check if the value meets the minLength requirement
          if ((newEmployeeData[field] || '').trim().length < element.minLength) {
              hasInvalidInputs = true;
              element.style.borderColor = 'red'; // Set border color to red
              element.style.borderWidth = '2px'; // Set border width to 2px

              // Get the corresponding helper text element
              const helperTextId = `${field}Helper`;
              const helperText = document.getElementById(helperTextId);

              // Change the color of the helper text to red
              if (helperText) {
                  helperText.style.color = 'red';
              }
          }
      }
  });

  // If any gov ID field doesn't meet the minLength requirement, display a message in the main helper text
  if (hasInvalidInputs) {
    const helperText = document.getElementById('empTinIDHelper');
    if (helperText) {
        helperText.style.color = 'red';
    }
  }
  if (hasInvalidInputs) {
    const helperText = document.getElementById('empHdmfIDHelper');
    if (helperText) {
        helperText.style.color = 'red';
    }
  }
  if (hasInvalidInputs) {
    const helperText = document.getElementById('empPhilhealthIDHelper');
    if (helperText) {
        helperText.style.color = 'red';
    }
  }
  if (hasInvalidInputs) {
    const helperText = document.getElementById('empSssIDHelper');
    if (helperText) {
        helperText.style.color = 'red';
    }
  }
  // For checking the minLength requirement for empPhonenum and empEMRGNCphonenum
  ['empPhonenum', 'empEMRGNCphonenum'].forEach(field => {
    const element = document.getElementsByName(field)[0];
    if (element) {
        element.style.borderColor = ''; // Reset border color
        element.style.borderWidth = ''; // Reset border width
        
        // Check if the value meets the minLength requirement
        if ((newEmployeeData[field] || '').trim().length < element.minLength) {
            hasInvalidInputs = true;
            element.style.borderColor = 'red'; // Set border color to red
            element.style.borderWidth = '2px'; // Set border width to 2px

            // Get the corresponding helper text element
            const helperTextId = `${field}Helper`;
            const helperText = document.getElementById(helperTextId);

            // Change the color of the helper text to red
            if (helperText) {
                helperText.style.color = 'red';
            }
        }
    }
  });

  // If any of empPhonenum or empEMRGNCphonenum fields doesn't meet the minLength requirement, display a message in the main helper text
  if (hasInvalidInputs) {
    const helperText = document.getElementById('empPhonenumHelper');
    if (helperText) {
        helperText.style.color = 'red';
    }
  }
 
    // If there are null values, display an alert and prevent navigation
    if (hasNullValues) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
        // Ensure the dial code is concatenated with the phone numbers
        const updatedPhoneNumber = newEmployeeData.dialCodePN + newEmployeeData.empPhonenum;
        const updatedEmergencyPhoneNumber = newEmployeeData.dialCodeEMRGNC + newEmployeeData.empEMRGNCphonenum;

        // Format the concatenated phone numbers
        const formattedPhoneNumber = parsePhoneNumber(updatedPhoneNumber);
        const formattedEmergencyPhoneNumber = parsePhoneNumber(updatedEmergencyPhoneNumber);

        // Update newEmployeeData with formatted phone numbers
        const updatedEmployeeData = {
            ...newEmployeeData,
            empPhonenum: formattedPhoneNumber,
            empEMRGNCphonenum: formattedEmergencyPhoneNumber,
            empTinID: `${newEmployeeData.empTinIDPart1} - ${newEmployeeData.empTinIDPart2} - ${newEmployeeData.empTinIDPart3} - ${newEmployeeData.empTinIDPart4}`,
            empHdmfID: `${newEmployeeData.empHdmfIDPart1} - ${newEmployeeData.empHdmfIDPart2} - ${newEmployeeData.empHdmfIDPart3}`,
            empPhilhealthID: `${newEmployeeData.empPhilhealthIDPart1} - ${newEmployeeData.empPhilhealthIDPart2} - ${newEmployeeData.empPhilhealthIDPart3}`,
            empSssID: `${newEmployeeData.empSssIDPart1} - ${newEmployeeData.empSssIDPart2} - ${newEmployeeData.empSssIDPart3}`,
          };

        // Perform create logic using an API call or other suitable method
        const response = await fetch('http://localhost:8000/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEmployeeData), // Use the updated data with formatted phone numbers
        });

        if (response.ok) {
            console.log('Creating new employee:', updatedEmployeeData);

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
        <div className='cm-content'>
          <div className='cm-1stcol'>
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
                        placeholder="e.g. Juan Dela Cruz"
                        maxLength={64}
                        value={newEmployeeData.empName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='cm-helptext-wrapper'>
                      <label id="empNameHelper" style={{ userSelect: 'none' }}>Enter your Full Name</label>
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
                    <div className='cm-helptext-wrapper'>
                      <label id="empBdayHelper" style={{ userSelect: 'none' }}>Enter your Birth Date</label>
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
                    <div className='cm-helptext-wrapper'>
                      <label id="empGenderHelper" style={{ userSelect: 'none' }}>Select your Gender</label>
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
                    <div className='cm-helptext-wrapper'>
                      <label id="empMaritalstatusHelper" style={{ userSelect: 'none' }}>Select your Marital Status</label>
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
                        onChange={handleDialCodeChange}
                      >
                        <option value="">Select Nationality</option>
                        {nationalities.map((nationality, index) => (
                          <option key={index} value={nationality}>{nationality}</option>
                        ))}
                      </select>
                    </div>
                    <div className='cm-helptext-wrapper'>
                      <label id="empNationalityHelper" style={{ userSelect: 'none' }}>Select your Nationality</label>
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
                        placeholder="e.g. Catholic"
                        maxLength={32}
                        value={newEmployeeData.empReligion}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='cm-helptext-wrapper'>
                      <label id="empReligionHelper" style={{ userSelect: 'none' }}>Enter your Religion</label>
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
                    placeholder='e.g. Bldg/Block, Street, District, City, Country, Postal Code/ZIP Code'
                    maxLength={255}
                    value={newEmployeeData.empHomeaddress}
                    onChange={handleInputChange}
                    rows={2} // Set the number of rows here
                    onInput={handleTextareaResize} // Handle resize
                    style={{ resize: allowResize ? 'both' : 'horizontal' }} // Control resize behavior
                  />
                </div>
                <div className='cm-helptext-wrapper'>
                  <label id="empHomeaddressHelper" style={{ userSelect: 'none' }}>Enter your Complete Address</label>
                </div>
              </div>
            </div>
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
                      <div className='cm-helptext-wrapper'>
                        <label id="empStatusHelper" style={{ userSelect: 'none' }}>Select your Employment Status</label>
                      </div>
                    </div>
                    <div className='cm-datafield-wrapper'>
                      <div className='cm-label-wrapper'>
                        <label>Position: </label>
                      </div>
                      <div className='cm-input-wrapper'>
                        <input 
                          className='cm-position'
                          type="text" 
                          name="empPosition" 
                          placeholder='e.g. Manager'
                          maxLength={64}
                          value={newEmployeeData.empPosition} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='cm-helptext-wrapper'>
                        <label id="empPositionHelper" style={{ userSelect: 'none' }}>Enter your Company Position</label>
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
                          placeholder='e.g. Example, Inc.'
                          maxLength={64}
                          value={newEmployeeData.empCompany} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='cm-helptext-wrapper'>
                        <label id="empCompanyHelper" style={{ userSelect: 'none' }}>Enter your Company Name</label>
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
                        className='cm-deptID'
                          type="text" 
                          name="empDeptID" 
                          value={newEmployeeData.empDeptID} 
                          readOnly 
                        />
                      </div>
                      <div className='cm-helptext-wrapper'>
                        <label id="empDeptIDHelper" style={{ userSelect: 'none' }}>Select your Department first</label>
                      </div>
                    </div>
                    <div className='cm-datafield-wrapper'>
                      <div className='cm-label-wrapper'>
                        <label>Department: </label>
                      </div>
                      <div className='cm-input-wrapper'>
                        <select className="cm-dept" name="empDept" value={newEmployeeData.empDept} 
                                onChange={handleDepartmentChange}>
                          <option value="">Select Department</option>
                          {departmentList.map((dept) => (
                            <option key={dept.deptID} value={dept.deptName}>
                              {`${dept.deptID} - ${dept.deptName}`}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='cm-helptext-wrapper'>
                        <label id="empDeptHelper" style={{ userSelect: 'none' }}>Select your Department Name</label>
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
                      <div className='cm-helptext-wrapper'>
                        <label id="empDateofhireHelper" style={{ userSelect: 'none' }}>Enter your Date of Hire</label>
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
                      placeholder='e.g. Bldg/Block, Street, District, City, Country, Postal Code/ZIP Code'
                      maxLength={255}
                      value={newEmployeeData.empCompanyaddress} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='cm-helptext-wrapper'>
                        <label id="empCompanyaddressHelper" style={{ userSelect: 'none' }}>Enter your Company Address</label>
                      </div>
                </div>
              </div>
          </div>
          <div className='cm-2ndcol'>
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
                        className='cm-dialcode1'
                        type="text"
                        name="dialCodePN"
                        value={`${newEmployeeData.dialCodePN} `}
                        readOnly
                        style={{ width: "60px" , borderRadius: '.25rem 0 0 .25rem', borderRight: '0px',}} // Adjust width as needed
                    />
                    <input
                      className='cm-phonenum'
                      type="text"
                      name="empPhonenum"
                      maxLength={10}
                      minLength={10}
                      placeholder="e.g. 9XXXXXXXXX"
                      value={newEmployeeData.empPhonenum}
                      onChange={handleDialCodeChange}
                      style={{ borderRadius: '0 .25rem .25rem 0',}}
                    />
                  </div>
                  <div className='cm-helptext-wrapper'>
                    <label id="empPhonenumHelper" style={{ userSelect: 'none' }}>Enter your 10-digit Phone Number</label>
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
                      placeholder="e.g. name@example.com"
                      maxLength={64}
                      value={newEmployeeData.empEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='cm-helptext-wrapper'>
                    <label id="empEmailHelper" style={{ userSelect: 'none' }}>Enter your Email Address</label>
                  </div>
                </div>
              </div>
            </div>
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
                      placeholder="e.g. Juan Dela Cruz"
                      value={newEmployeeData.empEMRGNCname} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='cm-helptext-wrapper'>
                    <label id="empEMRGNCnameHelper" style={{ userSelect: 'none' }}>Enter Contact Person's Name</label>
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
                      placeholder="Relationship"
                      value={newEmployeeData.empEMRGNCrelationship} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='cm-helptext-wrapper'>
                    <label id="empEMRGNCrelationshipHelper" style={{ userSelect: 'none' }}>Enter Contact Person's Relationship</label>
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
                        className='cm-dialcode2'
                        type="text"
                        name="dialCodeEMRGNC"
                        value={`${newEmployeeData.dialCodeEMRGNC} `}
                        readOnly
                        style={{ width: "60px" , borderRadius: '.25rem 0 0 .25rem', borderRight: '0px',}} // Adjust width as needed
                    />
                    <input
                      className='cm-EMRGNCphonenum'
                      type="text"
                      name="empEMRGNCphonenum"
                      placeholder="e.g. 9XXXXXXXXX"
                      maxLength={10}
                      minLength={10}
                      value={newEmployeeData.empEMRGNChonenum}
                      onChange={handleDialCodeChange}
                      style={{ borderRadius: '0 .25rem .25rem 0',}}
                    />
                  </div>
                  <div className='cm-helptext-wrapper'>
                    <label id="empEMRGNCphonenumHelper" style={{ userSelect: 'none' }}>Enter your 10-digit Phone Number</label>
                  </div>
                </div>
              </div>
            </div>
            </div>
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
                        name="empTinIDPart1" 
                        placeholder="000"
                        maxLength={3}
                        minLength={3}
                        value={newEmployeeData.empTinIDPart1} 
                        onChange={handleTinIDPart1Change}               
                        style={{ width: "25%"}}
                      />
                      <input 
                        type="text" 
                        name="empTinIDPart2" 
                        placeholder="000"
                        maxLength={3}
                        minLength={3}
                        value={newEmployeeData.empTinIDPart2} 
                        onChange={handleTinIDPart2Change}   
                        style={{ width: "25%"}}
                      />
                      <input 
                        type="text" 
                        name="empTinIDPart3" 
                        placeholder="000"
                        maxLength={3}
                        minLength={3}
                        value={newEmployeeData.empTinIDPart3} 
                        onChange={handleTinIDPart3Change}   
                        style={{ width: "25%"}}
                      />
                      <input 
                        type="text" 
                        name="empTinIDPart4" 
                        placeholder="000"
                        maxLength={3}
                        minLength={3}
                        value={newEmployeeData.empTinIDPart4} 
                        onChange={handleTinIDPart4Change}               
                        style={{ width: "25%"}}
                      />
                    </div>
                    <div className='cm-helptext-wrapper'>
                      <label id="empTinIDHelper" style={{ userSelect: 'none' }}>Complete your TIN ID number</label>
                    </div>
                  </div>
                  <div className='cm-datafield-wrapper'>
                    <div className='cm-label-wrapper'>
                      <label>HDMF ID: </label>
                    </div>
                    <div className='cm-input-wrapper'>
                      <input 
                        type="text" 
                        name="empHdmfIDPart1" 
                        placeholder="0000"
                        maxLength={4}
                        minLength={4}
                        value={newEmployeeData.empHdmfIDPart1} 
                        onChange={handleHdmfIDPart1Change}   
                        style={{ width: "34%"}}  
                      />
                      <input 
                        type="text" 
                        name="empHdmfIDPart2" 
                        placeholder="0000"
                        maxLength={4}
                        minLength={4}
                        value={newEmployeeData.empHdmfIDPart2} 
                        onChange={handleHdmfIDPart2Change}  
                        style={{ width: "34%"}}  
                      />
                      <input 
                        type="text" 
                        name="empHdmfIDPart3" 
                        placeholder="0000"
                        maxLength={4}
                        minLength={4}
                        value={newEmployeeData.empHdmfIDPart3} 
                        onChange={handleHdmfIDPart3Change}  
                        style={{ width: "33%"}}  
                      />  
                    </div>
                    <div className='cm-helptext-wrapper'>
                      <label id="empHdmfIDHelper" style={{ userSelect: 'none' }}>Complete your HDMF ID number</label>
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
                        name="empPhilhealthIDPart1"
                        placeholder="00"
                        maxLength={2} 
                        minLength={2} 
                        value={newEmployeeData.empPhilhealthIDPart1} 
                        onChange={handlePhilhealthIDPart1Change}  
                        style={{ width: "20%"}}  
                      />
                      <input 
                        type="text" 
                        name="empPhilhealthIDPart2" 
                        placeholder="00000000"
                        maxLength={8}
                        minLength={8} 
                        value={newEmployeeData.empPhilhealthIDPart2} 
                        onChange={handlePhilhealthIDPart2Change}  
                        style={{ width: "60%"}}  
                      />
                      <input 
                        type="text" 
                        name="empPhilhealthIDPart3" 
                        placeholder="00"
                        maxLength={2}
                        minLength={2} 
                        value={newEmployeeData.empPhilhealthIDPart3} 
                        onChange={handlePhilhealthIDPart3Change}  
                        style={{ width: "20%"}}  
                      />
                    </div>
                    <div className='cm-helptext-wrapper'>
                      <label id="empPhilhealthIDHelper" style={{ userSelect: 'none' }}>Complete your PhilHealth ID number</label>
                    </div>
                  </div>
                  <div className='cm-datafield-wrapper'>
                    <div className='cm-label-wrapper'>
                      <label>SSS ID: </label>
                    </div>
                    <div className='cm-input-wrapper'>
                      <input 
                        type="text" 
                        name="empSssIDPart1"
                        placeholder="00" 
                        maxLength={2}
                        minLength={2}
                        value={newEmployeeData.empSssIDPart1} 
                        onChange={handleSssIDPart1Change}  
                        style={{ width: "20%"}}  
                      />
                      <input 
                        type="text" 
                        name="empSssIDPart2" 
                        placeholder="00000000"
                        maxLength={8}
                        minLength={8}
                        value={newEmployeeData.empSssIDPart2} 
                        onChange={handleSssIDPart2Change}  
                        style={{ width: "60%"}}  
                      />
                      <input 
                        type="text" 
                        name="empSssIDPart3" 
                        placeholder="0"
                        maxLength={1}
                        minLength={1}
                        value={newEmployeeData.empSssIDPart3} 
                        onChange={handleSssIDPart3Change}  
                        style={{ width: "20%"}}  
                      />
                    </div>
                    <div className='cm-helptext-wrapper'>
                      <label id="empSssIDHelper" style={{ userSelect: 'none' }}>Complete your SSS ID number</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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