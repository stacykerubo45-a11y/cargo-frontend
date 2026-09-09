import {
  Users,
  MessageSquare,
  CheckCircle,
  XCircle,
  CircleUser,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const today = new Date();

  const [stats, setStats] = useState({
    totalContacts: 0,
    totalMessages: 0,
    sentMessages: 0,
    failedMessages: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("You are not logged in.");
        }

        const response = await fetch(
          "http://salihiyamaritimeairltd.co.ke/api/dashboard/stats",
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
          throw new Error(result.message || "Failed to load dashboard");
        }

        setStats(result.data);
        setRecentActivity(result.data.recentActivity || []);
      } catch (error) {
        console.error("Dashboard error:", error);
        setError(error.message || "Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <main className="dashboard">
      <div className="dashboard-main">

        {/* Dashboard header */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>

          <div className="dashboard-header-right">
            <p>{today.toDateString()}</p>

            <CircleUser
              size={28}
              className="dashboard-header-icon"
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        {/* Loading message */}
        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            {/* Statistics */}
            <div className="stats-grid">

              <div className="stat-card">
                <div className="stat-top">
                  <h4>Total Contacts</h4>
                  <Users size={20} />
                </div>

                <h2>{stats.totalContacts}</h2>

                <span className="positive">
                  Contacts
                </span>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <h4>Messages Sent</h4>
                  <MessageSquare size={20} />
                </div>

                <h2>{stats.totalMessages}</h2>

                <span className="positive">
                  Total
                </span>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <h4>Delivered</h4>
                  <CheckCircle size={20} />
                </div>

                <h2>{stats.sentMessages}</h2>

                <span className="positive">
                  Sent
                </span>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <h4>Failed</h4>
                  <XCircle size={20} />
                </div>

                <h2>{stats.failedMessages}</h2>

                <span className="negative">
                  Failed
                </span>
              </div>

            </div>

            {/* Bottom section */}
            <div className="bottom-grid">

              <div className="chart-card">
                <h3>Message Overview</h3>

                <div className="chart-placeholder">
  {stats.smsActivity?.length > 0 ? (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stats.smsActivity}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="sent"
            name="Sent"
          />

          <Bar
            dataKey="failed"
            name="Failed"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : (
    "No SMS activity yet"
  )}
</div>
              </div>

              <div className="messages-card">
                <h3>Recent Messages</h3>

                {recentActivity.length === 0 ? (
                  <p>No recent messages.</p>
                ) : (
                  recentActivity.slice(0, 4).map((message) => (
                    <div
                      className="message-item"
                      key={message._id}
                    >
                   <div>
  <h4>
    {message.campaign?.name || "SMS Message"}
  </h4>

  <p>{message.phoneNumber}</p>

  <p>
    {message.createdAt
      ? new Date(message.createdAt).toLocaleString()
      : "No date"}
  </p>
</div>
                      <span
                        className={
                          message.status === "failed"
                            ? "failed1"
                            : "delivered1"
                        }
                      >
                        {message.status}
                      </span>
                    </div>
                  ))
                )}

              </div>

            </div>
          </>
        )}

      </div>
    </main>
  );
}