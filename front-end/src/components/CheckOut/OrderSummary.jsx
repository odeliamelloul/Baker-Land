import React from 'react'
import { useSelector } from "react-redux";

const OrderSummary = () => {
    const cart=useSelector(state=>state.cart)
    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,loading,error}=orderDetails

    let coupon,shippingPrice

    let cartItemsPrice=order?Math.round(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    :Math.round(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))


    if(window.location.pathname==="/PaymentMethod")
   {
    coupon=cart.coupon?cart.coupon:0
    shippingPrice=cart.shippingPrice
   }else{
    coupon=order.coupon
    shippingPrice=order.shippingPrice
   }
    return (
    <>
        <h1>Order Summary</h1>
        <table className="m-auto">
          <tbody>
            <tr>
               <td>Items Price:</td>
               <td>{cartItemsPrice}$</td>
            </tr>
            <tr>
               <td>Coupon:</td>
               <td>-( {coupon}$ )</td>
            </tr>
            <tr>
               <td>shipping Price:</td>
               <td>{shippingPrice}$</td>
            </tr>
            <tr>
               <td>Total Price:</td>
               <td>{cartItemsPrice-coupon+Number(shippingPrice)}$</td>
            </tr>
          </tbody>
        </table> 
        </>
    )
}

export default OrderSummary
