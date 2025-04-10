// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import 'react-toastify/dist/ReactToastify.css';
import './StudentInfo.css';

// // Define initial empty form state for resetting
// const initialFormData = {
//   name: '',
//   sevisId: '',
//   dob: '',
//   phoneNumber: '',
//   email: '',
//   address: '',
//   country: '',
//   visaType: '',
//   visaStatus: '',
//   universityName: '',
//   universityAddress: '',
//   job: '',
//   experience: '',
//   companyName: '',
// };

// const StudentInfo = () => {
//   const [students, setStudents] = useState([]);
//   const [formData, setFormData] = useState(initialFormData);
//   const [profilePic, setProfilePic] = useState(null);
//   const [supportingDocs, setSupportingDocs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingStudent, setEditingStudent] = useState(null);
//   const [viewingStudent, setViewingStudent] = useState(null);
//   const BASE_URL = 'http://localhost:3001';

//   // --- Core Functions (define before dependent functions) ---

//   const fetchStudents = useCallback(async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/studentinfo`);
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Failed to fetch student data:', error); // Log error for debugging
//       toast.error('Failed to fetch student data.');
//     }
//   }, [BASE_URL]);

//   // Defined closeModal *before* handleSave which uses it as a dependency
//   const closeModal = useCallback(() => {
//     setIsModalOpen(false);
//     setEditingStudent(null);
//     setFormData(initialFormData); // Reset form to initial state
//     setProfilePic(null);          // Reset profile picture
//     setSupportingDocs([]);        // Reset supporting documents
//   }, []); // No dependencies needed as setters are stable

//   const openModal = useCallback((student = null) => {
//     setEditingStudent(student);
//     // Populate form data if editing, otherwise use initial state
//     setFormData({
//       name: student?.name || '',
//       sevisId: student?.sevisId || '',
//       dob: student?.dob ? new Date(student.dob).toISOString().split('T')[0] : '',
//       phoneNumber: student?.phoneNumber || '',
//       email: student?.email || '',
//       address: student?.address || '',
//       country: student?.country || '',
//       visaType: student?.visaType || '',
//       visaStatus: student?.visaStatus || '',
//       universityName: student?.universityName || '',
//       universityAddress: student?.universityAddress || '',
//       job: student?.job || '',
//       experience: student?.experience || '',
//       companyName: student?.companyName || '',
//     });
//     setProfilePic(null); // Always reset file inputs when opening modal
//     setSupportingDocs([]);
//     setIsModalOpen(true);
//     setViewingStudent(null); // Close view modal if add/edit is opened
//   }, []); // No dependencies needed

//   // --- Dependent Functions ---

//   const handleSave = useCallback(async () => {
//     const data = new FormData();
//     // Ensure all keys from initialFormData are present, even if empty
//     for (const key in initialFormData) {
//        data.append(key, formData[key] || '');
//     }

//     if (profilePic) data.append('profilePic', profilePic);
//     if (supportingDocs) {
//       for (let i = 0; i < supportingDocs.length; i++) {
//         data.append('supportingDocs', supportingDocs[i]);
//       }
//     }

//     try {
//       if (editingStudent) {
//         await axios.put(`${BASE_URL}/studentinfo/${editingStudent.id}`, data, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         toast.success('Student data updated successfully!');
//       } else {
//         await axios.post(`${BASE_URL}/studentinfo`, data, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         toast.success('Student data saved successfully!');
//       }
//       fetchStudents(); // Refresh list
//       closeModal();    // Close modal after save (NOW DECLARED ABOVE)
//     } catch (error) {
//       console.error('Failed to save student data:', error); // Log error
//        // Provide more specific error if possible from response
//       const errorMsg = error.response?.data?.message || 'Failed to save student data.';
//       toast.error(errorMsg);
//     }
//   }, [BASE_URL, editingStudent, formData, profilePic, supportingDocs, fetchStudents, closeModal]); // closeModal is now valid here

