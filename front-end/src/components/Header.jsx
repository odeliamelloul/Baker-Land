import React ,{useState,useContext,useEffect} from "react"
import {NavLink, Link} from "react-router-dom"
import CartModal from "./CartModal"
import logo from "./../logo.PNG"
import { logout, updateUserProfile } from '../actions/userActions';
import {useDispatch,useSelector} from 'react-redux';
import SearchBox from "./SearchBox";
import { Route } from "react-router";



function Header(props)
{

   const [showSmallCart, setShowSmallCart] = useState(false)
   const [classLogIn, setClassLogIn] = useState("d-none")
   const [collapse, setCollapse] = useState("")
   const [classModal, setClassModal] = useState("d-none")
   
   const dispatch = useDispatch()
   const cartDetails = useSelector((state) => state.cart)
   const { cartItems } = cartDetails

   const userLogin=useSelector(state=>state.userLogin)
   const {userInfo}=userLogin


   useEffect(() => {
          if(userInfo){
          console.log(userInfo)  
          }
    }, [userInfo])

    const handleShowModalSmallCart = () => {
      setShowSmallCart(true)
       classLogIn==="d-none" && setClassModal("d-block")
    }

    const handleCloseModalSmallCart = () => {
      setShowSmallCart(false)
      setClassModal("d-none")
    }
    
    const logOut=()=>
    {
      let cartItems=localStorage.getItem("cartItems")?
        JSON.parse(localStorage.getItem("cartItems")):[]

      dispatch(updateUserProfile({id:userInfo._id,cart:cartItems}))
      dispatch(logout())
    }
    const collapseNavbar=()=>
    {

    }
        return(

            <div>
               <img width="130px" height="80px" src={logo} alt="" />  
              <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid m-0">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
               
               <Route  render={({history})=><SearchBox history={history}/>}/>

              <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav  navbar-collapse justify-content-center  me-auto mb-2 mb-lg-0">
                   
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={{pathname:"/"}}> Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page"  to={{pathname:"/Catalog"}}>Catalog</Link>
                  </li>
                 

                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Recipes
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to={{pathname: "/Easy"}}>Easy</Link></li>
                      <li><Link className="dropdown-item" to={{pathname:"/Chef-Recipe"}}>Chef-Recipe</Link></li>
                      <li><Link className="dropdown-item" to={{pathname:"/Pantry"}}> according to your pantry</Link></li>  
                      <li><hr className="dropdown-divider"/></li>
                      <li><Link className="dropdown-item"
                       to={{pathname: userInfo && userInfo.length!==0?
                        "/RecipeBook":"/SignIn" , state:{name:"RecipeBook"}}}>Your recipes book</Link></li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={{pathname:"/AboutUs"}}>About</Link>
                   </li>
                   <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={{pathname:"/ContactUs"}}>ContactUs</Link>
                   </li>
                   {/* <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/Blog">Blog</a>
                   </li> */}
                </ul>
                {userInfo && userInfo.isAdmin &&
                (<div className="dropdown ml-4">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin Menu
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item" to={{pathname:"/admin/userList"}}>Users</Link></li>
                      <li><Link className="dropdown-item" to={{pathname:"/admin/productList"}}>Products</Link></li>
                      <li><Link className="dropdown-item" to={{pathname:"/admin/orderList"}}>Orders</Link></li>
                    </ul>
                  </div>)}</div> 
               <div className="dropdown" >
               <a className="nav-link dropdown-toggle p-0 m-0" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                  <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/32/83176B/external-user-user-flatart-icons-outline-flatarticons-15.png"/></a>
                  {
                  userInfo && userInfo.length!==0 ?
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li className="dropdown-item">{userInfo.name}</li>
                      <li><Link className="dropdown-item" to={{pathname:"/UserProfile"}}>profile</Link></li>
                      <li><button className="dropdown-item" onClick={logOut}>Sign Out</button></li>
                 </ul> 
                 :
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link onClick={collapseNavbar} className="dropdown-item" to={{pathname:"/SignIn"}} >SignIn</Link></li>
                      <li><Link className="dropdown-item"  to={{pathname:"/SignUp"}} >SignUp</Link></li>
                  </ul> 
                }
              </div>    
                 <Link to={{pathname:"/Bag"}} className="container-bag">
                          <button className= "openCartBtn" onClick={handleCloseModalSmallCart} onMouseOver={handleShowModalSmallCart}>
                            <img src="https://img.icons8.com/83176B/ios-filled/32/shopping-bag.png"/>
                            <p className="centered-cart-qty">{cartItems.map((item)=>item.qty).reduce((prev,next)=>prev+next,0)}</p>
                          </button>
                  </Link>      
            </div>
          </nav>
               
          {
           (window.location.pathname!=="/Bag" &&  cartItems.length>0)&&
            <div className={`cartModal ${classModal}`} onClick={handleCloseModalSmallCart} onMouseLeave={handleCloseModalSmallCart}>
              <CartModal  open={showSmallCart}/> 
           </div>
          }

        </div>

        )
    }


export default Header