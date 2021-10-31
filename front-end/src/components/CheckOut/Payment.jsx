import React,{useState,useEffect} from "react";
import "./checkOut.css";
// import OrderSummary from "./OrderSummary";
import Carousel from "../Carousel";
import {useDispatch,useSelector} from 'react-redux'

function Payment (props){
    
  const [sum, setSum] = useState(JSON.parse(localStorage.getItem("cartItems")).map((item)=>item.price*item.qty).reduce((prev,next)=>prev+next,0))
  const [newBag, setNewBag] = useState([])
  const [userData,setUserData]= useState()
  const [coupon, setCoupon] = useState("")
  const getCoupon=(coupon)=>{ setCoupon(coupon)}
  
  const dispatch = useDispatch()
  const userLogion=useSelector(state=>state.userLogin)
  const {userInfo}=userLogion

 
 useEffect(() => {
   if(userInfo)
    setUserData(userInfo)
     
   localStorage.setItem("bagDivise",JSON.stringify(newBag))
    let bag= JSON.parse(localStorage.getItem("bag"))
    let rest=bag.length%4

    for (let j=0;j<bag.length-rest;j++)
    {
        setNewBag([...newBag,([bag[j],bag[j+1],bag[j+2],bag[j+3]])])
        j+=3
    }
    if(rest!==0){
      let element=[]
        for(let j=0;j<rest;j++)
        {
          element.push(bag[bag.length-rest+j])
        }
        setNewBag([...newBag,element])
      }  
      localStorage.setItem("bagDivise",JSON.stringify(newBag))
 }, [])

    const bagDivise=JSON.parse(localStorage.getItem("bagDivise"))
  
    return (
      <div className=" paymentCard">
        <h1>Checkout</h1>
        <h1>
          Welcome {userData}!<br />
        </h1>
        <div className="d-flex flex-wrap wrapContent">
        <div className="d-flex flex-column">
        {/* <img height="40px" width="40px" alt="Coupon icon" srcset="https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/2x/external-coupon-sales-vitaliy-gorbachev-blue-vitaly-gorbachev.png 2x"/> */}
          <p>if you have a coupon this is the time</p>
          {/* <OrderSummary  sum={sum} getCoupon={getCoupon}/> */}

          <button className="finalPay"><img src="https://img.icons8.com/color/40/000000/visa.png" />Credit</button>
          <button className="finalPay"> <img src="https://img.icons8.com/fluency/48/000000/paypal.png" />PayPal</button>
        </div>
      </div>

        <Carousel  id="carouselExampleControls3">
              <div className="container-fluid">{
                bagDivise.map(( row,index ) => 
                <div  className={index === 0 ? "carousel-item active" : "carousel-item"}>
                  {row.map(( item ) =>  
                    <div className="row rowCarousel">
                      <div className="col-3 img-center-vertical">
                        <p className="amountItemPay">x{item.amount}</p>
                        <img className="paymentImgCart"  src={item.image} width="80px" height="80px" alt="..." />
                        <div className="d-flex"> 
                     </div>
                    </div>
                </div>)}</div> )} 
              </div>
        </Carousel>
     
      </div>
    );
  }

export default Payment;