//   const handleDelete = useCallback(async (id) => {
//     if (window.confirm('Are you sure you want to delete this student?')) {
//       try {
//         await axios.delete(`${BASE_URL}/studentinfo/${id}`);
//         toast.success('Student data deleted successfully!');
//         fetchStudents(); // Refresh list
//         if (viewingStudent?.id === id) {
//            setViewingStudent(null); // Close view modal if deleted student was being viewed
//         }
//       } catch (error) {
//         console.error('Failed to delete student data:', error); // Log error
//         toast.error('Failed to delete student data.');
//       }
//     }
//   }, [BASE_URL, fetchStudents, viewingStudent?.id]); // Added viewingStudent.id dependency

//   // --- useEffect Hook ---

//   useEffect(() => {
//     fetchStudents();
//   }, [fetchStudents]); // Run once on mount and if fetchStudents changes (it won't due to useCallback)

//   // --- Other Event Handlers ---

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     if (e.target.name === 'profilePic') {
//       setProfilePic(e.target.files[0]);
//     } else {
//       setSupportingDocs(Array.from(e.target.files)); // Ensure it's an array
//     }
//   };

//    const handleView = (student) => {
//      setViewingStudent(student);
//      setIsModalOpen(false); // Close edit/add modal if view is opened
//    };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//   };

//   // --- Filtering Logic ---
//   const filteredStudents = students.filter((student) =>
//     Object.values(student).some((value) =>
//       value?.toString().toLowerCase().includes(searchTerm)
//     )
//   );

//   // --- JSX Return ---
//   return (
//     <div className="student-info">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//       <div className="stu">
//         <p>Student Info Management</p>
//       </div>

//       <button className="add-student-btn" onClick={() => openModal()}>
//         Add New Student
//       </button>
//       <input
//         type="text"
//         placeholder="Search all columns..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className="search-input"
//       />

//       <table>
//         <thead>
//           <tr>
//             <th>Profile Picture</th>
//             <th>Name</th>
//             <th>SEVIS ID</th>
//             <th>Phone Number</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Country</th>
//             <th>Visa Type</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredStudents.map((student) => (
//             <tr key={student.id}>
//               <td>
//                 {student.profilePic ? (
//                   <img
//                     src={`${BASE_URL}/${student.profilePic}`}
//                     alt={`${student.name}'s profile`} // Better alt text
//                     style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} // Added border radius
//                   />
//                 ) : (
//                   <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666' }}>No Pic</div> // Placeholder style
//                 )}
//               </td>
//               <td>{student.name}</td>
//               <td>{student.sevisId}</td>
//               <td>{student.phoneNumber}</td>
//               <td>{student.email}</td>
//               <td>{student.address}</td>
//               <td>{student.country}</td>
//               <td>{student.visaType}</td>
//               <td>
//                 <FontAwesomeIcon
//                   icon={faEdit}
//                   className="action-icon edit-icon" // Use classes for styling
//                   onClick={() => openModal(student)}
//                   title="Edit"
//                 />
//                 <FontAwesomeIcon
//                   icon={faTrash}
//                   className="action-icon delete-icon" // Use classes for styling
//                   onClick={() => handleDelete(student.id)}
//                   title="Delete"
//                 />
//                 <button
//                   className="view-btn action-button" // Use classes for styling
//                   onClick={() => handleView(student)}
//                   title="View"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* View Student Details Modal */}
//       {viewingStudent && (
//         <div className="modal-overlay" onClick={() => setViewingStudent(null)}> {/* Close on overlay click */}
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside modal */}
//             <div className="modal-header">
//               <h2>Student Details</h2>
//               <button
//                 className="close-modal"
//                 onClick={() => setViewingStudent(null)}
//                 title="Close"
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="modal-body view-details"> {/* Specific class for view */}
//               {viewingStudent.profilePic && (
//                   <img
//                     src={`${BASE_URL}/${viewingStudent.profilePic}`}
//                     alt={`${viewingStudent.name}'s profile`}
//                     style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginBottom: '15px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
//                   />
//                 )}
//               <p><strong>Name:</strong> {viewingStudent.name}</p>
//               <p><strong>SEVIS ID:</strong> {viewingStudent.sevisId}</p>
//               <p><strong>DOB:</strong> {viewingStudent.dob ? new Date(viewingStudent.dob).toLocaleDateString() : 'N/A'}</p> {/* Format Date */}
//               <p><strong>Phone Number:</strong> {viewingStudent.phoneNumber}</p>
//               <p><strong>Email:</strong> {viewingStudent.email}</p>
//               <p><strong>Address:</strong> {viewingStudent.address}</p>
//               <p><strong>Country:</strong> {viewingStudent.country}</p>
//               <p><strong>Visa Type:</strong> {viewingStudent.visaType}</p>
//               <p><strong>Visa Status:</strong> {viewingStudent.visaStatus}</p>
//               <p><strong>University Name:</strong> {viewingStudent.universityName}</p>
//               <p><strong>University Address:</strong> {viewingStudent.universityAddress}</p>
//               <p><strong>Job:</strong> {viewingStudent.job}</p>
//               <p><strong>Experience:</strong> {viewingStudent.experience}</p>
//               <p><strong>Company Name:</strong> {viewingStudent.companyName}</p>
//               {viewingStudent.supportingDocs && viewingStudent.supportingDocs.length > 0 && (
//                 <div>
//                     <strong>Supporting Documents:</strong>
//                     <ul>
//                         {viewingStudent.supportingDocs.map((doc, index) => (
//                           <li key={index}>
//                             <a
//                               href={`${BASE_URL}/${doc}`}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               {/* Extract filename */}
//                               {doc.split('/').pop()}
//                             </a>
//                           </li>
//                         ))}
//                     </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add/Edit Student Modal */}
//       {isModalOpen && (
//         <div className="modal-overlay" onClick={closeModal}> {/* Close on overlay click */}
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside modal */}
//             <div className="modal-header">
//               <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
//               <button className="close-modal" onClick={closeModal} title="Close">
//                 &times;
//               </button>
//             </div>
//             <div className="modal-body form-fields"> {/* Specific class for form */}
//               {/* Consider grouping fields logically, e.g., Personal, Contact, Visa, Work */}
//                <div className="form-grid"> {/* Use CSS Grid or Flexbox for layout */}
//                  <div><label>NAME:</label><input type="text" name="name" placeholder="Name" value={formData.name || ''} onChange={handleInputChange} required/></div>
//                  <div><label>SEVIS ID:</label><input type="text" name="sevisId" placeholder="SEVIS ID" value={formData.sevisId || ''} onChange={handleInputChange}/></div>
//                  <div><label>DATE OF BIRTH:</label><input type="date" name="dob" value={formData.dob || ''} onChange={handleInputChange}/></div>
//                  <div><label>PHONE NO:</label><input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber || ''} onChange={handleInputChange}/></div> {/* Use type="tel" */}
//                  <div><label>EMAIL:</label><input type="email" name="email" placeholder="Email" value={formData.email || ''} onChange={handleInputChange} required/></div>
//                  <div><label>ADDRESS:</label><input type="text" name="address" placeholder="Address" value={formData.address || ''} onChange={handleInputChange}/></div>
//                  <div><label>COUNTRY:</label><input type="text" name="country" placeholder="Country" value={formData.country || ''} onChange={handleInputChange}/></div>
//                  <div><label>VISA TYPE:</label><input type="text" name="visaType" placeholder="Visa Type (e.g., F1, H1B)" value={formData.visaType || ''} onChange={handleInputChange}/></div>
//                  <div><label>VISA STATUS:</label><input type="text" name="visaStatus" placeholder="Visa Status (e.g., Approved, Pending)" value={formData.visaStatus || ''} onChange={handleInputChange}/></div>
//                  <div><label>UNIVERSITY NAME:</label><input type="text" name="universityName" placeholder="University Name" value={formData.universityName || ''} onChange={handleInputChange}/></div>
//                  <div><label>UNIVERSITY ADDRESS:</label><input type="text" name="universityAddress" placeholder="University Address" value={formData.universityAddress || ''} onChange={handleInputChange}/></div>
//                  <div><label>JOB:</label><input type="text" name="job" placeholder="Job Title" value={formData.job || ''} onChange={handleInputChange}/></div>
//                  <div><label>EXPERIENCE:</label><input type="text" name="experience" placeholder="Years of Experience" value={formData.experience || ''} onChange={handleInputChange}/></div>
//                  <div><label>COMPANY NAME:</label><input type="text" name="companyName" placeholder="Company Name" value={formData.companyName || ''} onChange={handleInputChange}/></div>
//                </div>

