import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import RecipeManager from "./components/RecipeManager";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeManager />} />     {/* 👈 Opens recipe page by default */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
