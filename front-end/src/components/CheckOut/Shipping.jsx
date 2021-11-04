import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import ShippingSummary from './ShippingSummary'
import Adress from './adress'
import HeaderStatus from './HeaderStatus'
import ShippingMethod from './ShippingMethod'
import { useSelector } from "react-redux";


function Shipping(props) {
    const cart=useSelector(state=>state.cart)
    
    const [shipping, setShipping] = useState()
    const getSumShipping=(SumShipping)=>{
          setShipping(SumShipping)
          cart.shippingPrice = SumShipping
        }

    return (
        <div>
            <HeaderStatus/>
            <div  className="wrap-shipping flex-wrap d-flex w-max ">
                <div className="shipping">
                    <Adress />
                </div>
                <div className="shipping">
                  <ShippingMethod getSumShipping={getSumShipping} sum={props.location.state.sum} />
                </div>
                <div className="shipping">
                  <ShippingSummary  shipping={shipping} sum={props.location.state.sum} history={props.history} />       
                </div>
            </div>
            
        </div>
    )
}

export default Shipping
