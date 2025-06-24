import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    pw: ""
  });
  const [error, setError] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/auth/login", formData);
      localStorage.setItem("token", res.data.t);
      navigate("/recipes");
    } catch (err) {
      const msg = err.response?.data?.e || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="authContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="authForm">
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
          name="pw"
          placeholder="Password"
          value={formData.pw}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
       {/* 🔁 Link to Register */}
    <p className="switchAuth">
      Don't have an account? <Link to="/register">Register</Link>
    </p>
      {error && <p className="errorMsg">{error}</p>}
    </div>
  );
}

export default Login;