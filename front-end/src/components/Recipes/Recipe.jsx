import React, { useState ,useEffect} from 'react'
import "./Recipes.css"
import IngModal from './IngModal'
import { listRecipes } from '../../actions/recipeAction'
import { useSelector,useDispatch } from 'react-redux'
import Loader from '../Loader'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'

export default function Recipe({match,history}) {
  
  // const[showModal,setShowModal]=useState(false)
  const[recipeAdded,setRecipeAdded]=useState(false)
  // const showIngModal=()=> {setShowModal(true) }
  
  const recipesList=useSelector(state=>state.recipesList)
  const{loading,error,recipes}=recipesList
  const userDetails=useSelector((state)=>state.userDetails)
  const {loading:loadingUser,user}=userDetails
  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin

  let recipe=[]
  const dispatch = useDispatch()

  useEffect(() => {
    
    if(!loadingUser){
      dispatch(getUserDetails('profile'))
      }
      dispatch(listRecipes())
 
}, [loading])


if(recipes.length>0)
{
  console.log(recipes)
  recipe=recipes.find((item)=> item.name===match.params.id.replaceAll("-"," "))
   console.log(recipe)
}

const addRecipeToBook=(id)=>
{
  console.log(user)
if(user)
 {
    setRecipeAdded(true) 
    user.myRecipe=[...user.myRecipe,id]                                                                                                                                                                                                                            
    dispatch(updateUserProfile({id:user._id,myRecipe:user.myRecipe}))
 } else {
    history.push({pathname:"/SignIn",state:{name:window.location.pathname}})
  }
}

    return (
      <>
      {loading ? <Loader/>:
        <div className="d-flex flex-column">
             
             <div  className="wrapRecipe">
                 <h2 className="headerR">{recipe.name}</h2>
                 <div className="d-flex wrapHeader"> 
                  <img className="recipe-image"  src={recipe.image} alt="" />
                  <div className="d-flex flex-column infoR">
                    <div className="description">{recipe.description}</div>

                    <div className="d-flex flex-column  detailsR">
                    <div className="d-flex time">
                      <img src="https://img.icons8.com/ultraviolet/32/000000/timer.png"/>
                        <span className="d-flex flex-column">
                        <div style={{color: "grey"}}>Prepare Time</div>
                        {recipe.timeCook}
                        </span>

                        <span className="d-flex flex-column">
                        <div style={{color: "grey"}}>Cook Time</div>
                        {recipe.timePrepare}
                        </span>
                      </div>
                    <div><img src="https://img.icons8.com/ultraviolet/32/000000/crowd.png"/><span>  {recipe.quantity} serves</span></div>
                    <div><img src="https://img.icons8.com/ultraviolet/40/000000/caloric-energy.png"/><span>{recipe.calories} calories</span></div>
                    </div>
                    <div>
                    {/* <button className="btnRecipes"> Share</button> */}
                    {(user && user.myRecipe|| recipeAdded)  &&
                      user.myRecipe.includes(recipe._id)
                    ?
                      <p style={{color:"rgb(199 125 83)"}}>This recipe is in your <img src="https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/32/000000/external-recipe-book-baking-and-bakery-icongeek26-outline-colour-icongeek26.png"/></p>
                    :
                    <div>
                      <button onClick={()=>addRecipeToBook(recipe._id)} className="btnRecipes">add recipe to your <img src="https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/32/000000/external-recipe-book-baking-and-bakery-icongeek26-outline-colour-icongeek26.png"/></button>
                    </div>
                    
                    }
                    </div>
                  </div>
                </div> 
                <div className="ingredients">
                    <div>
                        <h2 className="headerR"> ingredients:  </h2>
                        <ul >{recipe.ingredients===undefined?<Loader/>: recipe.ingredients.map((item)=> <li>{item}</li>)} </ul>  
                     </div>    
                       <IngModal className="IngModal"  toShop={recipe.toShop}/>
                 </div>
                 <div>
                 <div className="steps">
                   <h2 className="headerR"> Method: </h2>
                   <ol >{recipe.steps===undefined?<Loader/>: recipe.steps.map((item)=> <li>{item} <hr/></li>)} </ol>  
                  </div>
                 </div>
                 {recipe.Tip!=="" &&
                 <div className="tips">
                 <h2 className="headerR"> Recipes Tips: </h2>
                  <div>{recipe.Tip}</div>
                 </div>
                 }
             </div>   


        </div>
}
</>)
}
