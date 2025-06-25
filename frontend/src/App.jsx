import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
