// Existing imports...
import Swal from 'sweetalert2';
import './ExcelSheet.css';
import axios from 'axios';
import * as XLSX from 'xlsx';
import React, { useState, useRef, useEffect } from 'react';

function ExcelSheet() {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [originalFileName, setOriginalFileName] = useState('');
  const fileInputRef = useRef(null);

  // Handle Excel File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setOriginalFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet);

      setData(excelData);
      setShowOverlay(true);
    };

    reader.readAsBinaryString(file);
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName || 'downloaded_data.xlsx');
  };

  const handleAddRow = () => {
    const newRow = {};
    getColumnNames().forEach((col) => (newRow[col] = ''));
    setData([...data, newRow]);
  };

  const handleAddColumn = () => {
    const newColumnName = prompt('Enter Column Name');
    if (!newColumnName) return;

    const updatedData = data.map((row) => ({
      ...row,
      [newColumnName]: '',
    }));

    setData(updatedData);
  };

  const handleChange = (rowIndex, colName, value) => {
    const newData = [...data];
    newData[rowIndex][colName] = value;
    setData(newData);
  };

  const handleSaveToDB = async () => {
    try {
      const { value: saveOption } = await Swal.fire({
        title: 'Save File',
        text: `Do you want to save with the same file name (${originalFileName}) or a new file name?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Save as "${originalFileName}"`,
        cancelButtonText: 'Save as new file',
      });

      let saveFileName = originalFileName;

      if (!saveOption) {
        const { value: customFileName } = await Swal.fire({
          title: 'Enter New File Name',
          input: 'text',
          inputPlaceholder: 'Enter file name...',
          showCancelButton: true,
        });

        if (!customFileName) {
          Swal.fire('Cancelled', 'Save operation was cancelled', 'info');
          return;
        }

        saveFileName = customFileName;
      }

      setFileName(saveFileName);

      await axios.post('http://localhost:3001/uploadExcelData', {
        fileName: saveFileName,
        data,
      });

      Swal.fire('Success', 'Data saved to database', 'success');
      fetchUploadedFiles();
    } catch (error) {
      console.error('Error saving data:', error);
      Swal.fire('Error', 'Failed to save data to database', 'error');
    }
  };

  // NEW: Delete File
  const handleDeleteFile = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      });

      if (confirm.isConfirmed) {
        await axios.delete(`http://localhost:3001/files/${id}`);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        fetchUploadedFiles();
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      Swal.fire('Error', 'Failed to delete file', 'error');
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/files');
      setUploadedFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleViewFile = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/files/${id}`);

      setFileName(response.data.file_name);
      setOriginalFileName(response.data.file_name);

      const fileData = response.data.data;

      const allKeys = Array.from(
        new Set(fileData.flatMap((row) => Object.keys(row)))
      );

      const normalizedData = fileData.map((row) => {
        const normalizedRow = {};
        allKeys.forEach((key) => {
          normalizedRow[key] = row[key] || '';
        });
        return normalizedRow;
      });

      setData(normalizedData);
      setShowOverlay(true);
    } catch (error) {
      console.error('Error viewing file:', error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const getColumnNames = () => {
    if (data.length === 0) return [];
    const uniqueColumns = new Set();
    data.forEach((row) => {
      Object.keys(row).forEach((key) => uniqueColumns.add(key));
    });
    return Array.from(uniqueColumns);
  };

  const columnNames = getColumnNames();

  return (
    <div className="excel-container">
      {!showOverlay && (
        <>
          <div className="file-controls">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              id="fileInput"
              className="file-input"
            />
            <label htmlFor="fileInput" className="upload-button">
              Choose File
            </label>
          </div>

          <div className="uploaded-files">
            <h3>Uploaded Files:</h3>
            <ul>
              {uploadedFiles.map((file) => (
                <li key={file.id}>
                  {file.file_name}
                  <button onClick={() => handleViewFile(file.id)}>View</button>
                  <button onClick={() => handleDeleteFile(file.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-buttons fixed-buttons">
              <button className="close-overlay" onClick={() => setShowOverlay(false)}>Close</button>
              <button onClick={handleDownload}>Download</button>
              <button onClick={handleAddRow}>Add Row</button>
              <button onClick={handleAddColumn}>Add Column</button>
              <button onClick={handleSaveToDB}>Save to DB</button>
            </div>

            <div className="table-responsive">
              <table className="excel-table">
                <thead>
                  <tr>
                    {columnNames.map((colName, index) => (
                      <th key={index}>{colName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columnNames.map((colName, colIndex) => (
                        <td key={colIndex}>
                          <input
                            type="text"
                            value={row[colName] || ''}
                            onChange={(e) =>
                              handleChange(rowIndex, colName, e.target.value)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExcelSheet;
