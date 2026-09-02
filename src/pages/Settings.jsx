import "../styles/Settings.css";
import { useState } from "react";

export default function Settings() {
  const savedSettings = JSON.parse(
    localStorage.getItem("cargoSettings") || "{}"
  );

  const [timeFormat, setTimeFormat] = useState(
    savedSettings.timeFormat || "24"
  );

  const [companyIdentifier, setCompanyIdentifier] = useState(
    savedSettings.companyIdentifier || ""
  );

  const [companyName, setCompanyName] = useState(
    savedSettings.companyName || "My Company"
  );

  const [senderId, setSenderId] = useState(
    savedSettings.senderId || "MYCOMPANY"
  );

  const [timezone, setTimezone] = useState(
    savedSettings.timezone || "(UTC+03:00) Nairobi"
  );

  const [dateFormat, setDateFormat] = useState(
    savedSettings.dateFormat || "DD/MM/YYYY"
  );

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const settings = {
      companyIdentifier,
      companyName,
      senderId,
      timezone,
      dateFormat,
      timeFormat,
    };

    localStorage.setItem("cargoSettings", JSON.stringify(settings));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      {/* Tabs */}
      <div className="settings-tabs">
        <button className="active-tab">General</button>
        
      </div>

      <div className="settings-card">
        <h3>Company Information</h3>

        <div className="form-group">
          <label>Company Identifier</label>

          <input
            type="text"
            placeholder="mycompanysms"
            value={companyIdentifier}
            onChange={(e) => setCompanyIdentifier(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Company Name</label>

            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Default Sender ID</label>

            <input
              type="text"
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Timezone</label>

            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              <option>(UTC+03:00) Nairobi</option>
              <option>(UTC+00:00) London</option>
              <option>(UTC-05:00) New York</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date Format</label>

            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        <div className="time-format">
          <label>Time Format</label>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="12"
                checked={timeFormat === "12"}
                onChange={(e) => setTimeFormat(e.target.value)}
              />
              12 Hour
            </label>

            <label>
              <input
                type="radio"
                value="24"
                checked={timeFormat === "24"}
                onChange={(e) => setTimeFormat(e.target.value)}
              />
              24 Hour
            </label>
          </div>
        </div>

        <div className="actions">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>

        {saved && (
          <p
            style={{
              marginTop: "15px",
              color: "green",
              fontWeight: "500",
            }}
          >
            Settings saved successfully!
          </p>
        )}
      </div>
    </div>
  );
}