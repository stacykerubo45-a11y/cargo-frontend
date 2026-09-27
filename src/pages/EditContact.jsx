
import "../styles/AddContact.css";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cargoNumber, setCargoNumber] = useState("");
  const [carton, setCarton] = useState("");
  const [awb, setAwb] = useState("");
  const [pieces, setPieces] = useState("");
  const [kgs, setKgs] = useState("");
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("");
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("active");
  const [dueDate, setDueDate] = useState("");
const [birthday, setBirthday] = useState("");
const [appointmentDate, setAppointmentDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(
        `https://salihiyamaritimeairltd.co.ke/api/contacts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to load contact"
        );
      }

      const contact = result.data?.contact;

      if (!contact) {
        throw new Error("Contact not found.");
      }

     setName(contact.name || "");
setPhoneNumber(contact.phoneNumber || "");
setCargoNumber(contact.cargoNumber || "");
setCarton(contact.carton || "");
setAwb(contact.awb || "");
setPieces(contact.pieces ?? "");
setKgs(contact.kgs ?? "");
setAmount(contact.amount ?? "");
setDestination(contact.destination || "");
setRemarks(contact.remarks || "");
setStatus(contact.status || "active");

setDueDate(
  contact.dueDate
    ? new Date(contact.dueDate).toISOString().split("T")[0]
    : ""
);

setBirthday(
  contact.birthday
    ? new Date(contact.birthday).toISOString().split("T")[0]
    : ""
);

setAppointmentDate(
  contact.appointmentDate
    ? new Date(contact.appointmentDate).toISOString().split("T")[0]
    : ""
);
    } catch (error) {
      console.error("Load contact error:", error);

      setError(
        error.message || "Unable to load contact"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(
        `https://salihiyamaritimeairltd.co.ke/api/contacts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name,
            phoneNumber,
            cargoNumber,
            carton,
            awb,
            pieces: pieces ? Number(pieces) : 0,
            kgs: kgs ? Number(kgs) : 0,
            amount: amount ? Number(amount) : 0,
            destination,
            remarks,
            status,
dueDate: dueDate || null,
birthday: birthday || null,
appointmentDate: appointmentDate || null,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update contact"
        );
      }

      alert("Contact updated successfully!");

      navigate("/contacts");

    } catch (error) {
      console.error("Update contact error:", error);

      setError(
        error.message || "Unable to update contact"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="add-contact-page">
        <p>Loading contact...</p>
      </div>
    );
  }

  return (
    <div className="add-contact-page">

      <div className="page-header">
        <h2>
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>

          Edit Contact
        </h2>
      </div>

      <div className="contact-card">

        <form onSubmit={handleSubmit}>

          <div className="form-row">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="text"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value)
                }
                required
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Cargo Number</label>

              <input
                type="text"
                value={cargoNumber}
                onChange={(e) =>
                  setCargoNumber(e.target.value)
                }
              />
            </div>
            <div className="form-row">

  <div className="form-group">
    <label>Due Date</label>

    <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label>Birthday</label>

    <input
      type="date"
      value={birthday}
      onChange={(e) => setBirthday(e.target.value)}
    />
  </div>

</div>

<div className="form-group">
  <label>Appointment Date</label>

  <input
    type="date"
    value={appointmentDate}
    onChange={(e) =>
      setAppointmentDate(e.target.value)
    }
  />
</div>

            <div className="form-group">
              <label>Carton</label>

              <input
                type="text"
                value={carton}
                onChange={(e) =>
                  setCarton(e.target.value)
                }
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>AWB</label>

              <input
                type="text"
                value={awb}
                onChange={(e) =>
                  setAwb(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Destination</label>

              <input
                type="text"
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value)
                }
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Pieces</label>

              <input
                type="number"
                min="0"
                value={pieces}
                onChange={(e) =>
                  setPieces(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Weight (KGs)</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={kgs}
                onChange={(e) =>
                  setKgs(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Amount</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />
            </div>

          </div>

          <div className="form-group">

            <label>Remarks</label>

            <textarea
              rows="4"
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>Status</label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>

          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <div className="button-group">

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
              disabled={saving}
            >
              {saving
                ? "Updating..."
                : "Update Contact"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

