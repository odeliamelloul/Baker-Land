import React, {useState,useEffect}  from "react"
import { Link} from "react-router-dom"
import "./category.css"
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import { listProducts } from "../../actions/productActions"
 

function  Category (props)
{
  const productsList=useSelector(state=>state.productList)
  const{loading,error,products}=productsList
  const dispatch = useDispatch()
  let resultFilter

  useEffect(() => {
    dispatch(listProducts())
    localStorage.setItem("filteredProducts",JSON.stringify(products))
  }, [dispatch])



  // 'cake decoration','spread','powder','without gluten','extract','ganache','new'
   const filterByCategories=(name)=>
    {
    //  resultFilter=products.filter((el) => el.categories.includes(name))
      switch (name) {
         case "milky":
         resultFilter=products.filter((el) => el.categories.includes("milky"))
         break;
         case "parve":
         resultFilter=products.filter((el) => el.categories.includes("parve"))
          break;
         case "spread":
           resultFilter=products.filter((el) => el.categories.includes("spread"))
         break;
         case "powder":
           resultFilter=products.filter((el) => el.categories.includes("powder"))
         break;
         case "ganache":
           resultFilter=products.filter((el) => el.categories.includes("ganache"))
         break;
         case "extract":
           resultFilter=products.filter((el) => el.categories.includes("extract"))
         break;
         case "cake decoration":
           resultFilter=products.filter((el) => el.categories.includes("cake decoration"))
         break;
         case "all":
           resultFilter=products
         break;
         case "new":
            
            resultFilter=products.filter((el) => el.categories.includes("new"))
         break;
         case "cheapest":
           resultFilter=products.sort(function(a, b){return a.price-b.price});
          console.log(resultFilter)
           break;
        default:
         resultFilter=products
          break;
      }
    
      localStorage.setItem("filteredProducts",JSON.stringify(resultFilter))
    }
    const milky=()=>
    {
        let products=JSON.parse(localStorage.getItem("filteredProducts"))
        let resultFilter=products.filter((el) => el.categories.includes("milky"))
        localStorage.setItem("filteredProducts",JSON.stringify(resultFilter))
    }
   const  parve=()=>
    {
        let products=JSON.parse(localStorage.getItem("filteredProducts"))
        let resultFilter=products.filter((el) => el.categories.includes("parve"))
        localStorage.setItem("filteredProducts",JSON.stringify(resultFilter))
    }
    const noGluten=()=>
    {
        let products=JSON.parse(localStorage.getItem("filteredProducts"))
        let resultFilter=products.filter((el) => el.categories.includes("milky"))
        localStorage.setItem("filteredProducts",JSON.stringify(resultFilter))
    }


  
        return(
          
             <div  className=" d-flex flex-column  category">
                     
                      <strong> <h1 className="categoryHead" >Categories</h1></strong>
                      <Link onClick={()=>filterByCategories("all")}   >All</Link> 
                      
                      {/* <Link onClick={()=>filterByCategories("cheapest")}  >Cheapest to expensive</Link> */}
                      <Link className="category-link" onClick={()=>filterByCategories("new")}   >News</Link> 
                      <Link className="category-link" onClick={()=>filterByCategories("powder")} >Powder</Link>
                      <Link className="category-link" onClick={()=>filterByCategories("spread")} >Spreads</Link>  
                      <Link className="category-link" onClick={()=>filterByCategories("extract")} >Extract</Link>  
                      <Link className="category-link" onClick={()=>filterByCategories("ganache")} >ganache</Link>  
                      <Link className="category-link" onClick={()=>filterByCategories("cake decoration")} >Cake Decoration</Link>
                    
                     <div className="d-flex flex-column ">
                         <h1 className="categoryHead">Filter By:</h1>
                         <Link className="btnCategory" onClick={()=>milky()} >Milky</Link>
                         <Link className="btnCategory" onClick={()=>parve()}>Parve</Link>
                         <Link className="btnCategory" onClick={()=>parve()}>Without gluten</Link>

                         {/* <Link onClick={()=>noGluten()}>Without Gluten</Link> */}
                     </div>
                </div>
                )
    

}
export default Category