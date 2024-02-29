import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import '../css/ExportModal.css'; // Import the stylesheet

const ExportModal = ({ isOpen, onClose, data }) => {
  const exportToCSV = () => {
    const csvData = data.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, 'employee_data.csv');
    onClose();
  };

  const exportToXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'employee_data.xlsx');
    onClose();
  };

  return (
    <div className={`export-modal ${isOpen ? 'open' : ''}`}>
      <div className="export-content">
        <button className="export-btn" onClick={exportToCSV}>
          Export to CSV
        </button>
        <button className="export-btn" onClick={exportToXLSX}>
          Export to XLSX
        </button>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ExportModal;
