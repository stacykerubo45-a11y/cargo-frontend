import { Link } from "react-router-dom";
import { Package, ArrowLeft, LayoutDashboard } from "lucide-react";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">

        <div className="icon-container">
          <Package size={48} />
        </div>

        <h1 className="error-code">404</h1>

        <h2 className="error-title">
          Message Route Not Found
        </h2>

        <p className="error-description">
          The page you're looking for doesn't exist, may have been moved,
          or you may not have permission to access it.
        </p>

        <div className="status-box">
          <h3>📦 Cargo Delivery Failed</h3>
          <p>
            We couldn't deliver this route. Please return to the dashboard
            and continue managing your cargo notifications.
          </p>
        </div>

        <div className="action-buttons">
          <Link to="/dashboard" className="btn btn-primary">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <button
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}

export default NotFound;