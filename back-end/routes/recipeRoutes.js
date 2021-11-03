import express from 'express'
import {
    addRecipe,
    getRecipes,
    getRecipeByID,
    updateRecipes} from "../controllers/recipeController.js";

const router=express.Router()
router.route('/').post(addRecipe).get(getRecipes)
router.route('/:id').get(getRecipeByID).put(updateRecipes)


export default router