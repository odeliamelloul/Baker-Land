import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { listRecipes } from '../../actions/recipeAction'
import { getUserDetails } from '../../actions/userActions'
import Carousel from '../Carousel'

const CarouselBookRecipe = () => {
    // const [recipes, setRecipes] = useState([])

    const recipesList=useSelector(state=>state.recipesList)
    const{loading,error,recipes}=recipesList

    const userDetails=useSelector((state)=>state.userDetails)
    const {loading:loadingUser,user}=userDetails
    let NewRecipe=[]
    let myRecipe =[]
    const dispatch = useDispatch()
    
    useEffect(() => {
   
        if(!loadingUser){
        dispatch(getUserDetails('profile'))
        }
         
         if(!loading)
         {
           dispatch(listRecipes())
         }
        }, [loading])
        
        
        if(user.myRecipe && recipes)
            myRecipe = recipes.filter((recipe)=>user.myRecipe.includes(recipe._id))

        let rest=myRecipe.length%2
        for (let j=0;j<myRecipe.length-rest;j++)
        {
          NewRecipe.push([myRecipe[j],myRecipe[j+1]])
            j+=1
        }
        if(rest!==0){
          let element=[]
            for(let j=0;j<rest;j++)
            {
              element.push(myRecipe[myRecipe.length-rest+j])
            }
            NewRecipe.push(element)
          }  

    return (
        <>
            {NewRecipe.length===0?
            <div className="empty-book-recipe">
              <p>Your Recipe book is Empty <br /> you can create recipe or
               added recipe to your book from <a href="/Easy">recipes page</a></p>
            </div>
             :
             <>
            <Carousel  id="book-recipe-carousel-md">
              <div className="container-fluid">{
                NewRecipe.map(( row,index ) => 
                <div  className={index === 0 ? "carousel-item active" : "carousel-item"}>
                  {row.map(( item ) =>  
                    <div className="row rowCarousel">
                      <div className="col-3 img-center-vertical">
                        <Link  to={{pathname:`/Recipe/${item.name.replaceAll(" ","-")}`}}>
                            <img width="400px" height="450px" src={item.image}/>
                            <h6 className=" book-name-recipe">{item.name}</h6>
                        </Link>
                     </div>
                </div>)}</div> )} 
              </div>
            </Carousel>
            <Carousel id="book-recipe-carousel-sm">
            <div className="container-fluid">{
                myRecipe.map(( item,index ) => 
                  <div  className={index === 0 ? "carousel-item active" : "carousel-item"}>
                    <div className=" rowCarousel">
                      <div className="col-3 img-center-vertical">
                        <Link  to={{pathname:`/Recipe/${item.name.replaceAll(" ","-")}`}}>
                            <img width="450px" height="500px" src={item.image}/>
                            <h6 className=" book-name-recipe">{item.name}</h6>
                        </Link>
                     </div>
                     </div>
                </div> )} 
              </div>
            </Carousel>
            </>}
        </>
    )
}

export default CarouselBookRecipe
