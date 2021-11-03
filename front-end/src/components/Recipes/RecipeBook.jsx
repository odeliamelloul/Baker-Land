import React from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { useState,useEffect } from 'react'
import {createRecipe, listRecipes} from '../../actions/recipeAction'
import CarouselBookRecipe from './CarouselBookRecipe';


const RecipeBook = ({history}) => {
    const dispatch = useDispatch()
    
    const recipeCreate=useSelector(state=>state.recipeCreate)
    const{loading,error,success,recipe:createdRecipe}=recipeCreate

    useEffect(() => {
    if(success)
    {
        history.push(`/RecipeEdit/${createdRecipe._id}/edit`)
    }
    }, [success,createdRecipe])


    const crateRecipe=()=>
    {
        history.push(`CreateRecipe`)
    }

    return (
        <>
        <div>
            <h1>My Recipes Book</h1>
            <div className="container-book">
                 <button className="create-recipe-btn" onClick={crateRecipe} >
                    <i className='fa fa-plus'></i>Create Recipe
                 </button>
            
            <CarouselBookRecipe />
           </div>
        </div>
        </>
    )
}

export default RecipeBook
