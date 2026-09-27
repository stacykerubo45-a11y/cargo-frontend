import "../styles/Messages.css";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MessageTemplates() {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(
        "https://salihiyamaritimeairltd.co.ke/api/templates",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to load templates"
        );
      }

      setTemplates(result.data.templates || []);

    } catch (error) {
      console.error("Templates error:", error);

      setError(
        error.message || "Unable to load templates"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this template?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://salihiyamaritimeairltd.co.ke/api/templates/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete template"
        );
      }

      setTemplates((currentTemplates) =>
        currentTemplates.filter(
          (template) => template._id !== id
        )
      );

    } catch (error) {
      console.error("Delete template error:", error);

      alert(
        error.message || "Unable to delete template"
      );
    }
  };

  const filteredTemplates = templates.filter(
    (template) =>
      template.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      template.message
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="templates-page">

      {/* Header */}

      <div className="templates-header">

        <h2>Message Templates</h2>

        <button
          className="new-template-btn"
          onClick={() =>
            navigate("/create-templates")
          }
        >
          <Plus size={18} />
          New Template
        </button>

      </div>

      {/* Search */}

      <div className="search-container">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search templates"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* Error */}

      {error && (
        <div className="templates-error">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <p>Loading templates...</p>
      ) : filteredTemplates.length === 0 ? (

        <p>No templates found.</p>

      ) : (

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Template Name</th>
                <th>Content Preview</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredTemplates.map(
                (template) => (

                  <tr key={template._id}>

                    <td>
                      {template.name}
                    </td>

                    <td>
                      {template.message}
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="icon-btn"
                          onClick={() =>
                            navigate(
                              `/create-templates/${template._id}`
                            )
                          }
                        >
                          <Pencil size={20} />
                        </button>

                        <button
                          className="icon-btn delete"
                          onClick={() =>
                            handleDelete(
                              template._id
                            )
                          }
                        >
                          <Trash2 size={20} />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}