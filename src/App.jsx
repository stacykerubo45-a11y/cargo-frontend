import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";


import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Messages from "./pages/Messages";
import Automations from "./pages/Automations";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Register from "./components/Register";
import ImportContacts from "./components/ImportContacts";
import AddContact from "./components/AddContact";
import SendSms from "./pages/SendSms";
import EditContact from "./pages/EditContact";
import CreateTemplates from "./components/CreateTemplates";
import NewAutomation from "./components/NewAutomation";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
    
  };

  return (
    <div className="app-layout">

      <Sidebar sidebarOpen={sidebarOpen}/>

      <div className="main-section">
        <Navbar onMenuClick={handleMenuClick} display={sidebarOpen ? "block" : "none"}  />

<main className={`main-content ${sidebarOpen ? "sidebar-active" : ""}`}>
          <Outlet />
        </main>
      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App Pages */}
        <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/import-contacts" element={<ImportContacts />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route
  path="/edit-contact/:id"
  element={<EditContact />}
/>
          <Route path="/messages" element={<Messages />} />
          <Route path="/send-sms" element={<SendSms />} />
          <Route path="/create-templates" element={<CreateTemplates />} />
<Route path="/create-templates/:id" element={<CreateTemplates />} />
          <Route path="/automations" element={<Automations />} />
          <Route
  path="/new-automation"
  element={<NewAutomation />}
/>

<Route
  path="/new-automation/:id"
  element={<NewAutomation />}
/>
          <Route path="/history" element={<History />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          

        </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;