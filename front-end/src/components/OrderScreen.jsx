import axios from "axios";
import React, {useState, useEffect } from "react";
import { ListGroup} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../actions/orderAction";
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from "../constants/orderConstant";
import Loader from "./Loader";
import HeaderStatus from "./CheckOut/HeaderStatus";
import CarouselCart from "./CheckOut/CarouselCart";
import OrderSummary from "./CheckOut/OrderSummary";
import { listProducts, updateProduct } from "../actions/productActions";
import { removeFromCart } from "../actions/cartActions";
import emailjs from 'emailjs-com';



const OrderScreen = ({match}) => {
    
    const orderId=match.params.id
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()

    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,loading,error}=orderDetails

    const orderPay=useSelector(state=>state.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay

     const cart = useSelector((state) => state.cart)
     const { cartItems } = cart

     const productsList=useSelector(state=>state.productList)
     const{products}=productsList

    useEffect(() => {
        dispatch(listProducts())

         const addPaypalScript=async()=>
         {
             const {data:clientId}=await axios.get('/api/config/paypal')
             const script=document.createElement('script')
             script.type='text/javascript'
             script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
             script.async=true
             script.onload=()=>
             {
                 setSdkReady(true)
             }
            document.body.appendChild(script)
         }
         
         if(!order ||successPay){
             dispatch({type:ORDER_PAY_RESET})
             dispatch(getOrderDetails(orderId))

         }

         if(successPay)
         {
            var templateParams = {
                name:order.user.name,
                orderId:order._id,
                email:order.user.email,
                products:order.orderItems
            };
            emailjs.send('service_o2n4bpq', 'template_nsfz9w8', templateParams,"user_vLhhvBzlmb0caFnkYzt2q")
            .then(function(response) {
              alert("Order Completed")
            }, function(error) {
            });
         }
         else if(!window.paypal)
         {addPaypalScript() }
         else
         {setSdkReady(true)}
        


    }, [dispatch, orderId,successPay,order])



   const successPaymentHandler=(paymentResult)=>
   {
    dispatch(payOrder(orderId,paymentResult))

    cartItems.forEach(cartEl => {
      
       let product= products.find((el)=>el._id===cartEl.id)
      //update qty of product that buyed
        dispatch(updateProduct({
           _id:product._id,
           image:product.image,
           name:product.name,
           price:product.price,
           weight:product.weight,
           categories:product.categories,
           description:product.description,
           countInStock: product.countInStock- cartEl.qty
       })) 
       localStorage.setItem("cartItems",[])
       });


   }

return (
<>
  {!order ? <Loader/> :
    <div>
        <HeaderStatus/> <br />
         {/* <h2>Order: {orderId}</h2> */}
        <div className="d-flex flex-column wrap-payment">
           
                <div className="shipping-adress width-item-order">
                        <h1>Shipping</h1>
                        <p>
                            <strong>Adress:</strong>&nbsp; 
                            {order.shippingAddress.address},&nbsp; 
                            {order.shippingAddress.city},&nbsp;
                            {order.shippingAddress.postalCode},&nbsp;
                            {order.shippingAddress.country},
                        </p>
                </div>

                <div className="shipping width-item-order">
                  <OrderSummary/>
                </div> 

                <div className="width-item-order">
                        {loadingPay && <Loader/> }
                        {!sdkReady? <Loader/>: (
                            <PayPalButton  amount={order.totalPrice}
                            onSuccess={successPaymentHandler}/>
                        )}
                        {order.isPaid &&
                            <ListGroup.Item variant="success">Order Completed!  paid At: {order.paidAt}
                            </ListGroup.Item> }
                         </div>  
                         {!order.isPaid &&
                    <CarouselCart cartItemsByOrder={order.orderItems}/>  }
            </div>
                
            </div>}
        </>
    )
}

export default OrderScreen
