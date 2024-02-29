import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Modal from 'react-modal';
import './css/TableView.css'; // Import the stylesheet
import './css/EditModal.css'; // Import the stylesheet
import './css/CreateModal.css'; // Import the stylesheet
import './css/DetailsModal.css'; // Import the stylesheet
import './css/ExportModal.css'; // Import the stylesheet
import EditModal from './modal/EditModal.js'; // Import the EditModal component
import CreateModal from './modal/CreateModal.js'; // Import the CreateModal component
import DetailsModal from './modal/DetailsModal.js'; // Import the DetailsModal component
import ExportModal from './modal/ExportModal.js'; // Import the ExportModal component
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

Modal.setAppElement('#root'); // Set the root element for accessibility

const TableView = () => {
  const [headers, setHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(15);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [sortOption, setSortOption] = useState(''); // New state for sorting
  const [sortOrder, setSortOrder] = useState('asc'); // or 'desc' for descending
  const [sortColumn, setSortColumn] = useState('empName'); // set to the column you want to be initially sorted
  const [exportFormat, setExportFormat] = useState('');

  useEffect(() => {
    // Fetch employees from API
    axios.get('http://localhost:8000/api/employees')
      .then(response => {
        const employeesData = response.data;
        const firstEmployee = employeesData[0];

        // Set headers based on the keys of the first employee
        setHeaders(Object.keys(firstEmployee));

        // Set table data
        setTableData(employeesData);
        setFilteredTableData(employeesData);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []); // Add currentPage to the dependency array

  // Function to handle sorting based on the selected option
  const handleSort = (selectedOption) => {
    // Set the selected sort option and reset the sort order
    setSortOption(selectedOption);
    setSortOrder('asc'); // Set the default sort order, you can modify this as needed
  
    // Add a case for the new sorting option "deptID"
    switch (selectedOption) {
      case 'empName':
        setSortColumn('empName');
        break;
      case 'empDeptID':
        setSortColumn('empDeptID');
        break;
      // Add more cases for additional sorting options as needed
      default:
        setSortColumn(''); // Reset the sort column if an unknown option is selected
    }
  
    // Reset the current page to the first page when changing the sorting option
    setCurrentPage(1);
  };

  // Function to sort the data based on the current sorting option
  // Function to sort the data based on the current sorting option
  const sortedData = [...filteredTableData].sort((a, b) => {
    if (sortOption === 'empName') {
      // Sort alphabetically by empName
      return a[sortOption].localeCompare(b[sortOption]);
    } else if (sortOption === 'empDeptID') {
      // Sort by empDeptID (assuming it's a numerical value)
      return a[sortOption] - b[sortOption];
    }
    // Add more sorting options as needed
    return 0;
  });
  const parseDate = (excelSerialDate) => {
    if (!excelSerialDate) {
      // Handle empty or undefined dates
      return null;
    }
  
    // Excel serial date is the number of days since 1900-01-01
    const startDate = new Date('1899-12-30');
    const parsedDate = new Date(startDate);
    parsedDate.setDate(startDate.getDate() + excelSerialDate);
  
    // Format the date as YYYY-MM-DD
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
  
    return `${year}-${month}-${day}`;
  };
  
  const handleSave = async () => {
    try {
      // Check if a file has been uploaded
      if (!fileUploaded) {
        // Display an alert or take appropriate action when no file is uploaded
        alert('Please upload a file before saving.');
        return;
      }
      // Your existing code for saving data to the database
      const response = await fetch('http://localhost:8000/api/employees/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableData }),
      });

      if (response.ok) {
        console.log('Table data saved successfully');

        // Display an alert after successfully saving the data
        window.alert('Employee saved successfully');

        // Reset state after saving
        setHeaders([]);
        setTableData([]);
        setFileUploaded(false); // Reset fileUploaded state

        // Fetch updated data from API
        const updatedResponse = await fetch('http://localhost:8000/api/employees');
        const updatedData = await updatedResponse.json();

        // Set headers based on the keys of the first employee
        const firstEmployee = updatedData[0];
        setHeaders(Object.keys(firstEmployee));

        // Set table data
        setTableData(updatedData);
        setFilteredTableData(updatedData); // Update filtered data
        console.log('File save successful');
      } else {
        console.error('Failed to save table data');
      }
    } catch (error) {
      console.error('Error saving or fetching table data', error);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/employees/${updatedData.empID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log('Employee updated successfully');

        // Fetch updated data from API
        const updatedResponse = await fetch('http://localhost:8000/api/employees');
        const updatedData = await updatedResponse.json();

        // Update tableData and filteredTableData
        setTableData(updatedData);
        setFilteredTableData(updatedData);
      } else {
        console.error('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
        // Assuming the first row contains headers
        const sheetHeaders = jsonData[0];
        const dataRows = jsonData.slice(1);
  
        const formattedData = dataRows.map((row) =>
          sheetHeaders.reduce((obj, key, index) => {
            if (key === 'empSalary') {
              // Check if the value is a string before applying replace
              obj[key] =
                typeof row[index] === 'string'
                  ? parseFloat(row[index].replace(/,/g, '')).toFixed(2)
                  : row[index];
            } else if (key === 'empBday') {
              obj[key] = parseDate(row[index]);
            } else {
              obj[key] = row[index];
            }
            return obj;
          }, {})
        );
  
        setHeaders(sheetHeaders);
  
        const nonEmptyRows = formattedData.filter((row) =>
          Object.values(row).some((cell) => cell !== undefined && cell !== null && cell !== "")
        );
  
        setTableData(nonEmptyRows);
        setFilteredTableData(nonEmptyRows); // Update filtered data
  
        // Update the fileUploaded state with the selected file
        setFileUploaded(selectedFile);
        console.log('fileUploaded:', selectedFile);
      };
  
      reader.readAsArrayBuffer(selectedFile);
    }
  };
  
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };
  
  const handleDelete = async (empID) => {
    // Show a confirmation dialog before proceeding with deletion
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    
    // If the user confirms deletion, proceed with the deletion process
    if (confirmDelete) {
      try {
        // Make an API call to delete the employee with the specified empID
        const response = await fetch(`http://localhost:8000/api/employees/${empID}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log(`Employee with empID ${empID} deleted successfully`);

          window.alert('Employee deleted successfully');
          // Fetch updated data from API
          const updatedResponse = await fetch('http://localhost:8000/api/employees');
          const updatedData = await updatedResponse.json();

          // Update tableData and filteredTableData
          setTableData(updatedData);
          setFilteredTableData(updatedData);
        } else {
          console.error(`Failed to delete employee with empID ${empID}`);
        }
      } catch (error) {
        console.error('Error deleting employee', error);
      }
    }
  };

  const closeEditModal = () => {
    setSelectedEmployee(null);
    setIsEditModalOpen(false);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleDetails = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailsModalOpen(true);
  };

  const exportToCSV = () => {
    const sortedData = [...filteredTableData].sort((a, b) => {
      const aValue = String(a[sortColumn]);
      const bValue = String(b[sortColumn]);
  
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
      } else {
        return bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
      }
    });
  
    const csvData = [headers.join(',')]; // Include headers in CSV
  
    sortedData.forEach((row) => {
      const rowData = headers.map((header) => String(row[header]));
      csvData.push(Object.values(rowData).join(','));
    });
  
    const blob = new Blob([csvData.join('\n')], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, 'employee_data.csv');
  };
  
  const exportToXLSX = () => {
    const sortedData = [...filteredTableData].sort((a, b) => {
      const aValue = String(a[sortColumn]);
      const bValue = String(b[sortColumn]);
  
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
      } else {
        return bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
      }
    });
  
    const ws = XLSX.utils.json_to_sheet(sortedData, { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'employee_data.xlsx');
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(filteredTableData.length / rowsPerPage);

  // Define currentRows here
  const currentRows = filteredTableData.slice(indexOfFirstRow, indexOfLastRow);

  // Render table rows
  const renderTableRows = () => {
    // Filter the entire dataset based on the search term
    const filteredData = sortedData
  .filter((row) => {
    const isMatchingDeptID = row['empDeptID'] && row['empDeptID'].toString().toLowerCase().includes(searchTerm.toLowerCase());
    const isMatchingDeptName =
      row['empDeptName'] && row['empDeptName'].toString().toLowerCase().includes(searchTerm.toLowerCase());

    return (
      Object.values(row).some(
        (cell) =>
          cell !== undefined &&
          cell !== null &&
          cell !== '' &&
          (sortOption === '' ||
            ((sortOption === 'empDeptID' || sortOption === 'empDeptName') &&
              (isMatchingDeptID || isMatchingDeptName)) ||
            (sortOption === 'empID' && row['empID'] && row['empID'].toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row[sortOption] !== undefined &&
              row[sortOption] !== null &&
              row[sortOption].toString().toLowerCase().includes(searchTerm.toLowerCase()))
          )
      )
    );
  })
  .sort((a, b) => {
    if (sortOption === 'empName') {
      // Sort alphabetically by empName
      return a[sortOption].localeCompare(b[sortOption]);
    } else if (sortOption === 'empDeptID') {
      // Sort by empDeptID (assuming it's a numerical value)
      return a[sortOption] - b[sortOption];
    } else if (sortOption === 'empID') {
      // Sort by empID (assuming it's a numerical value)
      return a[sortOption] - b[sortOption];
    }
    // Add more sorting options as needed
    return 0;
  });
    // Apply pagination to the filtered data
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return paginatedData.map((row, index) => (
      <tr key={index} onClick={() => handleDetails(row)}>
        {headers.map((header) => (
          <td key={header}>{row[header]}</td>
        ))}
        <td>
          <button className="tv-editbtn" onClick={(e) => { e.stopPropagation(); handleEdit(row) }}>
            Edit
          </button>
          <button className="tv-deletebtn" onClick={(e) => { e.stopPropagation(); handleDelete(row.empID) }}>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="table-container">
      <div className='tv-action'>
        <div className='tv-heading'>
          <h2>Employee Directory</h2>
        </div>

        <div className='tv-body'>
          <div className='tv-body-filter'>
            <div className='tv-action-sort'>
              <label htmlFor="sortDropdown"></label>
              <select
                id="sortDropdown"
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
              >              
                <option value="">Select Filter</option>
                <option value="empID">Employee ID</option>
                <option value="empName">Employee Name</option>
                <option value="empDeptID">Department</option>
                {/* Add more sorting options as needed */}
              </select>
            </div>
            <div className='tv-action-search'>
              <input
              className='styled-search'
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset the current page to the first page when performing a new search
                }}
              />
            </div>
          </div>
<         div className='tv-body-maintenance'>
            <div className='tv-action-create'>
                <button className="tv-createbtn" onClick={() => setIsCreateModalOpen(true)}>
                <i className="fas fa-plus"></i>&nbsp;&nbsp;Add Employee
                </button>
            </div>
            <div className='tv-action-export'>
              <button className="tv-exportbtn" onClick={exportToCSV}>
              <i class="fa-solid fa-file-csv"></i>&nbsp;&nbsp;Export to CSV
              </button>
              <button className="tv-exportbtn" onClick={exportToXLSX}>
              <i class="fa-solid fa-file-excel"></i>&nbsp;&nbsp;Export to XLSX
              </button>
            </div>
          </div>
          <div className='tv-body-upload'>
            <div className='tv-action-upload custom-file-container'>
                <label htmlFor="fileInput" className="custom-file-button">
                    <i className="fa-solid fa-upload"></i>&nbsp;&nbsp;Choose File
                </label>
                <input type="file" id="fileInput" onChange={handleFileChange} />
                {fileUploaded && (
                    <span className="custom-file-name">{fileUploaded.name}</span>
                )}
                {fileUploaded && (
                    <button className="custom-save-button" onClick={handleSave}>
                    <i className="fa-solid fa-floppy-disk"></i>&nbsp;&nbsp;Save to Database
                    </button>
                )}
            </div>
          </div>
        </div>
      </div>
  
      {tableData.length > 0 && (
        <table className="styled-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      )}

      {/* Pagination buttons */}
      <div className='tableview-pagination'>
        <button className="btn-firstpage" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          <i className="fa-solid fa-backward-fast"></i>
        </button>
        <button className="btn-prevpage" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <span className='pagination-indicator'>{`${currentPage} of ${totalPages}`}</span>
        <button className="btn-nextpage" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastRow >= filteredTableData.length}>
          <i className="fa-solid fa-caret-right"></i>
        </button>
        <button className="btn-lastpage" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          <i className="fa-solid fa-forward-fast"></i>
        </button>
      </div>

      {isEditModalOpen && (
        <div className="edit-modal-overlay">
          <EditModal employee={selectedEmployee} onUpdate={handleUpdate} onClose={() => {setIsEditModalOpen(false); setSelectedEmployee({});}} />
        </div>
      )}
      {isCreateModalOpen && (
        <div className="create-modal-overlay">
          <CreateModal onClose={() => setIsCreateModalOpen(false)} />
        </div>
      )}
      {isDetailsModalOpen && (
        <div className="details-modal-overlay">
          <DetailsModal employee={selectedEmployee} onClose={() => setIsDetailsModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default TableView;