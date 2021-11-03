import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { createRecipe } from '../../../actions/recipeAction';
import { updateUserProfile } from '../../../actions/userActions';
import { RECIPE_UPDATE_RESET } from '../../../constants/recipeConstant';
import Loader from "../../Loader";
import AddIngredients from './AddIngredients';
import AddStepMethod from './AddStepMethod';
import UpdateIngridients from './UpdateIngridients'

const CreateRecipe = ({match,history}) => {

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
    const [description,setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [ErrArr,setErrArr] = useState([])
    

    const dispatch = useDispatch()

    const recipeCreate=useSelector(state=>state.recipeCreate)
    const{loading,error,success,recipe}=recipeCreate

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    useEffect(() => {
        console.log(userInfo)
        if(success)
        {
            dispatch({type:RECIPE_UPDATE_RESET})
            let newRecipesBook= [...userInfo.myRecipe,recipe._id]
            dispatch(updateUserProfile({id:userInfo._id,myRecipe:newRecipesBook}))
            history.push(`/RecipeBook`)
        }
        }, [success])
    
                
   
      const sendForm=(e)=>{
        e.preventDefault()
        let errorArray=[]
        if(name==="")
          errorArray.push("please enter a correct Recipe Name")
        if(image==="")
          errorArray.push("please enter a correct Image Url")
        if(isNaN(quantity))  
           errorArray.push("quantity- only number")
        if(isNaN(calories))  
           errorArray.push("calories- only number")
        if(ingredients.length===0)  
           errorArray.push("please add ingredients")
        if(steps.length===0)  
           errorArray.push("please add steps")
        if(timePrepare==="")  
           errorArray.push("please enter a time to prepare")
        if(timeCook==="")  
           errorArray.push("please enter a time to cook")
        if(category==="")  
           errorArray.push("please choose a category")
         setErrArr(errorArray)

        if(errorArray.length===0)
           dispatch(createRecipe(name,image,ingredients,quantity,timeCook, timePrepare,toShop,steps, description,calories,Tip,category))
         }
    
      
      const handleChangeCategory = (e) => {
        setCategory(e.target.value)
      };

      const getName=(name)=>{
      setToShop([...toShop,name.toLowerCase()])
      }

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
    
    {loading ? <Loader/>:error?<p>{error}</p>
    :
    (<>
     { ErrArr.length>0 && 
       <div className="ErrForm">
            <ul> {ErrArr.map(item=><li>{item}</li>)}</ul>
        </div>
        }
    <form  onSubmit={sendForm}>
    <div  className="d-flex wrap-edit-recipe">
        <div className="d-flex flex-column form-recipe">
            <label>Recipe Name</label>
            <input  type="text" value={name} onChange={(e)=>setName(e.target.value)}placeholder="enter Recipe name" />   
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
            <label>cook Time</label>
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
        {success && <p>Recipe was Created succesfully </p> }
        </form></>)
        }
        

        </div> 
        </>
    )
}

export default CreateRecipe
