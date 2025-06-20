import React, { useState } from "react";
import "./RecipeManager.css";

export default function App() {
  const [recipes, setRecipes] = useState([
    {
      name: "Pasta Arrabiata",
      time: "20 mins",
      ingredients: "Pasta, Tomato, Garlic, Chili",
      steps: "Boil pasta, Cook sauce, Mix and serve",
      image: "https://theplantbasedschool.com/wp-content/uploads/2024/01/Penne-with-arrabbiata-sauce-4.jpg"
    },
    {
      name: "Paneer Butter Masala",
      time: "30 mins",
      ingredients: "Paneer, Butter, Tomato, Spices",
      steps: "Cook tomato base, Add paneer, Simmer",
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-butter-masala-recipe-2.jpg"
    },
    {
      name: "Veg Pulao",
      time: "25 mins",
      ingredients: "Rice, Vegetables, Spices, Ghee",
      steps: "Cook veggies, Add rice, Steam and serve",
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2018/07/pulao-recipe.jpg"
    },
    {
      name: "Spaghetti Agilo e Olio (Garlic & Oil Pasta)",
      time: "15 mins",
      ingredients: "Spaghetti, olive oil, garlic, red chilli flakes, parsley",
      steps: "Cook spaghetti, Sauté garlic and chili flakes in olive oil., Toss pasta into it and garnish with parsley",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_8w9y_wUz517Gaz8huMjp30gbD6QSrgV7OA&s"
    },
    {
      name: "Chicken Quesadilla",
      time: "20 mins",
      ingredients: "Torilla,cooked chicken, chesse, bell peppers, onion",
      steps: "Fill tortilla with chicken,cheese and veggies, Fold and pen-grill until crispy and cheese melts, Serve with salsa or sour cream",
      image: "https://img.taste.com.au/0Kl93Czc/taste/2016/11/chicken-quesadillas-with-avocado-cream-5354-1.jpeg"
    },
    {
      name: "Veggie Tacos",
      time: "20 mins",
      ingredients: "Torilla,black beans, corn, avocado, salsa, cheese",
      steps: "Warm tortillas, Fill with sautéed beans/corn, top with salsa avocado cheese.",
      image: "https://www.connoisseurusveg.com/wp-content/uploads/2025/02/veggie-tacos-sq-2.jpg"
    },
    {
      name: "Margherita Pizza",
      time: "30 mins",
      ingredients: "Pizza dough, tomato sauce, mozzarella, basil, olive oil",
      steps: "Spread sauce on dough top with cheese and basil., Bake until cheese melts and crust is crisp",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX2w-6ljxAJtEImAJ4zBsRnou1CoSAVmgvQw&s"
    },
    {
      name: "Veg Hakka Noodles",
      time: "25 mins",
      ingredients: "Noodles, cabbage, carrot, capsicum, soy sauce, garlic",
      steps: "Boil noodles, rinse in cold water.Stir-fry garlic and veggies, add sauces. Toss in noodles and stir-fry 2–3 mins.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbphFTBemK-YW-qKHvMtOE5b21r_pRWM8Bxg&s"
    },
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
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recipePerPage = 3;

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

  const indexOfLastRecipes = currentPage * recipePerPage;
  const indexOfFirstRecipes = indexOfLastRecipes - recipePerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipes, indexOfLastRecipes);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="container">
      <h1 className="title">🍽️ Recipe Sharing Platform</h1>

      <button
        className="topRightAddBtn"
        onClick={() => {
          setIsEditing(false);
          setFormData({ name: "", time: "", ingredients: "", steps: "", image: "" });
          setShowForm(true);
        }}
      >Add Recipe</button>

      <input
        type="text"
        placeholder="Search recipes..."
        className="searchBox"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    {showForm && (
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
    )}

      <div className="cardContainer">
        {currentRecipes.map((recipe, index) => {
          const globalIndex = index + (currentPage - 1) * recipePerPage;
          return (
          <div key={globalIndex} className="card">
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
              <button onClick={() => handleEdit(globalIndex)} className="editBtn">Edit</button>
              <button onClick={() => handleDelete(globalIndex)} className="deleteBtn">Delete</button>
            </div>
          </div>
        );
      })}
      </div>
      {/* Pagination */}
    <div className="pagination">
      {Array.from({ length: Math.ceil(filteredRecipes.length / recipePerPage) }).map((_, index) => (
        <button
        key={index}
        onClick={() => paginate(index+1)}
        className={`paginationBtn ${currentPage === index + 1 ? "active" : ""}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
    </div>
  );
}
