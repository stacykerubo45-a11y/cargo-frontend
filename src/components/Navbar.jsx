import { Bell, User, ChevronDown, Menu } from "lucide-react";
import "../styles/Navbar.css";


export default function Navbar({ onMenuClick, display }) {
  
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={22} />
        </button>
       

        <h2 className="navbar-title">Salhiya Maritime Air Cargo Limited</h2>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">
          <Bell size={21} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          <div className="profile-avatar">
            <User size={20} />
          </div>

          <div className="profile-info">
            <span className="profile-name">Admin</span>
            <span className="profile-role">Administrator</span>
          </div>

          <ChevronDown size={17} className="profile-arrow" />
        </div>
      </div>
    </header>
  );
}