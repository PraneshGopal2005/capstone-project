import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import RecipeManager from "./components/RecipeManager";

function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Default route opens Dashboard */}
        <Route path="/" element={<RecipeManager />} />

        {/* 👇 Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👇 Optional redirect if someone manually types /recipes */}
        <Route path="/recipes" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
