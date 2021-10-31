import React,{ useEffect,useState } from "react"
import {useDispatch,useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import Loader from '../Loader'
import { listRecipes } from "../../actions/recipeAction"



const RecipeScreen = ({history,match}) => {
    const dispatch = useDispatch()

    const recipesList=useSelector(state=>state.recipesList)
    const{loading,error,recipes}=recipesList

    const userLogion=useSelector(state=>state.userLogin)
    const {userInfo}=userLogion

    useEffect(() => {
        dispatch(listRecipes())
     
    }, [dispatch,userInfo])


    return (
        <> 
        <div className="d-flex justify-content-between">
            <div className="d-flex-column"> 
                <h1>Recipes</h1>
            </div>
        
        </div>
        {loading ? <Loader/> : error ? <p>{error}</p>:
            <div>
            <Table  border hover responsive className="table-sm">
                <thead>
                    <th>NAME</th>
                    <th>Category</th>
                    <th></th>
                </thead>
                <tbody>
                    {
                        recipes.map(recipe=>
                            (
                             <tr key={recipe._id}>
                                 <td>{recipe._id}</td>
                                 <td className="td-name">{recipe.name}</td>
                                 <td className="td-name">{recipe.category}</td>
                             </tr>
                            ))
                    }
               </tbody>
            </Table>
        </div>}
        </>
    )
}

export default RecipeScreen