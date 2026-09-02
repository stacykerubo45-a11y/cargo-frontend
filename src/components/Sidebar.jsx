import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Send,
  Zap,
  History,
  BarChart3,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar({ sidebarOpen }) {
  return (
    <aside className="sidebar" style={{ left: sidebarOpen ? "0" : "-250px" }}>

      <div className="logo2">
        <h2>AutoMsg</h2>
      </div>

      <div className="divider"></div>

      <nav>
        <ul>

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <Users size={18} />
              Contacts
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <MessageSquare size={18} />
              Messages
            </NavLink>
          </li>
          <li>
  <NavLink
    to="/send-sms"
    className={({ isActive }) =>
      isActive ? "nav-link active" : "nav-link"
    }
  >
    <Send size={18} />
    Send SMS
  </NavLink>
</li>

          <li>
            <NavLink
              to="/automations"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <Zap size={18} />
              Automations
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <History size={18} />
              History
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <BarChart3 size={18} />
              Reports
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <Settings size={18} />
              Settings
            </NavLink>
          </li>

        </ul>
      </nav>

    </aside>
  );
}