
import "../styles/AddContact.css";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddContact() {
  const navigate = useNavigate();

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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(
        "https://salihiyamaritimeairltd.co.ke/api/contacts",
        {
          method: "POST",
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
          result.message || "Failed to create contact"
        );
      }

      setSuccess("Contact added successfully!");

      setName("");
      setPhoneNumber("");
      setCargoNumber("");
      setDueDate("");
setBirthday("");
setAppointmentDate("");
      setCarton("");
      setAwb("");
      setPieces("");
      setKgs("");
      setAmount("");
      setDestination("");
      setRemarks("");
      setStatus("active");

      setTimeout(() => {
        navigate("/contacts");
      }, 1000);

    } catch (error) {
      console.error("Add contact error:", error);

      setError(
        error.message || "Unable to add contact"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-contact-page">

      <div className="page-header">
        <h2>
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>

          Add Contact
        </h2>
      </div>

      <div className="contact-card">

        <form onSubmit={handleSubmit}>

          {/* Name + Phone */}
          <div className="form-row">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter full name"
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
                placeholder="0710000000"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value)
                }
                required
              />
            </div>

          </div>

          {/* Cargo Number + Carton */}
          <div className="form-row">

            <div className="form-group">
              <label>Cargo Number</label>

              <input
                type="text"
                placeholder="Enter cargo number"
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
                placeholder="Enter carton"
                value={carton}
                onChange={(e) =>
                  setCarton(e.target.value)
                }
              />
            </div>

          </div>

          {/* AWB + Destination */}
          <div className="form-row">

            <div className="form-group">
              <label>AWB</label>

              <input
                type="text"
                placeholder="Enter AWB"
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
                placeholder="Enter destination"
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value)
                }
              />
            </div>

          </div>

          {/* Pieces + KGs + Amount */}
          <div className="form-row">

            <div className="form-group">
              <label>Pieces</label>

              <input
                type="number"
                min="0"
                placeholder="0"
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
                placeholder="0"
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
                placeholder="0"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />
            </div>

          </div>

          {/* Remarks */}
          <div className="form-group">

            <label>Remarks</label>

            <textarea
              rows="4"
              placeholder="Enter any additional remarks"
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
            />

          </div>

          {/* Status */}
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
                : "Save Contact"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

