import React, {useRef,useState,useEffect} from  'react'
import ingredients from '../../ingredients'
import { Link } from "react-router-dom"
import Recipe from './Recipe'
import { useDispatch, useSelector } from 'react-redux'
import { listRecipes } from '../../actions/recipeAction'

function Pantry() {
const itemEls = useRef([])
const [chooseArr, setChooseArr] = useState([])
const [matchRecipe, setMatchRecipe] = useState([])
const [flag, setFlag] = useState(false)


const recipesList=useSelector(state=>state.recipesList)
const{loading,error,recipes}=recipesList
let ingRecipe=[]

const dispatch = useDispatch()
useEffect(() => {
     dispatch(listRecipes())
  }, [loading])
   
  if(recipes && recipes.length>0)
  {
      console.log(recipes)
    ingRecipe=recipes.map(Recipe=>({ing:Recipe.toShop,id:Recipe._id}))
  }

    const addToRef=(el)=>
    {
        if(el && !itemEls.current.includes(el) )
            itemEls.current.push(el)
    }

    const addNewIng=(id,ingName)=>
    {

        // remove on twice click
        if(chooseArr.includes(ingName))
        {
            itemEls.current[id].style.backgroundColor="#fff9ed"
            itemEls.current[id].style.color="rgb(131, 23, 107)" 
            setChooseArr(chooseArr.filter((item)=>item!==ingName))
        }
        else{
            itemEls.current[id].style.color="white"
            itemEls.current[id].style.backgroundColor="#e8b4dc"
            setChooseArr([...chooseArr,ingName])
        }   
    }
    

    const showRecipes=()=>
    { 
      setFlag(true)
      let findRecipe=[]
      ingRecipe.forEach(item =>
        {
            let matched= item.ing.every(v =>chooseArr.includes(v))
            console.log(matched)
            if(matched) 
            findRecipe=[...findRecipe,item.id]

        });
       setMatchRecipe(findRecipe);
    }
    return (
        <div className ="wrap-pantry">
            <h1>Your Pantry</h1>
            
                    <p>Click on the products you have so we can show you match recipes </p>
                    <div className="pantry d-flex flex-wrap">
                        {
                            ingredients.map((ing,index)=>
                        <button onClick={()=>addNewIng(index,ing.name)} ref={addToRef} id={index} className="ing-btn-pantry"><img src={ing.image} alt="" />
                            <p>{ing.name}</p>
                        </button>)
                        }
                    </div>
                    <button className="btn-check-recipe" onClick={showRecipes}> <a href='#matched-recipe'>Check matched Recipes</a></button>
                    {
                        matchRecipe.length==0 && flag &&
                        <p>sorry not find any recipe that match your choose</p>
                    }
                   
                    <div id="all-matched-recipes" className="d-flex flex-wrap wrapEasy">
                    { matchRecipe.map((idRecipe)=>
                            recipes.map((item)=>
                            { if(item._id===idRecipe)
                                return (<Link  className="matched-recipe" to={{pathname:`/Recipe/${item.name.replaceAll(" ","-")}`}}>
                                        <img src={item.image} alt="" />
                                        <h5  className="nameRecipes" >{item.name}</h5> 
                                        </Link>)
                            })
                        )}
                    </div>
             
            
        </div>
    )
}

export default Pantry
