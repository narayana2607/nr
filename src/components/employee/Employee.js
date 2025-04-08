import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import 'jspdf-autotable';

import Modal from "react-modal";
import "./Employee.css";

Modal.setAppElement("#root");

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    hire_date: "",
    job_title: "",
    department: "",
  });
  const [editEmployee, setEditEmployee] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    hire_date: "",
    job_title: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Error fetching employees");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (
      !newEmployee.first_name ||
      !newEmployee.last_name ||
      !newEmployee.email ||
      !newEmployee.hire_date ||
      !newEmployee.job_title ||
      !newEmployee.department
    ) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const addOrEditEmployee = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      for (const key in newEmployee) {
        if (key === "hire_date" && newEmployee[key]) {
          formData.append(key, newEmployee[key].split("T")[0]);
        } else {
          formData.append(key, newEmployee[key]);
        }
      }
      if (profilePic) {
        formData.append("profile_pic", profilePic);
      }

      if (editEmployee) {
        await axios.put(
          `http://localhost:3001/employees/${editEmployee.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Employee updated successfully");
      } else {
        await axios.post("http://localhost:3001/employees", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Employee added successfully");
      }

      fetchEmployees();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding/editing employee:", error);
      alert(
        `Error: ${error.response?.data?.error || "Error processing request"}`
      );
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3001/employees/${id}`);
      alert("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee");
    }
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const resetForm = () => {
    setNewEmployee({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      hire_date: "",
      job_title: "",
      department: "",
    });
    setProfilePic(null);
    setEditEmployee(null);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Details", 10, 10);
    let y = 20;
    employees.forEach((employee) => {
      doc.text(
        `Name: ${employee.first_name} ${employee.last_name}\nEmail: ${employee.email}\nPhone: ${employee.phone_number}\nJob: ${employee.job_title}\nDepartment: ${employee.department}`,
        10,
        y
      );
      y += 40;
    });
    doc.save("employees.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      employees.map((employee) => ({
        Name: `${employee.first_name} ${employee.last_name}`,
        Email: employee.email,
        Phone: employee.phone_number,
        "Hire Date": employee.hire_date,
        Job: employee.job_title,
        Department: employee.department,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "employees.xlsx"); 
  };



  // payslip
  
  const generatePayslip = async (employee) => {
    const doc = new jsPDF();
  
    // Add Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Pay Stub", 10, 20);
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("NNR Pvt Ltd", 150, 20, { align: "right" });
  
    // Add Profile Picture
    const imgWidth = 40;
    const imgHeight = 40;
    const imgX = 150;
    const imgY = 30;
  
    try {
      const profilePicUrl = `http://localhost:3000${employee.profile_pic}`;
      const imageResponse = await fetch(profilePicUrl);
      if (!imageResponse.ok) {
        throw new Error("Profile picture not found");
      }
      const imageBlob = await imageResponse.blob();
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64data = reader.result;
        doc.addImage(base64data, "JPEG", imgX, imgY, imgWidth, imgHeight);
  
        // Continue generating the rest of the payslip
        generatePayslipContent(doc, employee);
      };
  
      reader.readAsDataURL(imageBlob);
    } catch (error) {
      console.error("Error loading profile picture:", error);
          console.error("Error adding profile picture:", error);

  
      // Generate payslip without profile picture
      generatePayslipContent(doc, employee);
    }
  };
  
  const generatePayslipContent = (doc, employee) => {
    // Employee Details
    doc.setFont("helvetica", "bold");
    doc.text(`Employee Name:`, 10, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`${employee.first_name} ${employee.last_name}`, 50, 40);
  
    doc.setFont("helvetica", "bold");
    doc.text(`Employee ID:`, 10, 50);
    doc.setFont("helvetica", "normal");
    doc.text(`${employee.id}`, 50, 50);
  
    doc.setFont("helvetica", "bold");
    doc.text(`Pay Period:`, 10, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`01/01/2025 - 31/01/2025`, 50, 60);
  
    doc.setFont("helvetica", "bold");
    doc.text(`Pay Date:`, 10, 70);
    doc.setFont("helvetica", "normal");
    doc.text(`05/02/2025`, 50, 70);
  
    // Earnings Table
    doc.setFont("helvetica", "bold");
    doc.text("Earnings", 10, 90);
  
    const earnings = [
      ["Description", "Hours Worked", "Rate", "Amount"],
      ["Regular Pay", "160", "₹500", "₹80,000"],
      ["Overtime Pay", "10", "₹750", "₹7,500"],
      ["Bonus", "-", "-", "₹5,000"],
    ];
  
    doc.autoTable({
      head: [earnings[0]],
      body: earnings.slice(1),
      startY: 95,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 128, 128] },
    });
  
    // Total Earnings
    const totalEarningsY = doc.lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Earnings: ₹92,500`, 10, totalEarningsY);
  
    // Deductions Table
    const deductionsY = totalEarningsY + 10;
    doc.setFont("helvetica", "bold");
    doc.text("Deductions", 10, deductionsY);
  
    const deductions = [
      ["Description", "Amount"],
      ["Federal Tax", "₹10,000"],
      ["State Tax", "₹2,500"],
      ["Social Security", "₹5,000"],
      ["Medicare", "₹1,500"],
      ["Health Insurance", "₹2,000"],
      ["Retirement Contribution", "₹3,000"],
    ];
  
    doc.autoTable({
      head: [deductions[0]],
      body: deductions.slice(1),
      startY: deductionsY + 5,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 128, 128] },
    });
  
    // Total Deductions and Net Pay
    const totalDeductionsY = doc.lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Deductions: ₹24,000`, 10, totalDeductionsY);
  
    const netPayY = totalDeductionsY + 10;
    doc.text(`Net Pay (Take Home): ₹68,500`, 10, netPayY);
  
    // Footer
    const footerY = netPayY + 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "This is a system-generated payslip. For any discrepancies, contact HR.",
      10,
      footerY
    );
    
  
    // Save PDF
    doc.save(`Payslip_${employee.first_name}_${employee.last_name}.pdf`);
  };
  

  const filteredEmployees = employees
    .filter((employee) =>
      (employee.first_name?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (employee.last_name?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (employee.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    )
    .filter(
      (employee) =>
        (!filters.job_title || employee.job_title === filters.job_title) &&
        (!filters.department || employee.department === filters.department)
    );

  return (
    <div className="App">
      <div className="emp">
        <p>Employee Info Management</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <input
          type="date"
          name="hire_date"
          value={filters.hire_date}
          onChange={handleFilterChange}
          placeholder="Filter by hire date"
        />
        <input
          type="text"
          name="job_title"
          value={filters.job_title}
          onChange={handleFilterChange}
          placeholder="Filter by role"
        />
        <input
          type="text"
          name="department"
          value={filters.department}
          onChange={handleFilterChange}
          placeholder="Filter by department"
        />
      </div>

      <button className="btn primary" onClick={() => setIsModalOpen(true)}>
        Add Employee
      </button>
      <button className="btn secondary" onClick={downloadPDF}>
        Download PDF
      </button>
      <button className="btn secondary" onClick={downloadExcel}>
        Download Excel
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add/Edit Employee"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>{editEmployee ? "Edit Employee" : "Add New Employee"}</h2>
        <div className="employee-form">
          <input
            type="text"
            placeholder="First Name"
            value={newEmployee.first_name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, first_name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newEmployee.last_name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, last_name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newEmployee.phone_number}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone_number: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="Hire Date"
            value={newEmployee.hire_date}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, hire_date: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Job Title"
            value={newEmployee.job_title}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, job_title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Department"
            value={newEmployee.department}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, department: e.target.value })
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
          <button className="btn primary" onClick={addOrEditEmployee}>
            {editEmployee ? "Save Changes" : "Add Employee"}
          </button>
          <button
            className="btn secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="employee-list">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="employee-card">
              {employee.profile_pic ? (
                <img
                  src={`http://localhost:3001${employee.profile_pic}`}
                  alt="Profile"
                  className="profile-pic"
                />
              ) : (
                <div className="default-profile">No Image</div>
              )}
              <p>
                <strong>Name:</strong> {employee.first_name} {employee.last_name}
              </p>
              <p>
                <strong>Email:</strong> {employee.email}
              </p>
              <p>
                <strong>Phone:</strong> {employee.phone_number}
              </p>
              <p>
                <strong>Hire Date:</strong> {employee.hire_date}
              </p>
              <p>
                <strong>Job:</strong> {employee.job_title}
              </p>
              <p>
                <strong>Department:</strong> {employee.department}
              </p>
              <div className="button-group">
                <button
                  className="btn secondary"
                  onClick={() => {
                    setNewEmployee(employee);
                    setEditEmployee(employee);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn danger"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  Delete
                </button>
                <button
                  className="btn secondary"
                  onClick={() => generatePayslip(employee)}
                >
                   Payslip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Employee;
