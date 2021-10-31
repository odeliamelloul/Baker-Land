import Recipe from '../models/recipeModel.js'
import asyncHandler from 'express-async-handler'


//Create New Recipe
//Post /api/Recipes
//public
const addRecipe = asyncHandler(async (req, res) => {
    
        const recipe = new Recipe(
            {
                name: "Recipe name",
                image: "Url",
                ingredients: [],
                quantity: 0,
                timeCook: 0,
                timePrepare: 0,
                toShop:[],
                steps: [],
                description: "description",
                calories: 0,
                Tip:"Tip",
                category:"category"
            }
        )
        const createdRecipe= await recipe.save()
        res.status(201).json(createdRecipe)
        
    }
)

//get all Recipes
//get /api/Recipes
//public
const getRecipes= asyncHandler(async(req,res)=>{
     const recipes=await Recipe.find({})
     res.json(recipes)
 })

 const getRecipeByID= asyncHandler(async(req,res)=>{
  const recipe=await Recipe.findById( req.params.id)
  if (recipe) {
      res.json(recipe)
  } else {
      res.status(404).json({message:'Recipe not found'})
  }
})


 

// @desc    Update a recipes
// @route   POST /api/recipess/:id
// @access  Private/User
const updateRecipes = asyncHandler(async (req, res) => {
    const {
        name,
        image,
        ingredients,
        quantity,
        timeCook,
        timePrepare,
        toShop,
        steps,
        description,
        calories,
        Tip,
        category,
    } = req.body
    
    const recipe = await Recipe.findById(req.params.id)
  
    if(recipe){
        recipe.name=name
        recipe.image=image
        recipe.ingredients=ingredients
        recipe.quantity=quantity
        recipe.timeCook=timeCook
        recipe.timePrepare=timePrepare
        recipe.toShop=toShop
        recipe.steps=steps
        recipe.description=description
        recipe.calories=calories
        recipe.Tip=Tip
        recipe.category=category
        recipe.description=description
  
      const updatedRecipe = await recipe.save()

      res.json(updatedRecipe)
    } else {
      res.status(404)
      throw new Error('recipe not found')
    }
  })

export {addRecipe,getRecipes,updateRecipes,getRecipeByID}
