import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "" // ✅ changed from 'pw' to 'password'
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/auth/register", formData);
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.e || "Registration failed";
      setError(msg);
    }
  };

  return (
    <div className="authContainer">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="authForm">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password" // ✅ changed from 'pw' to 'password'
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      <p className="switchAuth">
        Already have an account? <Link to="/login">Login</Link>
      </p>

      {error && <p className="errorMsg">{error}</p>}
    </div>
  );
}

export default Register;
