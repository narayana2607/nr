import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Age.css";

const AgeVerificationApp = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Supported file types
  const supportedFileTypes = [
    "JPG",
    "JPEG",
    "PNG",
    "HEIC",
    "GIF",
    "WEBP",
    "BMP",
    "TIFF"
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("Invalid file type. Please upload an image.");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError("File size exceeds 20MB. Please upload a smaller image.");
      return;
    }

    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
    setError("");
  };

  const extractDOB = (text) => {
    const patterns = [
      /(?:DOB|dob|birth date|date of birth)[:\s]*([\d]{1,2}[-/.][\d]{1,2}[-/.][\d]{2,4})/i,
      /(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})/
    ];
    
    for (let pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const extractName = (text) => {
    const lines = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    return lines.length > 0 ? lines[0] : "Unknown";
  };

  const calculateAge = (dob) => {
    if (!dob) return null;
    const parts = dob.split(/[-/.]/);
    let formattedDOB;
    if (parts[2].length === 4) {
      formattedDOB = `${parts[2]}-${parts[1]}-${parts[0]}`;
    } else {
      const year = parseInt(parts[2]) > 30 ? `19${parts[2]}` : `20${parts[2]}`;
      formattedDOB = `${year}-${parts[1]}-${parts[0]}`;
    }
    const dobDate = new Date(formattedDOB);
    if (isNaN(dobDate.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleExtractText = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }
    setLoading(true);
    setError("");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const { data: { text } } = await Tesseract.recognize(reader.result, "eng");
        
        const dob = extractDOB(text);
        const extractedName = extractName(text);
        setName(extractedName);
        
        if (dob) {
          const calculatedAge = calculateAge(dob);
          setAge(calculatedAge);
          
          if (calculatedAge < 18) {
            toast.error("Access Denied! You must be at least 18 years old.", { position: "bottom-center" });
          } else {
            toast.success(`Your current age is: ${calculatedAge} years`, { position: "bottom-center" });
          }
        } else {
          toast.warn("Date of Birth not found in the extracted text.", { position: "bottom-center" });
        }
      } catch (err) {
        setError("Failed to extract text. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="age-verification-container">
      <h2 className="age-verification-heading">Age Verification</h2>

      {/* Supported File Types */}
      <div className="supported-files">
        <h3>Supported File Types</h3>
        <p>{supportedFileTypes.join(", ")}</p>
      </div>

      <div className="upload-section">
        <input type="file" onChange={handleFileChange} accept="image/*" className="file-input" />
        {imagePreview && <img src={imagePreview} alt="Uploaded" className="uploaded-image" />}
        <button onClick={handleExtractText} disabled={loading} className="extract-button">
          {loading ? "Extracting..." : "Extract Text"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {name && age !== null && (
        <div className="result-container">
          <h3 className="result-heading">Verification Details</h3>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
        </div>
      )}
    </div>
  );
};

export default AgeVerificationApp;
