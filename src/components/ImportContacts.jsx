import "../styles/Import.css";

import { UploadCloud } from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function ImportContacts() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setError("");
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please choose a CSV or Excel file first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "https://salihiyamaritimeairltd.co.ke/api/upload/contacts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to upload file"
        );
      }

      setResult(data.data);

    } catch (error) {
      console.error("Upload error:", error);

      setError(
        error.message || "Unable to upload file"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="import-page">

      <h2>Import Contacts</h2>

      {/* Steps */}

      <div className="steps">

        <div className="step active">
          <span>1</span>
          <p>Upload File</p>
        </div>

       
     

      </div>

      {/* Upload Area */}

      <div className="upload-card">

        <UploadCloud size={80} />

        <h3>
          {file
            ? file.name
            : "Drag and drop your file here"}
        </h3>

        <p>or</p>

        <label className="choose-btn">
          Choose File

          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            hidden
          />
        </label>

        <small>
          Supports CSV, Excel (.xlsx, .xls) files
        </small>

      </div>

      {/* Error */}

      {error && (
        <div className="import-error">
          {error}
        </div>
      )}

      {/* Result */}

      {result && (
        <div className="import-result">

          <h3>Import Complete</h3>

          <p>
            Total rows: {result.totalRows}
          </p>

          <p>
            Successfully imported:{" "}
            {result.successful}
          </p>

          <p>
            Duplicates: {result.duplicates}
          </p>

          <p>
            Failed: {result.failed}
          </p>

        </div>
      )}

      {/* Actions */}

      <div className="actions">

        <button
          className="cancel-btn"
          onClick={() => navigate("/contacts")}
        >
          Cancel
        </button>

        <button
          className="next-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

      </div>

    </div>
  );
}