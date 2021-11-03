
import React ,{useState,useEffect}from 'react'
import BagItem from '../Bag/BagItem'
import BeforePayement from '../CheckOut/BeforePayement'
import "./Bag.css"
import { Link} from "react-router-dom"
import HeaderStatus from '../CheckOut/HeaderStatus';
import {useDispatch,useSelector} from 'react-redux'
function Bag(props) { 

    const [openModal,setOpenModal]=useState(true)

    const cartDetails = useSelector((state) => state.cart)
    const { cartItems } = cartDetails

    const userLogion=useSelector(state=>state.userLogin)
    const {userInfo}=userLogion

    const [coupon, setCoupon] = useState("")
    const getCoupon=(coupon)=>{ setCoupon(coupon)}

    useEffect(() => {
          if(userInfo.name){
            setOpenModal(false)
          }
          else setOpenModal(true)
        }, [openModal])
      

    let sum=Math.round(cartItems.map((item)=>item.price*item.qty).reduce((prev,next)=>prev+next,0))
    return ( 
       
        <div className="Cart"> 
            
             { cartItems.length===0?
             <div>
                 <h4>your shoping Cart is Empty </h4>
                 <Link to="/Catalog">Go to Shop page &#8608;</Link>
             </div>:
            <div className=" d-flex flex-column wrapCart">
               <HeaderStatus/>
            <div className="d-flex flex-column wrapDetails" >
              {/* <div className="cart-header">
                  <div className="d-flex headerItem">
                <b>Weight</b>
                <b>Price</b>
                <b>Quantity</b>
                <b>Total</b>
                </div>
              </div> */}
               {cartItems.map((item)=><BagItem  product={item}/>)}
            </div>
           <div className="summary d-flex flex-column" >
             <h4>Total: {sum}$</h4>
             {openModal && <BeforePayement openModal={openModal} />}
             {openModal===false && <Link to={{pathname:"/Shipping" ,state:{sum}}} className="payCartBtn">Checout securely Now </Link>}
             </div>
           </div>}
        </div>
    )
          
    
} 



export default Bag
