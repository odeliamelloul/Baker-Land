import React,{useState,useRef,useEffect}from 'react'
import { Link } from 'react-router-dom';
import allCoupon from "../../AllCoupon";
import { useSelector } from 'react-redux';

    function ShippingSummary({sum,history}) {
    const couponText = useRef();
    const [srcLock, setSrcLock]= useState( "https://img.icons8.com/ultraviolet/40/000000/lock--v2.png")
    const [coupon, setCoupon] = useState({value:0,name:""})
    const [errorMsg, setErrorMsg] = useState("")
    const cart=useSelector(state=>state.cart)


  
    const changSrc = () => {
      let matchCoupon =(allCoupon.find((item) => item.name===couponText.current.value))
      if (matchCoupon) {
          setCoupon(matchCoupon)
          setSrcLock( "https://img.icons8.com/fluency/40/000000/instagram-check-mark.png")
      }
       else {
          setSrcLock("https://img.icons8.com/ultraviolet/40/000000/lock--v2.png")
      }
    };


    const goToPayment=()=>
    {
      console.log(cart.shippingPrice)
        if(cart.shippingAddress.address &&
          cart.shippingAddress.city &&
          cart.shippingAddress.postalCode &&
          cart.shippingAddress.country &&
          cart.shippingPrice!==-1)
          {
            setErrorMsg("")
            history.push("/PaymentMethod")
          }

        else{
          if(cart.shippingPrice==-1)
          setErrorMsg("please choose Shipping method")  
          else setErrorMsg("please enter correct delivery adress")
        }
    }

    useEffect(() => {
       if(cart.shippingPrice!==-1)
         setErrorMsg("")
         
    }, [cart.shippingPrice])

    

    let SumShipping= cart.shippingPrice==-1?0:cart.shippingPrice
    const emptyCoupon={value:0,name:""}
    let {value,name}=coupon!==undefined? coupon :emptyCoupon
    let couponValue=Math.round(sum * value)
    cart.coupon=couponValue
    const sumToPay = sum-couponValue;

    return (
        <div className="d-flex flex-column order-summary">
           <img width="40px" height="40px" className="icon-Checkout " src="https://img.icons8.com/external-itim2101-blue-itim2101/45/000000/external-order-online-shopping-itim2101-blue-itim2101.png"/>
              <div className="coupon">
                    <div>
                        <input type="text" onChange={changSrc} ref={couponText} placeholder="coupon" />
                        <img width="8px" height="25px" src={srcLock} width="40px"/>
                    </div>
                    
                </div>
                    {coupon.value>0 &&
                    <div className="d-flex flex-column discountCoupon" >
                    <p className="sum d-flex">before discount : <span>{sum}</span></p>
                    <p className="discount d-flex">discount {coupon.value*100}% :<span>{couponValue}$</span></p>
                 </div>}
                 {window.location.pathname!=='/Bag' && <div> Shipping :{SumShipping }$</div>}
                 <p>Total:&nbsp; {sumToPay+ SumShipping}$</p>

                    <button onClick={goToPayment}  className="shippingBtn">continue to Payment</button>
                    <p>{errorMsg}</p>

        </div>
    )
}

export default ShippingSummary
