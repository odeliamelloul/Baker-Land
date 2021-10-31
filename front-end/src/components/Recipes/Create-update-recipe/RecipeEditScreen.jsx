import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { listRecipeDetails,updateRecipe } from '../../../actions/recipeAction';
import { updateUserProfile } from '../../../actions/userActions';
import { RECIPE_UPDATE_RESET } from '../../../constants/recipeConstant';
import Loader from "../../Loader";
import AddIngredients from './AddIngredients';
import AddStepMethod from './AddStepMethod';
import UpdateIngridients from './UpdateIngridients'

const RecipeEditScreen = ({match,history}) => {
    const recipeId=match.params.id
    const [image, setImage] = useState("")    
    const [name, setName] = useState('')    
    const [ingredients, setIngredients] = useState([])    
    const [quantity, setQuantity] = useState(0)    
    const [calories, setCalories] = useState(0)    
    const [timeCook, setTimeCook] = useState(0)    
    const [timePrepare, setTimePrepare] = useState(0)    
    const [toShop, setToShop] = useState([])
    const [steps, setSteps] = useState([])
    const [Tip, setTip] = useState("")
    const [description,setDescription] = useState([])
    const [category, setCategory] = useState('')
    const [ingName, setIngName] = useState("")
    

    const dispatch = useDispatch()

    const recipeDetails=useSelector(state=>state.recipeDetails)
    const {loading,error,recipe}=recipeDetails

    const recipeUpdate=useSelector(state=>state.recipeUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=recipeUpdate

    const userDetails=useSelector((state)=>state.userDetails)
    const {user}=userDetails

    useEffect(() => {
            if(successUpdate)
            {
                dispatch({type:RECIPE_UPDATE_RESET})
                user.myRecipe.push(recipeId)
                dispatch(updateUserProfile({id:user._id,myRecipe:user.myRecipe}))
            }else{

                if(!recipe.name || recipe._id!==recipeId )
                dispatch(listRecipeDetails (recipeId))
                
                else
                {
                    setName(recipe.name)
                    setImage(recipe.image)
                    setIngredients(recipe.ingredients)
                    setQuantity(recipe.quantity)
                    setCalories(recipe.calories)
                    setTimeCook(recipe.timeCook)
                    setTimePrepare(recipe.timePrepare)
                    setToShop(recipe.toShop)
                    setSteps(recipe.steps)
                    setTip(recipe.Tip)
                    setCategory(recipe.category)
                    setDescription(recipe.description)
                    
                }
            }
    }, [dispatch,recipeId,recipe,successUpdate])
   
      const sendForm=(e)=>{
        e.preventDefault()
        dispatch(updateRecipe(
            { _id:recipeId,
                name,
                image,
                ingredients,
                quantity,
                calories,
                timeCook,
                timePrepare,
                toShop,
                steps,
                Tip,
                category,
                description})) 
            history.push(`/RecipeBook`)         
          }

      
      const handleChangeCategory = (e) => {
        setCategory(e.target.value)
      };

      const getName=(name)=>{setIngName(name)}

      const addIngredients=(newIng)=>
      {
        console.log(newIng)
        setIngredients([...ingredients,newIng])
      }

      const addSteps=(newStep)=>
      {
        setSteps([...steps,newStep])
      }
      

return( 
<>
<div> 
   <h1>Create Recipe</h1>
    {loadingUpdate && <Loader/>}
    {errorUpdate &&<p>{errorUpdate}</p>}
    
    {loading ? <Loader/>:error?<p>{error}</p>
    :
    (
    <form  onSubmit={sendForm}>
    <div  className="d-flex wrap-edit-recipe">
        <div className="d-flex flex-column form-recipe">
            <label>Recipe Name</label>
            <input  type="text" value={name} onChange={(e)=>setName(e.target.value)}placeholder="enter product name" />   
            <label>Image</label>
            <input  type="text" value={image} onChange={(e)=>setImage(e.target.value)} placeholder="enter Image url" />
            <label>Description</label>
            <input  type="text" value={description} onChange={(e)=>setDescription(e.target.value)}  placeholder="enter description"/>
            
           <label>Select categories:</label>
           <div className="checkList">
                <input type="radio" name="levelRecipe" id="Easy" value="Easy" onChange={handleChangeCategory}/> <span>Easy</span>
                {/* <input type="radio" name="levelRecipe" id="Avearage" value="Avearage" onChange={handleChangeCategory}/><span>Avearage</span> */}
                <input type="radio" name="levelRecipe" id="Chef Recipe" value="Chef-Recipe" onChange={handleChangeCategory}/><span>Chef Recipe</span>
            </div>

        </div>
      
        <div className="d-flex flex-column form-recipe">
            <label>Number Of Servings</label>
            <input  type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)} />   
            <label>Baking Time</label>
            <input  type="time" value={timeCook} onChange={(e)=>setTimeCook(e.target.value)} placeholder="00:00:00" />
            <label>Preparation time</label>
            <input  type="time" value={timePrepare} onChange={(e)=>setTimePrepare(e.target.value)}  placeholder="00:00:00"/>
            <label>calories / serving</label>
            <input  type="text" value={calories} onChange={(e)=>setCalories(e.target.value)}  placeholder="00:00:00"/>
            
           <label>Tip for this recipe </label>
           <input  type="text" value={Tip} onChange={(e)=>setTip(e.target.value)}  />


        </div>
        <div className="d-flex flex-column form-recipe">
            <label>Enter Ingredients:</label>
            {ingredients.length>0 && 
            <div className="ul-ing">
            <ul >
              {ingredients.map((ing,index)=>( <li>{ing}</li>))}
            </ul>
            {/* <UpdateIngridients allIngredients={ingredients} UpdateIng={UpdateIng}/> */}
          </div>}
              <AddIngredients getName={getName}  addIngredients={addIngredients}/>
         </div> 

         <div className="d-flex flex-column form-recipe">
         <label>Enter Method:</label>
         {steps.length>0 &&
            <div className="ol-steps">
                <ol >
                  {steps.map((step,index)=>(<li>{step}</li>))}
                </ol>
            </div>}
            <AddStepMethod addSteps={addSteps}/>
        </div> 
        </div>
        <button  type="submit" className="signBtn mt-5">Create</button>
        {successUpdate && <p>Recipe was Created succesfully </p> }
        </form>)
        }
        

        </div> 
        </>
    )
}

export default RecipeEditScreen
