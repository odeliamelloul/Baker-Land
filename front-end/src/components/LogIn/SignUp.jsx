
import React,{ useEffect,useState,useRef } from "react"
import {withRouter} from 'react-router-dom';
import { AnimateOnChange } from "react-animation"
import {useDispatch,useSelector} from 'react-redux'
import { register } from "../../actions/userActions";
import Loader from "../Loader";

function SignUp(props)
{ 
    const [errorName,setErrName]=useState("")
    const [errorMail,setErrMail]=useState("")
    const [errorPassword,setErrPassword]=useState("")
    const [errorPhone,setErrPhone]=useState("")
    const dispatch = useDispatch()
    const userRegister=useSelector(state=>state.userRegister)
    const {loading,error,userInfo}=userRegister
    
    const [flag,setFlag]= useState(false)
      let userName=useRef()
      let email=useRef()
      let password=useRef()
      let phone=useRef()

      const[succesMsg,setsuccesMsg]=useState("")

      useEffect(() => {
      }, [loading,userInfo])

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
        
        if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email.current.value))
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
    const passwordChange=()=>
      {
        if( !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(password.current.value) )
        {
            password.current.style.border="red solid 1px";
            if(password.current.value==="")
            setErrPassword("Please Enter a password")
            else
            setErrPassword("Password:Minimum 6 characters, at least one letter, one number and one special character:")
        }
        else{
            password.current.style.border="black solid 1px";
            setErrPassword("")
        }
      }
    //phone
    const phoneChange=()=>
    {
      if(!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test( phone.current.value))
      {
          phone.current.style.border="red solid 1px";
          if(phone.current.value==="")
          setErrPhone("Please Enter a phoneNumber")
          else
          setErrPhone("Please Enter a Correct phoneNumber")
      }
      else{
          phone.current.style.border="black solid 1px";
          setErrPhone("")
 
      }
    }
    



    const sendForm=(e)=>{
        e.preventDefault();
        nameChange();emailChange(); passwordChange(); phoneChange();
        if( errorName===""&& errorMail==="" && errorPhone==="" && errorPassword==="") 
        {   setFlag(true)
            dispatch(register(userName.current.value,email.current.value,password.current.value,phone.current.value))
            if(!error)
            {
                setsuccesMsg(<h4>sign Up succesfully</h4>)
                userName.current.value=""
                email.current.value=""
                phone.current.value=""
                password.current.value=""
           }
        }
    }

   let ErrorArray=[errorName,errorMail,errorPassword,errorPhone].filter((item)=>item!=="") 

   return (
    <div>
        <h1>Sign Up</h1>
       {!error && ErrorArray.length>0 && 
       <div className="ErrForm">
            <ul> {ErrorArray.map(item=><li>{item}</li>)}</ul>
        </div>}
        <form onSubmit={sendForm} className="d-flex flex-column formSign">
            
            <label>Full Name</label>
            <input onChange={nameChange} ref={userName} type="text" placeholder="xxxxx yyyyy"/>
            <label >Email</label>
            <input onChange={emailChange} ref={email} type="email" placeholder="xxxx@gmail.com"/>
            <label >Password</label>
            <input onChange={passwordChange} ref={password}type="password" placeholder="*********"/>
            <label>Phone Number</label>
            <input onChange={phoneChange} ref={phone} type="phone" placeholder="050-1132222311"/>
            <button  type="submit" className="signBtn">Sign Up</button>
            {loading &&
            <AnimateOnChange>
                check your form...
            </AnimateOnChange>}
            { error ? <spaan className="ErrForm">This email already exist in the system</spaan>
            : succesMsg}
        </form>
    </div>
)
}
export default withRouter(SignUp)

