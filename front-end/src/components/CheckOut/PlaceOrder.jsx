import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/orderAction";
import { savePaymentMethod } from "../../actions/cartActions";
import './checkOut.css'

const PlaceOrder = ({history,paymentMethod}) => {
    
    const dispatch = useDispatch()
    const cart=useSelector(state=>state.cart)
   
    const orderCreate=useSelector(state=>state.orderCreate)
    const {order,success,error}=orderCreate

    useEffect(() => { 
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
          }
        
          cart.itemsPrice = addDecimals(
            cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
          )
        
          cart.taxPrice = 0
          cart.totalPrice = (
            Number(cart.itemsPrice)-
            Number(cart.coupon)+
            Number(cart.shippingPrice) +
            Number(cart.taxPrice)
          ).toFixed(2)
            
        if(success) {
            history.push(`/order/${order._id}`)
        } 
    }, [history,success])

    const checkOut=()=>
    {
        dispatch(savePaymentMethod(paymentMethod));
        dispatch(createOrder({
          orderItems:cart.cartItems,
          shippingAddress:cart.shippingAddress,
          paymentMethod:cart.paymentMethod,
          itemsPrice:cart.itemsPrice,
          shippingPrice:cart.shippingPrice,
          taxPrice:cart.taxPrice,
          coupon:cart.coupon,
          totalPrice:cart.totalPrice
      }))
    }

    return (
        <>
           <button className="shippingBtn mt-3" onClick={checkOut}>Place Order</button> 
        </>
    )
}

export default PlaceOrder
