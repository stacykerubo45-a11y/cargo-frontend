import "../styles/CreateTemplates.css";

import { ArrowLeft } from "lucide-react";

import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

export default function CreateTemplate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingTemplate, setLoadingTemplate] =
    useState(isEditing);

  const [error, setError] = useState("");

  // Load existing template when editing
  useEffect(() => {
    if (!id) return;

    const fetchTemplate = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/templates/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to load template"
          );
        }

        setName(result.data.template.name);
        setMessage(result.data.template.message);

      } catch (error) {
        console.error(
          "Load template error:",
          error
        );

        setError(
          error.message ||
            "Unable to load template"
        );
      } finally {
        setLoadingTemplate(false);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError(
        "Please enter a template name."
      );
      return;
    }

    if (!message.trim()) {
      setError(
        "Please enter a message."
      );
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "You are not logged in."
        );
      }

      const url = isEditing
        ? `http://localhost:5000/api/templates/${id}`
        : "http://localhost:5000/api/templates";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          name,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to save template"
        );
      }

      alert(
        isEditing
          ? "Template updated successfully!"
          : "Template created successfully!"
      );

      navigate("/messages");

    } catch (error) {
      console.error(
        "Save template error:",
        error
      );

      setError(
        error.message ||
          "Unable to save template"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingTemplate) {
    return (
      <div className="template-page">
        <p>Loading template...</p>
      </div>
    );
  }

  return (
    <div className="template-page">

      <div className="template-header">

        <h2>

          <button
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </button>

          {isEditing
            ? "Edit Template"
            : "Create Template"}

        </h2>

      </div>

      <form onSubmit={handleSave}>

        <div className="template-container">

          <div className="template-form">

            <div className="form-group">

              <label>
                Template Name
              </label>

              <input
                type="text"
                placeholder="Enter template name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>

            <div className="form-group">

              <label>
                Message Content
              </label>

              <textarea
                rows="10"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                required
              />

            </div>

            <p className="char-count">
              Character Count:{" "}
              {message.length}
            </p>

          </div>

          <div className="variables-card">

            <h3>
              Available Variables
            </h3>

            <ul>

           <li><strong>{"{{name}}"}</strong> - Customer Name</li>
<li><strong>{"{{phoneNumber}}"}</strong> - Phone Number</li>
<li><strong>{"{{telephone}}"}</strong> - Telephone</li>
<li><strong>{"{{phone}}"}</strong> - Phone</li>
<li><strong>{"{{cargoNumber}}"}</strong> - Cargo Number</li>
<li><strong>{"{{carton}}"}</strong> - Carton</li>
<li><strong>{"{{awb}}"}</strong> - AWB</li>
<li><strong>{"{{destination}}"}</strong> - Destination</li>
            </ul>

            <p>
              Use these variables exactly
              as shown in your message.
            </p>

          </div>

        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="template-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Template"
              : "Save Template"}
          </button>

        </div>

      </form>

    </div>
  );
}