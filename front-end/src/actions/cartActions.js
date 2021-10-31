import axios from "axios";
import {
  CARD_ADD_ITEM,
  CARD_REMOVE_ITEM,
  CARD_SAVE_SHIPPING_ADRESS,
  CARD_SAVE_PAYMENT_METHOD,
  CARD_SAVE_SHIPPING_METHOD
} from "../constants/cartConstant"

export const addToCart=(id,qty)=>async(dispatch,getState)=>
{
  const {data}= await axios.get(`/api/products/${id}`)
  dispatch({
        type:CARD_ADD_ITEM,
        payload:
        {
          id:data._id,
          weight:data.weight,
          name:data.name,
          price:data.price,
          image:data.image,
          countInStock:data.countInStock,
          qty,
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart=(id)=>(dispatch,getState)=>
{
  dispatch(
    {
      type:CARD_REMOVE_ITEM,
      payload:id
    }
  )
  localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress=(data)=>(dispatch)=>
{
  dispatch(
    {
      type:CARD_SAVE_SHIPPING_ADRESS,
      payload:data
    }
  )
  localStorage.setItem('shippingAddress',JSON.stringify(data))
}

export const savePaymentMethod=(data)=>(dispatch)=>
{
  dispatch(
    {
      type:CARD_SAVE_PAYMENT_METHOD,
      payload:data
    }
  )
  localStorage.setItem('paymentMethod',JSON.stringify(data))
}

export const saveShippingMethod=(data)=>(dispatch)=>
{
  dispatch(
    {
      type:CARD_SAVE_SHIPPING_METHOD,
      payload:data
    }
  )
  localStorage.setItem('shippingMethod',JSON.stringify(data))
}