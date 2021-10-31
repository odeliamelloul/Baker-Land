import React ,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import { Modal } from "react-bootstrap";

function BeforePayement (props) {

  const [openModal, setOpenModal] = useState(false)
  const handleShow = () => setOpenModal(props.openModal);
 console.log(props.openModal)
return(
      <div>
      <button onClick={handleShow} className="payCartBtn">Register Now </button>
            <Modal show={openModal}>
                  <Modal.Header closeButton >
                    {window.location.pathname==='/RecipeBook'?
                        <Modal.Title>
                           Before Create Recipe 
                        </Modal.Title>
                        :
                        <Modal.Title>
                        Before Payement 
                     </Modal.Title>
                    
                    }

                  </Modal.Header>

            <Modal.Footer>
                  <NavLink to="/SignIn" className="icon-link-box-cart col">
                      <button className="SmallCartBtn">
                      Sign In </button>
                  </NavLink>
                  <NavLink to="/SignUp" className="icon-link-box-cart col">
                      <button className="SmallCartBtn">Sign Up</button>
                  </NavLink>
            </Modal.Footer>
      </Modal>
      </div>

    )

}
export default  BeforePayement