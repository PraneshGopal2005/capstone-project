import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import RecipeManager from "./components/RecipeManager";

function App() {
  return (
    <Router>
      <Routes>
        {/* This makes sure root "/" redirects to /recipes */}
        <Route path="/" element={<Navigate to="/recipes" />} />
        <Route path="/recipes" element={<RecipeManager />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;