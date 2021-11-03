import React,{ useState ,useRef,useEffect} from 'react'
import { Modal,  Table } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch} from "react-redux"
import "./Recipes.css"
import { listProducts } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';


function IngModal(props) {

  const productsList=useSelector(state=>state.productList)
  const{loading,error,products}=productsList

  const toShop=props.toShop?props.toShop:[]
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()

    useEffect(() => {
      dispatch(listProducts())
    }, [dispatch])
 
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    const arrToShop=products.length>0?products.filter((item)=>toShop.includes(item.name.toLowerCase())):[]
    
    console.log(props.toShop)
 

    const itemEls = useRef([])
    itemEls.current=[]
    
    const addToRef=(el)=>
    {
      if(el && !itemEls.current.includes(el) )
      {
        itemEls.current.push(el)
      }
    }



    const addIngToCart=(product,index)=>
    {
     let flag=false
      cart.cartItems.forEach((itemInCart)=>
      {
       
        if(product._id==itemInCart.id)
        { 
          flag=true
          dispatch(addToCart(itemInCart.id,itemInCart.qty+1))
        }
     
      })
      if(!flag)
      dispatch(addToCart(product._id,1))
         
        itemEls.current[index].innerHTML="is added"
        setTimeout(()=>itemEls.current[index].innerHTML="+",1500) 
    
    }

    return (
      <div>
      <button style={{width:"max-content"}} onClick={()=>handleShow()} className="btnRecipes openModalBtn">add ingredients to  <img src="https://img.icons8.com/fluency/32/000000/shopping-cart.png"/></button>

      <Modal show={show}>
            <Modal.Header closeButton onClick={()=>handleClose()} >
              <Modal.Title>
                add to cart <i></i>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="show-grid">
                <Table responsive>

                <tbody>
                    {arrToShop.map((item, index) => (
                        <tr key= {index}>
                            <td>  
                              <img width="50px" height="50px" className="small-cart-book-img" src={item.image} alt=""/>
                               {item.name}                 
                            </td>
                            <td>{item.weight}</td>
                            <td>{item.price}$</td>
                           <td>
                             <button id={index} ref={addToRef} className="btnAddIng"  onClick={()=>addIngToCart(item,index)} >+</button>
                            </td>               
                        </tr>
                        
                    ))}
                        
                </tbody>
                 </Table>
                </Modal.Body>

                         <Modal.Footer>

               <NavLink to="/Bag" className="icon-link-box-cart col">
                   <button className="SmallCartBtn">
                       Go to Shopping Cart </button>
               </NavLink>
               <NavLink to="/Catalog" className="icon-link-box-cart col">
                   <button className="SmallCartBtn">
                       Go to Catalog</button>
               </NavLink>
           </Modal.Footer>
 </Modal>
 </div>     
    );
  }



  export default IngModal