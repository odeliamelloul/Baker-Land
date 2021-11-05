import React,{useRef,useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { AnimateOnChange } from "react-animation"
import { getUserDetails,updateUserProfile } from '../../actions/userActions'
import { listMyOrders } from '../../actions/orderAction'
import Loader from '../Loader'
import { Link } from 'react-router-dom'

function UserProfile() {
    const [errorName,setErrName]=useState("")
    const [errorMail,setErrMail]=useState("")
    const [errorPassword,setErrPassword]=useState("")
    const [errorPhone,setErrPhone]=useState("")
    const [succesMsg,setsuccesMsg]=useState("")
    const dispatch = useDispatch()

    const userDetails=useSelector((state)=>state.userDetails)
    const {loading,error,user}=userDetails


    const orderMyList=useSelector((state)=>state.orderMyList)
    const {loading:loadingOrders,error:errorOrders,orders}=orderMyList
    
    const [flag,setFlag]= useState(false)
      let userName=useRef()
      let email=useRef()
      let password=useRef()
      let phone=useRef()

    useEffect(() => {
        if(!user.name){
           dispatch(getUserDetails('profile'))
           dispatch(listMyOrders())
        }
        else{
         userName.current.value=user.name
         email.current.value=user.email
         phone.current.value=user.phone
        //  password.current.value=user.password
        }
    }, [dispatch,user])
      
    //name
   const nameChange=()=>
    {
          if(!/^[A-Za-z]+\s[A-Za-z]+$/.test(userName.current.value) ||userName.current.value==="")
          {
              
              userName.current.style.border="red solid 1px"; 
              if(userName.current.value.match(/^[a-z]*[1-9]+[a-z]*$/))
              
                 setErrName("Full name:letter only like: odelia melloul")
              
              if(userName.current.value.match(/^[A-Za-z]+$/))
              
                setErrName("Full name:Missing name or last name")
              
              if(userName.current.value==="")
              
                setErrName("please enter full name") 
          }   
          
          else{
              setErrName("")
              userName.current.style.border="black solid 1px";
          }
    }
    //email
    const emailChange=()=>
    {
        
        if(!/^[a-zA-z0-9]+@gmail\.com$/.test(email.current.value))
        {
            email.current.style.border="red solid 1px";
            if(email.current.value==="")
            setErrMail("please Enter an email")
            else
            setErrMail("Enter an  email like xxxx@gmail.com")
        }  
        else{
            email.current.style.border="black solid 1px";
            setErrMail("")
        }
    }
     //password
    // const passwordChange=()=>
    //   {
    //       console.log(password.current.value)
    //     if( !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password.current.value) )
    //     {

    //         setErrPassword("Password:Minimum 8 characters, at least one letter, one number and one special character:")
    //     }
    //     else{
    //         password.current.style.border="black solid 1px";
    //         setErrPassword("")
    //     }
    //   }
    //phone
    const phoneChange=()=>
    {
      if(!/^[0-9]{3}\-[0-9]{7}$/.test( phone.current.value))
      {
          phone.current.style.border="red solid 1px";
          if(phone.current.value==="")
          setErrPhone("Please Enter a phoneNumber")
          else
          setErrPhone("Phone:10 digit in format xxx-xxxxxxx")
      }
      else{
          phone.current.style.border="black solid 1px";
          setErrPhone("")
 
      }
    }
    
    const sendForm=(e)=>{
        e.preventDefault();
        nameChange();emailChange(); phoneChange();
        if(errorName===""&& errorMail==="" && errorPhone==="" && errorPassword==="") 
        {   setFlag(true)
            dispatch(updateUserProfile({id:user._id,name:userName.current.value,email:email.current.value,phone:phone.current.value}))
            setsuccesMsg(<h4>Profile Updated</h4>)
        }
    }

   let ErrorArray=[errorName,errorMail,errorPassword,errorPhone].filter((item)=>item!=="") 

   return (
    <div className="d-flex flex-wrap userProfile">
        <div>
            <h2>User Profile</h2>
        { ErrorArray.length>0 && 
        <div className="ErrForm">
                <ul> {ErrorArray.map(item=><li>{item}</li>)}</ul>
            </div>}
            <form onSubmit={sendForm} className="d-flex flex-column formSign">
                
                <label>Full Name</label>
                <input onChange={nameChange} ref={userName} type="text" placeholder="xxxxx yyyyy"/>
                <label >Email</label>
                <input onChange={emailChange} ref={email} type="email" placeholder="xxxx@gmail.com"/>
                {/* <label >Password</label>
                <input onChange={passwordChange} ref={password}type="password" placeholder="*********"/> */}
                <label>Phone Number</label>
                <input onChange={phoneChange} ref={phone} type="phone" placeholder="050-1132222311"/>
                <button  type="submit" className="signBtn">Update Your Profile</button>
                {(succesMsg==="" && flag) &&
                <AnimateOnChange>
                    check your form...
                </AnimateOnChange>}
                {flag &&succesMsg}
            </form>
        </div>


        <div >
          <h2>MY ORDERS</h2>
          <div className="d-flex flex-column formSign all-my-orders">
           {loadingOrders ?<Loader/> :errorOrders? <p>{errorOrders}</p>
           :
           <table >
             <thead>
                 <tr>
                     <th className="d-none d-lg-block">ID</th>
                     <th>DATE</th>
                     <th>TOTAL</th>
                     <th>PAID</th>
                     <th>DELIVERED</th>
                     <th></th>
                 </tr>
             </thead>
             <tbody>
                 {orders.map(order=>
                    (
                        <tr key={order._id}>
                            <td className="d-none d-lg-block">{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid?order.paidAt.substring(0,10):(
                                <i className="fa fa-times" style={{color:"red"}}></i>
                            )}</td>
                             <td>{order.isDelivered?order.deliveredAt.substring(0,10):(
                                <i className="fa fa-times" style={{color:'red'}}></i>
                            )}</td>
                            <td>
                                <Link to={{pathname:`/order/${order._id}`}}>
                                    <button className="signBtn">
                                        Details
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
             </tbody>
           </table>
           }
        </div>
        </div>
    </div>
)
}

export default UserProfile
