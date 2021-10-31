import React from 'react'
import { Modal, Button, Table } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

function CartModal(props) {
   const bag=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
    let sum
    bag===[]?sum=0: sum=bag.map((item)=>item.price*item.qty).reduce((prev,next)=>prev+next,0)

    return (
    <div>
      { props.open===true
      &&
      <div>
        <Modal.Body className="show-grid">
        <Table responsive>
        <thead>
            <tr className="small-cart-heading-row">
              <td>Product</td>
              <td>weight</td>
              <td>price</td>
              <td>amount</td>
            </tr>
          </thead>
          <tbody>
              {bag.map((item, index) => (
                  <tr key= {index}>
                      <td>
                      <NavLink to={{pathname:`/Catalog/${item.name.split(" ").join("-")}`}} className="icon-link-box-cart col">
                              <img width="50px" height="50px" className="small-cart-book-img" src={item.image} alt=""/>                  
                      </NavLink>
                        
                      </td>
                      <td>{item.weight}</td>
                      <td>{item.price}$</td>
                      <td>{item.qty}</td>                     

                  </tr>
                  
              ))}
                  <tr className="cart-sums-row">
                          <th>Total Sum:</th>
                          <th>{sum}$</th>
                  </tr>
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
                    Continue Shopping</button>
            </NavLink>
        </Modal.Footer>
        </div>
        } 
      </div>
    
    );
  }

  
  export default CartModal;