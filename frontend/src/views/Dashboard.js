import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeManager from "../components/RecipeManager";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <RecipeManager />;
}

export default Dashboard;
