
import "../styles/NewAutomation.css";

import { ArrowLeft, Eye } from "lucide-react";

import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

export default function CreateAutomation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState("");
  const [triggerValue, setTriggerValue] = useState(1);
  const [triggerTiming, setTriggerTiming] = useState("before");
  const [triggerField, setTriggerField] = useState("");
  const [scheduleTime, setScheduleTime] = useState("09:00");
  const [template, setTemplate] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [templates, setTemplates] = useState([]);

  const [loadingTemplates, setLoadingTemplates] =
    useState(true);

  const [loadingAutomation, setLoadingAutomation] =
    useState(isEditing);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load templates
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
        "http://salihiyamaritimeairltd.co.ke/api/templates",
        {
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

      setTemplates(result.data?.templates || []);
    } catch (error) {
      console.error("Templates error:", error);

      setError(
        error.message || "Unable to load templates"
      );
    } finally {
      setLoadingTemplates(false);
    }
  };

  // Load automation when editing
  useEffect(() => {
    if (!id) return;

    const fetchAutomation = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("You are not logged in.");
        }

        const response = await fetch(
          `http://salihiyamaritimeairltd.co.ke/api/automations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to load automation"
          );
        }

        const automation =
          result.data?.automation;

        if (!automation) {
          throw new Error(
            "Automation data not found."
          );
        }

        setName(automation.name || "");
        setTrigger(automation.trigger || "");

        setTemplate(
          automation.template?._id ||
            automation.template ||
            ""
        );

        setTriggerValue(
          automation.triggerValue ?? 1
        );

        setTriggerTiming(
          automation.triggerTiming || "before"
        );

        setTriggerField(
          automation.triggerField || ""
        );

        setScheduleTime(
          automation.scheduleTime || "09:00"
        );

        setIsActive(
          automation.isActive !== false
        );
      } catch (error) {
        console.error(
          "Load automation error:",
          error
        );

        setError(
          error.message ||
            "Unable to load automation"
        );
      } finally {
        setLoadingAutomation(false);
      }
    };

    fetchAutomation();
  }, [id]);

  const handleTriggerChange = (e) => {
    const value = e.target.value;

    setTrigger(value);

    if (value === "due_date") {
      setTriggerField("dueDate");
    } else if (value === "birthday") {
      setTriggerField("birthday");
    } else if (value === "appointment") {
      setTriggerField("appointmentDate");
    } else {
      setTriggerField("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError(
        "Please enter an automation name."
      );
      return;
    }

    if (!trigger) {
      setError(
        "Please select a trigger event."
      );
      return;
    }

    if (!template) {
      setError(
        "Please select a message template."
      );
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "You are not logged in."
        );
      }

      const automationData = {
        name,
        trigger,
        triggerValue: Number(triggerValue),
        triggerTiming,
        triggerField,
        scheduleTime,
        template,
        isActive,
      };

      const url = isEditing
        ? `http://salihiyamaritimeairltd.co.ke/api/automations/${id}`
        : "http://salihiyamaritimeairltd.co.ke/api/automations";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(
          automationData
        ),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Failed to ${
              isEditing
                ? "update"
                : "create"
            } automation`
        );
      }

      setSuccess(
        isEditing
          ? "Automation updated successfully!"
          : "Automation created successfully!"
      );

      setTimeout(() => {
        navigate("/automations");
      }, 1000);
    } catch (error) {
      console.error(
        "Save automation error:",
        error
      );

      setError(
        error.message ||
          "Unable to save automation"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingAutomation) {
    return (
      <div className="create-automation-page">
        <p>Loading automation...</p>
      </div>
    );
  }

  return (
    <div className="create-automation-page">

      <div className="page-header">
        <h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </button>

          {isEditing
            ? "Edit Automation"
            : "Create Automation"}
        </h2>
      </div>

      <div className="automation-card">

        <form onSubmit={handleSubmit}>

          {/* Automation name + trigger */}

          <div className="form-row">

            <div className="form-group">
              <label>
                Automation Name
              </label>

              <input
                type="text"
                placeholder="Enter automation name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                Trigger Event
              </label>

              <select
                value={trigger}
                onChange={
                  handleTriggerChange
                }
              >
                <option value="">
                  Select trigger event
                </option>

                <option value="due_date">
                  Due Date
                </option>

                <option value="birthday">
                  Birthday
                </option>

                <option value="new_customer">
                  New Customer
                </option>

                <option value="appointment">
                  Appointment Date
                </option>
              </select>
            </div>

          </div>

          {/* Trigger condition */}

          <div className="form-row">

            <div className="form-group small">
              <label>
                Trigger Condition
              </label>

              <input
                type="number"
                min="0"
                value={triggerValue}
                onChange={(e) =>
                  setTriggerValue(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>
                Trigger Timing
              </label>

              <select
                value={triggerTiming}
                onChange={(e) =>
                  setTriggerTiming(
                    e.target.value
                  )
                }
              >
                <option value="before">
                  days before
                </option>

                <option value="after">
                  days after
                </option>

                <option value="on">
                  on
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Trigger Field
              </label>

              <select
                value={triggerField}
                onChange={(e) =>
                  setTriggerField(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select field
                </option>

                <option value="dueDate">
                  Due Date
                </option>

                <option value="birthday">
                  Birthday
                </option>

                <option value="appointmentDate">
                  Appointment Date
                </option>
              </select>
            </div>

          </div>

          {/* Template */}

          <div className="form-row">

            <div className="form-group template-group">

              <label>
                Choose Template
              </label>

              <select
                value={template}
                onChange={(e) =>
                  setTemplate(
                    e.target.value
                  )
                }
                disabled={
                  loadingTemplates
                }
              >

                <option value="">
                  {loadingTemplates
                    ? "Loading templates..."
                    : "Select message template"}
                </option>

                {templates.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}
                  </option>
                ))}

              </select>

            </div>

            <button
              type="button"
              className="preview-btn"
              title="Preview template"
            >
              <Eye size={18} />
            </button>

          </div>

          {/* Schedule */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Schedule Time
              </label>

              <input
                type="time"
                value={scheduleTime}
                onChange={(e) =>
                  setScheduleTime(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="status-container">

              <span>
                {isActive
                  ? "Active"
                  : "Inactive"}
              </span>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) =>
                    setIsActive(
                      e.target.checked
                    )
                  }
                />

                <span className="slider"></span>

              </label>

            </div>

          </div>

          {/* Messages */}

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {success && (
            <div className="form-success">
              {success}
            </div>
          )}

          {/* Buttons */}

          <div className="button-group">

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate(-1)
              }
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
                ? "Update Automation"
                : "Save Automation"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

