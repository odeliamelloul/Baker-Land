
import React,{useState,useEffect} from 'react'
import { Link} from "react-router-dom"
import { addToCart, removeFromCart } from '../../actions/cartActions';
import {useDispatch,useSelector} from 'react-redux'


function BagItem ({product}){
const [amount, setAmount] = useState(product.qty)
const [favoriteSrc, setfavoriteSrc] = useState("https://img.icons8.com/windows/32/000000/like--v1.png")


useEffect(() => {
 console.log(product)
}, [])

const dispatch = useDispatch()
    const cartDetails = useSelector((state) => state.cart)
    const { cartItems } = cartDetails

 const addProduct=()=>{
    setAmount(amount+1)
    dispatch(addToCart(product.id,amount+1))
  }

  //remove one from this
  const removeProdct=()=>{
    if(amount>1){
      setAmount(amount-1)
      dispatch(addToCart(product.id,amount-1))
   }
   else{
    dispatch(removeFromCart(product.id))
   }

}
  

  const changeSrc=()=>
  {
      if(favoriteSrc!=="https://img.icons8.com/fluency/32/000000/like.png")
      setfavoriteSrc("https://img.icons8.com/fluency/32/000000/like.png")
      else
      setfavoriteSrc("https://img.icons8.com/windows/32/000000/like--v1.png")

  }

    return (
       
      <div className="d-flex cartItems"> 
           <Link   to={{pathname:`/Catalog/${product.name.replaceAll(" ","-")}`}}>
            <b>{product.name}</b>
            <img src={product.image}/>
           </Link>
          <div className=" DetailsItem">
                    <p>{product.weight}</p>
                    <p className="cart-price"> {product.price}$ </p> 

                <p  className="d-flex plusMinus">
                 <button className="plus" onClick={addProduct}>+</button>
                  <div className="amount">{amount}</div>
                 <button className="minus" onClick={removeProdct}>-</button>
                </p>
                  <p>{product.price*amount}$</p> 

                <div className=" d-flex flex-column btn">
                <button onClick={changeSrc}>
                    <img  src={favoriteSrc}/> 
                </button>    

                 <button  onClick={()=>{dispatch(removeFromCart(product.id))}}>delete</button>
               </div>           
             </div>      


        </div>
    )
}

// const mapStateToProps = (state) => {
//   return {
//     bag: state.cartReducer.bag,
//   }}

//   const mapDispatchToProps = (dispatch) => {
//   return {updateCart:()=>dispatch(updateCart()),
//           DeleteProduct:()=>dispatch(DeleteProduct()) }
// } 

export default BagItem 

