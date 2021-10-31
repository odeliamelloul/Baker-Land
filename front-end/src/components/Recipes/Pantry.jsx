import React, {useRef,useState,useEffect} from  'react'
import ingredients from '../../ingredients'
import AllRecipes from "../../AllRecipes"
import { Link } from "react-router-dom"

import Recipe from './Recipe'

function Pantry() {
const itemEls = useRef([])
const [chooseArr, setChooseArr] = useState([])
const [ingRecipe, setIngRecipe] = useState(AllRecipes.map(Recipe=>({ing:Recipe.toShop,id:Recipe.id})))
const [matchRecipe, setMatchRecipe] = useState([])
const [flag, setFlag] = useState(false)

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
            itemEls.current[id].style.backgroundColor="rgb(199 105 178)"
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
        <div>
            <h1>Your Pantry</h1>
            
                    <p>Click on the products you have so we can show you match recipes </p>
                    <div className="pantry d-flex flex-wrap">
                        {
                            ingredients.map((ing,index)=><button onClick={()=>addNewIng(index,ing.IngName)} ref={addToRef} id={index} className="ing-btn-pantry">{ing.IngName}</button>)
                        }
                    </div>
                    <button className="btn-check-recipe" onClick={showRecipes}>Check matched Recipes</button>
                    {
                        matchRecipe.length==0 && flag &&
                        <p>sorry not find any recipe that match your choose</p>
                    }
                   
                    <div className="d-flex flex-wrap wrapEasy ">
                    { matchRecipe.map((idRecipe)=>
                            AllRecipes.map((item)=>
                            { if(item.id===idRecipe)
                                return (<Link  className="matched-recipe" to={{pathname:`/Recipe/${item.RecipeName.replaceAll(" ","-")}`}}>
                                        <img width="300px" height="169px" src={item.img} alt="" />
                                        <h5  className="nameRecipes" >{item.RecipeName}</h5> 
                                        </Link>)
                            })
                        )}
                    </div>
             
            
        </div>
    )
}

export default Pantry
