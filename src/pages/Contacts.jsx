
import {
  Search,
  Filter,
  Upload,
  Plus,
  Pencil,
} from "lucide-react";

import { useEffect, useState } from "react";
import "../styles/Contacts.css";
import { useNavigate } from "react-router-dom";

export default function Contacts() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(
        "http://localhost:5000/api/contacts",
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
          result.message || "Failed to load contacts"
        );
      }

      const contactsData =
        result.data?.contacts || [];

      setContacts(contactsData);
    } catch (error) {
      console.error("Contacts error:", error);

      setError(
        error.message || "Unable to load contacts"
      );
    } finally {
      setLoading(false);
    }
  };

  // Search by multiple contact fields
  const filteredContacts = contacts.filter(
    (contact) => {
      const searchText = search.toLowerCase();

      return (
        contact.name
          ?.toLowerCase()
          .includes(searchText) ||

        contact.phoneNumber
          ?.toLowerCase()
          .includes(searchText) ||

        contact.cargoNumber
          ?.toLowerCase()
          .includes(searchText) ||

        contact.carton
          ?.toLowerCase()
          .includes(searchText) ||

        contact.awb
          ?.toLowerCase()
          .includes(searchText) ||

        contact.destination
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  return (
    <div className="contacts-page">

      {/* Header */}
      <div className="contacts-header">

        <h2>Contacts</h2>

        <div className="header-actions">

          <button
            className="import-btn"
            onClick={() =>
              navigate("/import-contacts")
            }
          >
            <Upload size={18} />
            Import
          </button>

          <button
            className="add-btn"
            onClick={() =>
              navigate("/add-contact")
            }
          >
            <Plus size={18} />
            Add Contact
          </button>

        </div>
      </div>

      {/* Search + Filter */}
      <div className="toolbar">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search by name, phone, cargo, AWB or destination"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <button className="filter-btn">
          <Filter size={18} />
          Filter
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="contacts-error">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <p>Loading contacts...</p>
      ) : filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (

        <div className="table-wrapper">

         <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Phone Number</th>
      <th>Cargo Number</th>
      <th>Carton</th>
      <th>AWB</th>
      <th>Pieces</th>
      <th>KGs</th>
      <th>Amount</th>
      <th>Destination</th>
      <th>Due Date</th>
      <th>Birthday</th>
      <th>Appointment Date</th>
      <th>Remarks</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {filteredContacts.map((contact) => (
      <tr key={contact._id}>
        <td>{contact.name || "-"}</td>

        <td>{contact.phoneNumber || "-"}</td>

        <td>{contact.cargoNumber || "-"}</td>

        <td>{contact.carton || "-"}</td>

        <td>{contact.awb || "-"}</td>

        <td>{contact.pieces ?? "-"}</td>

        <td>{contact.kgs ?? "-"}</td>

        <td>{contact.amount ?? "-"}</td>

        <td>{contact.destination || "-"}</td>

        <td>
          {contact.dueDate
            ? new Date(contact.dueDate).toLocaleDateString()
            : "-"}
        </td>

        <td>
          {contact.birthday
            ? new Date(contact.birthday).toLocaleDateString()
            : "-"}
        </td>

        <td>
          {contact.appointmentDate
            ? new Date(contact.appointmentDate).toLocaleDateString()
            : "-"}
        </td>

        <td>{contact.remarks || "-"}</td>

        <td>{contact.status || "-"}</td>

        <td>
          <button
            className="edit-btn"
            onClick={() =>
              navigate(`/edit-contact/${contact._id}`)
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

