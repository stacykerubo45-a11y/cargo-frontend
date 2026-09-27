import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import "../styles/History.css";

export default function MessageHistory() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://salihiyamaritimeairltd.co.ke/api/sms/history?page=1&limit=20",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("History Response:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load message history"
          );
        }

        setMessages(data.data?.messages || data.messages || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.recipientName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      msg.phoneNumber?.includes(search)
  );

  return (
    <div className="history-page">
      <div className="history-header">
        <h2>Message History</h2>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="filter-btn">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {loading && <p>Loading messages...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="table-card">
          {filteredMessages.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Phone Number</th>
                  <th>Message</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Failure Reason</th>
                </tr>
              </thead>

              <tbody>
                {filteredMessages.map((msg) => (
                  <tr key={msg._id}>
                    <td>{msg.recipientName || "-"}</td>

                    <td>{msg.phoneNumber || "-"}</td>

                    <td>{msg.message || "-"}</td>

                    <td>
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleString()
                        : "-"}
                    </td>

                    <td>
                      <span
                        className={`status ${(
                          msg.status || "pending"
                        ).toLowerCase()}`}
                      >
                        {msg.status === "sent"
                          ? "Delivered"
                          : msg.status
                          ? msg.status.charAt(0).toUpperCase() +
                            msg.status.slice(1)
                          : "Pending"}
                      </span>
                    </td>

                    <td>
                      {msg.status === "failed"
                        ? msg.errorMessage || "Message failed"
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <div className="pagination">
        <button>{"<"}</button>
        <button className="active-page">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <span>...</span>
        <button>50</button>
        <button>{">"}</button>
      </div>
    </div>
  );
}