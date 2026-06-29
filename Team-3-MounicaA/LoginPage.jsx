import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [role, setRole] = useState("");

  const handleLogin = () => {
    if (role === "Admin") {
      alert("Admin Login");
    } else if (role === "Employee") {
      alert("Employee Login");
    } else {
      alert("Please select a role");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Complaint Management System</h2>

        <label>Select Role</label>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
        </select>

        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <button onClick={handleLogin}>Login</button>

        <p className="forgot">Forgot Password?</p>
      </div>
    </div>
  );
};

export default LoginPage;