import React, { useState } from "react";
import "./style.css";

export default function App() {
  const [recipes, setRecipes] = useState([
    {
      name: "Pasta Arrabiata",
      time: "20 mins",
      ingredients: "Pasta, Tomato, Garlic, Chili",
      steps: "Boil pasta, Cook sauce, Mix and serve",
      image: "https://source.unsplash.com/300x200/?pasta"
    },
    {
      name: "Paneer Butter Masala",
      time: "30 mins",
      ingredients: "Paneer, Butter, Tomato, Spices",
      steps: "Cook tomato base, Add paneer, Simmer",
      image: "https://source.unsplash.com/300x200/?paneer"
    },
    {
      name: "Veg Pulao",
      time: "25 mins",
      ingredients: "Rice, Vegetables, Spices, Ghee",
      steps: "Cook veggies, Add rice, Steam and serve",
      image: "https://source.unsplash.com/300x200/?pulao"
    }
  ]);

  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    ingredients: "",
    steps: "",
    image: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updated = [...recipes];
      updated[editingIndex] = formData;
      setRecipes(updated);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      setRecipes([...recipes, formData]);
    }

    setFormData({ name: "", time: "", ingredients: "", steps: "", image: "" });
  };

  const handleEdit = (index) => {
    setFormData(recipes[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...recipes];
    updated.splice(index, 1);
    setRecipes(updated);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">🍽️ Recipe Sharing Platform</h1>

      <input
        type="text"
        placeholder="Search recipes..."
        className="searchBox"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form className="recipeForm" onSubmit={handleAddOrUpdate}>
        <input
          type="text"
          name="name"
          placeholder="Dish Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="time"
          placeholder="Preparation Time"
          value={formData.time}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={formData.ingredients}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="steps"
          placeholder="Steps (comma separated)"
          value={formData.steps}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleInputChange}
        />
        <button type="submit" className="btnAdd">
          {isEditing ? "Update Recipe" : "Add Recipe"}
        </button>
      </form>

      <div className="cardContainer">
        {filteredRecipes.map((recipe, index) => (
          <div key={index} className="card">
            <img
              src={
                recipe.image || "https://via.placeholder.com/300x200?text=Recipe"
              }
              alt={recipe.name}
              className="cardImage"
            />
            <h2>{recipe.name}</h2>
            <p><strong>Prep Time:</strong> {recipe.time}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
              {recipe.ingredients.split(",").map((ing, i) => (
                <li key={i}>{ing.trim()}</li>
              ))}
            </ul>
            <p><strong>Steps:</strong></p>
            <ol>
              {recipe.steps.split(",").map((step, i) => (
                <li key={i}>{step.trim()}</li>
              ))}
            </ol>
            <div className="cardButtons">
              <button onClick={() => handleEdit(index)} className="editBtn">Edit</button>
              <button onClick={() => handleDelete(index)} className="deleteBtn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
