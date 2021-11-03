import React,{useState,useEffect} from "react"
import "./Card.css"
import { Link } from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { listProducts } from "../../../actions/productActions"
import { addToCart } from "../../../actions/cartActions"

function Card(props)
{
 const [isAdd, setAdded] = useState(false)

 const dispatch = useDispatch()
 const productsList=useSelector(state=>state.productList)
 const{loading,error,products}=productsList

 const cartDetails = useSelector((state) => state.cart)
 const { cartItems } = cartDetails


const addProductToCart=()=>
    { 
      let qty=0
      setAdded(true)
      //check if item already exist in bag
      cartItems.forEach(element => {
        if(element.id===props.id)
        qty=element.qty 
      });

      qty>0?dispatch(addToCart(props.id,qty+1)):dispatch(addToCart(props.id,1))
     
       
        // setTimeout(()=>{ props.updateCart()},500)
        setTimeout(()=>{ setAdded(false)},250)
     }


        
       return(
          <div>
               <div  className="card">
                   <Link className="card-product" style={{textDecoration:"none"}} to={{pathname:`/Catalog/${props.id}`}} >                  
                    <img  src={props.image} className="card-img-top" alt="..."/>
                    <label className="mb-2 card-name">{props.name}</label> 
                   </Link> 
                     <div   className="d-flex justify-content-between cardLabel">
                        <label>{props.price}$</label> 
                    
                        {isAdd &&  <img  className="animCard" src={props.image} alt="" />}
                        <button className="freeBtn" onClick={()=>addProductToCart() }><img className="iconAdd"src="https://img.icons8.com/dotty/32/83176B/add-shopping-cart.png"/></button>
                      
                        <label>{props.weight}</label> 
                    </div>
 
                </div>
          </div>)  
}
// const mapStateToProps = (state) => {
//   return {
//     numOfItem: state.cartReducer.numOfItem
//   }}

//   const mapDispatchToProps = (dispatch) => {
//   return {updateCart: () =>  dispatch(updateCart()) }
// } 

export default Card