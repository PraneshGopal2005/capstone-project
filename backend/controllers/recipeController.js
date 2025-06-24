const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({ ...req.body, createdBy: req.u.id }); 
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    console.error("❌ Create Recipe Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};


exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('createdBy', 'username email');
    res.json(recipes); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
