import React ,{useState,useContext,useEffect} from "react"
import {NavLink, Link} from "react-router-dom"
import CartModal from "./CartModal"
import logo from "./../NewLogo.png"
import { logout, updateUserProfile } from '../actions/userActions';
import {useDispatch,useSelector} from 'react-redux';
import SearchBox from "./SearchBox";
import { Route } from "react-router";



function Header(props)
{

   const [showSmallCart, setShowSmallCart] = useState(false)
   const [classLogIn, setClassLogIn] = useState("d-none")
   const [collapse, setCollapse] = useState("d-none")
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
       classLogIn=="d-none" && setClassModal("d-block")
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

        return(

            <div>  
              <nav className="navbar navbar-expand-lg navbar-light">
               <img width="130px" height="80px" src={logo} alt="" /> 
              <div className="container-fluid m-0">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
               <Route render={({history})=><SearchBox history={history}/>}/>

              <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav  navbar-collapse justify-content-center  me-auto mb-2 mb-lg-0">
                   
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/"> Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page"  href="/Catalog">Catalog</a>
                  </li>
                 

                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Recipes
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="/Easy">Easy</a></li>
                      <li><a className="dropdown-item" href="/Chef-Recipe">Chef-Recipe</a></li>
                      <li><a className="dropdown-item" href="/Pantry"> according to your pantry</a></li>  
                      <li><hr className="dropdown-divider"/></li>
                      <li><a className="dropdown-item" href={
                        userInfo && userInfo.length!==0?
                        "/RecipeBook":"/SignIn"}>Your recipes book</a></li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/AboutUs">About</a>
                   </li>
                   <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/ContactUs">ContactUs</a>
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
                      <li><a className="dropdown-item" href="/admin/userList">Users</a></li>
                      <li><a className="dropdown-item" href="/admin/productList">Products</a></li>
                      <li><a className="dropdown-item" href="/admin/orderList">Orders</a></li>
                    </ul>
                  </div>)}
               <div className="dropdown" >
               <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                  <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/40/83176B/external-user-user-flatart-icons-outline-flatarticons-15.png"/></a>
                  {
                  userInfo && userInfo.length!==0 ?
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li className="dropdown-item">{userInfo.name}</li>
                      <li><a className="dropdown-item" href="/UserProfile">profile</a></li>
                      <li><button className="dropdown-item" onClick={logOut}>Sign Out</button></li>
                 </ul> 
                 :
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a className="dropdown-item" href="/SignIn" >SignIn</a></li>
                      <li><a className="dropdown-item"  href="/SignUp" >SignUp</a></li>
                  </ul> 
                }
              </div>    
              </div> 
                 <a href="/Bag" className="container-bag">
                          <button className= "openCartBtn" onClick={handleCloseModalSmallCart} onMouseOver={handleShowModalSmallCart}>
                            <img src="https://img.icons8.com/83176B/ios-filled/40/shopping-bag.png"/>
                            <p className="centered-cart-qty">{cartItems.map((item)=>item.qty).reduce((prev,next)=>prev+next,0)}</p>
                          </button>
                  </a>      
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