import React, { useState,useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CarouselCart from "./CarouselCart";
import HeaderStatus from "./HeaderStatus";
import OrderSummary from "./OrderSummary";
import PlaceOrder from "./PlaceOrder";

const PaymentMethod = ({history}) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const cart=useSelector(state=>state.cart)
  const {shippingAddress}=cart
  


  const submitForm = (e) => {
    e.preventDefault();
    
  };
  
  const coupon=cart.coupon?cart.coupon:0
  const cartItemsPrice=cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  return (
    <>
    <HeaderStatus/>
    
  <div className="d-flex  wrap-payment">
    <div className="d-flex-column " >

          <div className="d-flex payment-shipping" >
            <div className="shipping-adress ">
                    <h1>Shipping</h1>
                    <p>
                        <strong>Adress:</strong>&nbsp; 
                        {cart.shippingAddress.address},&nbsp; 
                        {cart.shippingAddress.city},&nbsp;
                        {cart.shippingAddress.postalCode},
                        {cart.shippingAddress.country}
                        
                    </p>
            </div>

            <Form  className="payment-form">
              <Form.Group>
                <h1>Method</h1>
              
              <Col>
                <Form.Check
                  type="radio"
                  label="PayPal Or Credit Card"
                  name="PaymentMethod"
                  id="PayPal"
                  value="PayPal"
                  onChange={() => setPaymentMethod("PayPal")}
                ></Form.Check>
                <Form.Check
                  type="radio"
                  label="Stripe"
                  name="PaymentMethod"
                  id="Stripe"
                  value="Stripe"
                  onChange={() => setPaymentMethod("Stripe")}
                ></Form.Check>
              </Col>
              </Form.Group>

              </Form>
            </div>
         <div >   
           <CarouselCart/>
        </div>
      </div>

      <div className="shipping">
       <OrderSummary/>
       <PlaceOrder paymentMethod={paymentMethod} history={history}/>
      </div>
      
      
  </div>
      
    </>
  );
};

export default PaymentMethod;
