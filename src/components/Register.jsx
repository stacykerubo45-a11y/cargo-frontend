import { Link } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Registration form submitted");
    navigate("/dashboard");
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="logo-section">
          <h1>Cargo Notify</h1>
          <p>
            Manage contacts, SMS campaigns, and automations with ease.
          </p>
        </div>

        <h2>Create Your Account</h2>

        <form className="register-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>

        </form>

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/">Sign In</Link>
        </p>

        

       

      </div>
    </div>
  );
}