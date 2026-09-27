import "../styles/Automations.css";

import { Plus, Pencil } from "lucide-react";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Automations() {
  const navigate = useNavigate();

  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAutomations();
  }, []);

  const fetchAutomations = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(
        "https://salihiyamaritimeairltd.co.ke/api/automations",
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
          result.message || "Failed to load automations"
        );
      }

      setAutomations(result.data?.automations || []);
    } catch (error) {
      console.error("Automations error:", error);

      setError(
        error.message || "Unable to load automations"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleAutomation = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(
        `https://salihiyamaritimeairltd.co.ke/api/automations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isActive: !currentStatus,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update automation"
        );
      }

      setAutomations((previous) =>
        previous.map((automation) =>
          automation._id === id
            ? {
                ...automation,
                isActive: !currentStatus,
              }
            : automation
        )
      );
    } catch (error) {
      console.error("Toggle automation error:", error);

      setError(
        error.message || "Unable to update automation"
      );
    }
  };

  const handleEdit = (id) => {
    navigate(`/new-automation/${id}`);
  };

  return (
    <div className="automations-page">

      <div className="page-header">
        <h2>Automations</h2>

        <button
          className="new-btn"
          onClick={() => navigate("/new-automation")}
        >
          <Plus size={18} />
          New Automation
        </button>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading automations...</p>
      ) : automations.length === 0 ? (
        <p>No automations found.</p>
      ) : (
        <div className="table-card">

          <table>

            <thead>
              <tr>
                <th>Automation Name</th>
                <th>Trigger</th>
                <th>Message Template</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {automations.map((item) => (

                <tr key={item._id}>

                  <td>{item.name}</td>

                  <td>
                    {item.trigger}
                  </td>

                  <td>
                    {item.template?.name || "-"}
                  </td>

                  <td>

                    <label className="switch">

                      <input
                        type="checkbox"
                        checked={item.isActive}
                        onChange={() =>
                          toggleAutomation(
                            item._id,
                            item.isActive
                          )
                        }
                      />

                      <span className="slider"></span>

                    </label>

                  </td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(item._id)
                      }
                    >
                      <Pencil size={16} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}