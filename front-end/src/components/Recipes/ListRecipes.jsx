import React, { useState ,useEffect} from 'react'
import { listRecipes } from '../../actions/recipeAction'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import "./Recipes.css"
import Loader from '../Loader'

function ListRecipes({recipesType})
{
  const recipesList=useSelector(state=>state.recipesList)
  const{loading,error,recipes}=recipesList

  const dispatch = useDispatch()
  useEffect(() => {
       dispatch(listRecipes())
    }, [])
    

        const allRecipes=recipes.filter((item)=>item.category===recipesType)
        return(
          <>
          {loading ? <Loader/>:
          <div className="wrapEasy">
            <h1 className="headerR">{recipesType==="Easy"?"Easy recipes":"Chef recipes"}</h1>
            <div className="d-flex justify-content-between  wrap-easy-img" >

               {             
                 allRecipes.map((item)=>
                        <Link  to={{pathname:`/Recipe/${item._id}`}}>
                            <img width="300px" height="250px" src={item.image}/>
                            <h6 className="nameRecipes">{item.name}</h6>
                        </Link>
                ) }   
               
            </div> 
          </div>}
          </>
        )
    }

export default ListRecipes
