import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RecipeManager.css";

const baseURL = process.env.REACT_APP_API_BASE;

export default function RecipeManager() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    ingredients: "",
    steps: "",
    image: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recipePerPage = 3;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`${baseURL}/recipes`, { headers });
        setRecipes(res.data || []);
      } catch (err) {
        if (localStorage.getItem("token")) {
          setError(err.response?.data?.message || "Failed to load recipes");
        }
      }
    };
    fetchRecipes();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Unauthorized: Please log in.");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (isEditing && editingId) {
        await axios.put(`${baseURL}/recipes/${editingId}`, formData, { headers });
      } else {
        await axios.post(`${baseURL}/recipes`, formData, { headers });
      }

      const updated = await axios.get(`${baseURL}/recipes`, { headers });
      setRecipes(updated.data || []);
      setFormData({ title: "", time: "", ingredients: "", steps: "", image: "" });
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
    } catch (err) {
      alert(err.response?.data?.message || "Error saving recipe");
    }
  };

  const handleEdit = (recipe) => {
    setFormData({
      title: recipe.title,
      time: recipe.time,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      image: recipe.image || ""
    });
    setIsEditing(true);
    setEditingId(recipe._id);
    setShowForm(true);
  };

  const handleDelete = async (recipe) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Unauthorized");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.delete(`${baseURL}/recipes/${recipe._id}`, { headers });
      const updated = await axios.get(`${baseURL}/recipes`, { headers });
      setRecipes(updated.data || []);
    } catch (err) {
      alert("Error deleting recipe");
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe?.title?.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLast = currentPage * recipePerPage;
  const indexOfFirst = indexOfLast - recipePerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast);
  const paginate = (page) => setCurrentPage(page);

  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px", padding: "10px" }}>
        <Link to="/login">
          <button className="loginBtn">Sign In</button>
        </Link>
        <button className="logoutBtn" onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/recipes";
        }}>
          Logout
        </button>
        <button className="topRightAddBtn" onClick={() => {
          setIsEditing(false);
          setFormData({ title: "", time: "", ingredients: "", steps: "", image: "" });
          setShowForm(true);
        }}>
          Add Recipe
        </button>
      </div>

      <h1 className="title">🍽️ Recipe Sharing Platform</h1>

      <input type="text" placeholder="Search recipes..." className="searchBox" value={search} onChange={(e) => setSearch(e.target.value)} />

      {showForm && (
        <form className="recipeForm" onSubmit={handleAddOrUpdate}>
          <input type="text" name="title" placeholder="Dish Title" value={formData.title} onChange={handleInputChange} required />
          <input type="text" name="time" placeholder="Preparation Time" value={formData.time} onChange={handleInputChange} required />
          <textarea name="ingredients" placeholder="Ingredients (comma separated)" value={formData.ingredients} onChange={handleInputChange} required />
          <textarea name="steps" placeholder="Steps (comma separated)" value={formData.steps} onChange={handleInputChange} required />
          <input type="text" name="image" placeholder="Image URL (optional)" value={formData.image} onChange={handleInputChange} />
          <div className="formButtons">
            <button type="submit" className="btnAdd">{isEditing ? "Update Recipe" : "Add Recipe"}</button>
            <button type="button" className="btnCancel" onClick={() => {
              setShowForm(false);
              setFormData({ title: "", time: "", ingredients: "", steps: "", image: "" });
              setIsEditing(false);
              setEditingId(null);
            }}>Cancel</button>
          </div>
        </form>
      )}

      {error && <p className="errorMsg">{error}</p>}

      <div className="cardContainer">
        {currentRecipes.map((recipe) => (
          <div key={recipe._id} className="card">
            <img src={recipe.image || "https://via.placeholder.com/300x200?text=Recipe"} alt={recipe.title} className="cardImage" />
            <h2>{recipe.title}</h2>
            <p><strong>Prep Time:</strong> {recipe.time}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>{recipe.ingredients.split(",").map((i, idx) => <li key={idx}>{i.trim()}</li>)}</ul>
            <p><strong>Steps:</strong></p>
            <ol>{recipe.steps.split(",").map((s, idx) => <li key={idx}>{s.trim()}</li>)}</ol>
            <div className="cardButtons">
              <button onClick={() => handleEdit(recipe)} className="editBtn">Edit</button>
              <button onClick={() => handleDelete(recipe)} className="deleteBtn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredRecipes.length / recipePerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={`paginationBtn ${currentPage === index + 1 ? "active" : ""}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
