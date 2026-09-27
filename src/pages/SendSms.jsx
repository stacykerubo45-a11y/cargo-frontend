
import "../styles/SendSms.css";

import { useEffect, useState } from "react";

import { ArrowLeft, Send, Upload } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function SendSms() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [message, setMessage] = useState("");
  const [schedule, setSchedule] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  // Load contacts and templates
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        if (!token) {
          throw new Error("You are not logged in.");
        }

        const [contactsResponse, templatesResponse] =
          await Promise.all([
            fetch(
              "https://salihiyamaritimeairltd.co.ke/api/contacts?limit=100",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),

            fetch(
              "https://salihiyamaritimeairltd.co.ke/api/templates",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
          ]);

        const contactsResult =
          await contactsResponse.json();

        const templatesResult =
          await templatesResponse.json();

        if (!contactsResponse.ok) {
          throw new Error(
            contactsResult.message ||
              "Failed to load contacts"
          );
        }

        if (!templatesResponse.ok) {
          throw new Error(
            templatesResult.message ||
              "Failed to load templates"
          );
        }

        setContacts(
          contactsResult.data?.contacts || []
        );

        setTemplates(
          templatesResult.data?.templates || []
        );
      } catch (error) {
        console.error(
          "Load SMS data error:",
          error
        );

        setError(
          error.message ||
            "Unable to load contacts and templates"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  // Select / deselect contact
  const toggleContact = (contactId) => {
    setSelectedContacts((current) => {
      if (current.includes(contactId)) {
        return current.filter(
          (id) => id !== contactId
        );
      }

      return [...current, contactId];
    });
  };

  // Select / deselect all contacts
  const toggleAllContacts = () => {
    if (
      selectedContacts.length ===
      contacts.length
    ) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(
        contacts.map((contact) => contact._id)
      );
    }
  };

  // Load selected template
  const handleTemplateChange = (e) => {
    const templateId = e.target.value;

    setSelectedTemplate(templateId);

    if (!templateId) {
      setMessage("");
      return;
    }

    const template = templates.find(
      (item) => item._id === templateId
    );

    if (template) {
      setMessage(template.message);
    }
  };

  // Send or schedule SMS
  const handleSend = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (selectedContacts.length === 0) {
      setError(
        "Please select at least one contact."
      );
      return;
    }

    if (!message.trim()) {
      setError(
        "Please enter a message."
      );
      return;
    }

    if (schedule && !scheduledAt) {
      setError(
        "Please select a date and time."
      );
      return;
    }

    try {
      setSending(true);

      const response = await fetch(
        "https://salihiyamaritimeairltd.co.ke/api/sms/send",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            contactIds: selectedContacts,

            message,

            campaignName:
              campaignName.trim() || undefined,

            scheduledAt: schedule
              ? new Date(
                  scheduledAt
                ).toISOString()
              : undefined,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to send SMS"
        );
      }

      if (schedule) {
        setSuccess(
          `${result.data.scheduled} message(s) scheduled successfully.`
        );
      } else {
        setSuccess(
          `${result.data.sent} message(s) sent successfully.`
        );
      }

      // Clear form after successful operation
      setSelectedContacts([]);
      setCampaignName("");
      setMessage("");
      setSelectedTemplate("");
      setSchedule(false);
      setScheduledAt("");
    } catch (error) {
      console.error(
        "Send SMS error:",
        error
      );

      setError(
        error.message ||
          "Unable to send SMS"
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="send-sms-page">
        <p>
          Loading contacts and templates...
        </p>
      </div>
    );
  }

  return (
    <div className="send-sms-page">

      {/* Header */}
      <div className="send-sms-header">
        <h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </button>

          Send SMS
        </h2>
      </div>

      <form onSubmit={handleSend}>

        {/* Campaign Details */}
        <div className="sms-card">
          <h3>Campaign Details</h3>

          <div className="form-group">
            <label>
              Campaign Name
            </label>

            <input
              type="text"
              placeholder="e.g. Cargo Arrival Notification"
              value={campaignName}
              onChange={(e) =>
                setCampaignName(
                  e.target.value
                )
              }
            />
          </div>
        </div>

        {/* Contacts */}
        <div className="sms-card">

          <div className="section-heading">

            <div>
              <h3>
                Select Contacts
              </h3>

              <span>
                {selectedContacts.length} selected
              </span>
            </div>

            {/* Import Contacts */}
            <button
              type="button"
              className="import-contacts-btn"
              onClick={() =>
                navigate("/import-contacts")
              }
            >
              <Upload size={17} />
              Import Contacts
            </button>

          </div>

          {contacts.length === 0 ? (
            <p>
              No contacts available.
            </p>
          ) : (
            <>
              {/* Select All */}
              <label className="select-all">
                <input
                  type="checkbox"
                  checked={
                    selectedContacts.length ===
                    contacts.length
                  }
                  onChange={
                    toggleAllContacts
                  }
                />

                Select All
              </label>

              {/* Contacts List */}
              <div className="contacts-list">

                {contacts.map((contact) => (
                  <label
                    key={contact._id}
                    className="contact-option"
                  >
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(
                        contact._id
                      )}
                      onChange={() =>
                        toggleContact(
                          contact._id
                        )
                      }
                    />

                    <div>
                      <strong>
                        {contact.name}
                      </strong>

                      <span>
                        {contact.phoneNumber}
                      </span>
                    </div>
                  </label>
                ))}

              </div>
            </>
          )}
        </div>

        {/* Message */}
        <div className="sms-card">

          <h3>Message</h3>

          <div className="form-group">

            <label>
              Use Template
            </label>

            <select
              value={selectedTemplate}
              onChange={
                handleTemplateChange
              }
            >
              <option value="">
                Write custom message
              </option>

              {templates
                .filter(
                  (template) =>
                    template.isActive
                )
                .map((template) => (
                  <option
                    key={template._id}
                    value={template._id}
                  >
                    {template.name}
                  </option>
                ))}
            </select>

          </div>

          <div className="form-group">

            <label>
              Message Content
            </label>

            <textarea
              rows="8"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
            />

          </div>

          <p className="sms-hint">
            Available variables:
            {" {{name}} "}
            {" {{phoneNumber}} "}
            {" {{cargoNumber}} "}
          </p>

          <p className="character-count">
            Characters: {message.length}
          </p>

        </div>

        {/* Schedule */}
        <div className="sms-card">

          <h3>Schedule</h3>

          <label className="schedule-option">

            <input
              type="checkbox"
              checked={schedule}
              onChange={(e) =>
                setSchedule(
                  e.target.checked
                )
              }
            />

            Schedule this SMS for later

          </label>

          {schedule && (
            <div className="form-group">

              <label>
                Date and Time
              </label>

              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) =>
                  setScheduledAt(
                    e.target.value
                  )
                }
                min={new Date()
                  .toISOString()
                  .slice(0, 16)}
              />

            </div>
          )}

        </div>

        {/* Error / Success Messages */}
        {error && (
          <div className="sms-error">
            {error}
          </div>
        )}

        {success && (
          <div className="sms-success">
            {success}
          </div>
        )}

        {/* Buttons */}
        <div className="sms-actions">

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
            className="send-btn"
            disabled={sending}
          >
            <Send size={18} />

            {sending
              ? "Processing..."
              : schedule
              ? "Schedule SMS"
              : "Send SMS"}
          </button>

        </div>

      </form>

    </div>
  );
}


