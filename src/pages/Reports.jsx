import { useEffect, useState } from "react";
import "../styles/Reports.css";

export default function Reports() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://salihiyamaritimeairltd.co.ke/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load reports");
        }

        setStats(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading reports...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  const deliveredPercent =
    stats?.totalMessages > 0
      ? ((stats.sentMessages / stats.totalMessages) * 100).toFixed(1)
      : 0;

  const failedPercent =
    stats?.totalMessages > 0
      ? ((stats.failedMessages / stats.totalMessages) * 100).toFixed(1)
      : 0;

  return (
    <div className="reports-page">
      {/* Header */}
      <div className="reports-header">
        <h2>Reports</h2>

        <select className="date-filter">
          <option>Current Data</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Messages</h4>
          <h2>{stats?.totalMessages || 0}</h2>
        </div>

        <div className="stat-card">
          <h4>Delivered</h4>
          <h2>{stats?.sentMessages || 0}</h2>
          <span className="success">{deliveredPercent}%</span>
        </div>

        <div className="stat-card">
          <h4>Failed</h4>
          <h2>{stats?.failedMessages || 0}</h2>
          <span className="danger">{failedPercent}%</span>
        </div>

        <div className="stat-card">
          <h4>Scheduled</h4>
          <h2>{stats?.scheduledMessages || 0}</h2>
        </div>
      </div>

      {/* Delivery Summary */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Delivery Status</h3>

          <div className="donut-container">
            <div className="donut-chart">
              <div className="donut-inner">
                <h2>{deliveredPercent}%</h2>
                <p>Delivered</p>
              </div>
            </div>

            <div className="legend">
              <div>
                <span className="green-dot"></span>
                Delivered {stats?.sentMessages || 0}
              </div>

              <div>
                <span className="red-dot"></span>
                Failed {stats?.failedMessages || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns */}
        <div className="chart-card">
          <h3>Recent Campaigns</h3>

          {stats?.recentCampaigns?.length > 0 ? (
            <table className="campaign-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Recipients</th>
                </tr>
              </thead>

              <tbody>
                {stats.recentCampaigns.map((campaign) => (
                  <tr key={campaign._id}>
                    <td>{campaign.name}</td>
                    <td>{campaign.status}</td>
                    <td>{campaign.totalRecipients}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No campaigns found.</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="chart-card">
        <h3>Recent Messages</h3>

        {stats?.recentActivity?.length > 0 ? (
          <table className="campaign-table">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {stats.recentActivity.map((msg) => (
                <tr key={msg._id}>
                  <td>{msg.recipientName}</td>
                  <td>{msg.phoneNumber}</td>
                  <td>{msg.status}</td>
                  <td>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recent messages found.</p>
        )}
      </div>
    </div>
  );
}