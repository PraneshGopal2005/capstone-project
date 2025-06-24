const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipeController');
const auth = require('../middlewares/authMiddleware');

router.get('/', controller.getRecipes);

router.post('/', auth, controller.createRecipe);

router.put('/:id', auth, controller.updateRecipe);
router.delete('/:id', auth, controller.deleteRecipe);

module.exports = router;
