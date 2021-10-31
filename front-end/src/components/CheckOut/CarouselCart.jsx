import React, { useState,useEffect} from "react";
import { useSelector } from "react-redux";
import Carousel from "../Carousel";

const CarouselCart = () => {
    const [newCart, setNewCart] = useState([])
    const cart=useSelector(state=>state.cart)
    let NewCart=[]

        
        let myCart=cart.cartItems
        let rest=myCart.length%4

        for (let j=0;j<myCart.length-rest;j++)
        {
          NewCart.push([myCart[j],myCart[j+1],myCart[j+2],myCart[j+3]])
            j+=3
        }
        if(rest!==0){
          let element=[]
            for(let j=0;j<rest;j++)
            {
              element.push(myCart[myCart.length-rest+j])
            }
            NewCart.push(element)
          }  


    return (
        <div>
             <Carousel  id="carouselExampleControls3">
              <div className="container-fluid">{
                NewCart.map(( row,index ) => 
                <div  className={index === 0 ? "carousel-item active" : "carousel-item"}>
                  {row.map(( item ) =>  
                    <div className="row rowCarousel">
                      <div className="col-3 img-center-vertical">
                        <p className="amountItemPay">x{item.qty}</p>
                        <img className="paymentImgCart"  src={item.image} width="100px" height="100px" alt="..." />
                        <div className="d-flex"> 
                     </div>
                    </div>
                </div>)}</div> )} 
              </div>
        </Carousel>
        </div>
    )
}

export default CarouselCart
