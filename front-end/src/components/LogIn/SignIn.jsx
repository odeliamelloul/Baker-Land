import React,{ useState,useRef,useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux'
import { getUserDetails, login } from "../../actions/userActions"
import {Row,Col} from 'react-bootstrap'
import { Link } from "react-router-dom"
import { addToCart } from "../../actions/cartActions"

function SignIn ({history})
{
    const email = useRef();
    const Password=useRef();
    const [success, setSuccess] = useState("")
    const dispatch = useDispatch()

    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogin


  useEffect(() => {
  
  if(!loading && userInfo.cart)
  {
    console.log(userInfo);
    userInfo.cart.forEach((product)=>
    {
      dispatch(addToCart(product.id,product.qty))
    })
    localStorage.setItem("cartItems",JSON.stringify(userInfo.cart))
    history.push('/Catalog')
  }
 
}, [userInfo,loading])

      const submitForm=(e)=>{
        e.preventDefault()
        dispatch(login(email.current.value,Password.current.value))
        if(error===undefined)
        {  
          dispatch(getUserDetails('profile'))
          setSuccess("SignIn Succesfully")
        }

      }
    
  return ( <div> 
            <h1>Sign In</h1>
            { error!=="" && <spaan className="ErrForm">{error}</spaan>}
            <form className=" d-flex flex-column formSign">
            
                <label htmlFor="">Enter Your Email</label>
                <input type="email" ref={email} placeholder="xxx@gmail.com" />
                <label htmlFor="">Password</label>
                <input  type="password"  ref={Password} placeholder="********" />
                <button type="submit" className="signBtn" onClick={submitForm}>Sign In</button>
                { error===undefined && <h4>{success}</h4>}
        </form>
        <Row className='py-3'>
           <Col>
           New Customer?{' '}
           <Link to={{pathname:'/SignUp'}}>
             SignUp
           </Link>
           </Col>
        </Row>
        
        </div>  
    )
}
export default SignIn