//               <div className="file-input-section">
//                 <label>Profile Picture:</label>
//                 <input type="file" name="profilePic" accept="image/*" onChange={handleFileChange} /> {/* Accept only images */}
//                 {/* Show current image preview if editing */}
//                 {editingStudent?.profilePic && !profilePic && (
//                    <img src={`${BASE_URL}/${editingStudent.profilePic}`} alt="Current profile" style={{ width: '60px', height: '60px', objectFit: 'cover', marginLeft: '10px', verticalAlign: 'middle' }} />
//                 )}
//                  {/* Show newly selected image preview */}
//                  {profilePic && (
//                    <img src={URL.createObjectURL(profilePic)} alt="New profile preview" style={{ width: '60px', height: '60px', objectFit: 'cover', marginLeft: '10px', verticalAlign: 'middle' }} />
//                  )}
//               </div>

//               <div className="file-input-section">
//                 <label>Supporting Documents:</label>
//                 <input type="file" name="supportingDocs" multiple onChange={handleFileChange} />
//                 {/* List current documents if editing */}
//                 {editingStudent?.supportingDocs && editingStudent.supportingDocs.length > 0 && (
//                     <div>
//                         <p>Current Documents:</p>
//                         <ul>
//                             {editingStudent.supportingDocs.map((doc, index) => (
//                                 <li key={index}>
//                                     <a href={`${BASE_URL}/${doc}`} target="_blank" rel="noopener noreferrer">
//                                         {doc.split('/').pop()}
//                                     </a>
//                                     {/* Optional: Add a way to remove existing docs */}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                  )}
//                   {/* List newly selected documents */}
//                   {supportingDocs.length > 0 && (
//                     <div>
//                         <p>New Documents to Upload:</p>
//                         <ul>
//                             {supportingDocs.map((doc, index) => (
//                                 <li key={index}>{doc.name}</li>
//                             ))}
//                         </ul>
//                     </div>
//                    )}
//               </div>

//               <button className="save-button" onClick={handleSave}>
//                 {editingStudent ? 'Update Student' : 'Save Student'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentInfo;
import React from 'react';
import { motion } from 'framer-motion';
import { FaTools, FaHardHat, FaCode } from 'react-icons/fa';

const UnderDevelopment = ({ featureName = "this feature" }) => {
  return (
    <div className="under-development-container">
      <motion.div 
        className="development-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="construction-icon">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <FaTools className="gear-icon" />
          </motion.div>
          <FaHardHat className="hat-icon" />
        </div>
        
        <h2 className="development-title">
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Feature Under Construction
          </motion.span>
        </h2>
        
        <p className="development-text">
          We're currently building <span className="feature-name">{featureName}</span> with care. 
          Check back soon for this exciting update!
        </p>
        
        <div className="progress-container">
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: "65%" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
        
        <div className="dev-meta">
          <FaCode className="code-icon" />
          <span>Development in progress</span>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderDevelopment;