import React,{useState,useEffect} from 'react'
import { Modal, Button, Table } from "react-bootstrap";


function AddIngredients ({getName,addIngredients}) {
    const [ingName, setIngName] = useState("")
    const [ingQTy, setIngQTy] = useState("")
    const [ingType, setIngType] = useState("gram")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const handleShow = (e) =>{ 
        e.preventDefault()
        setShow(true)};


const addIng=()=>
{
    getName(ingName)

    let newType
     switch (ingType) {
         case "":
            newType= "gram"
             break;
         case "other":
                newType= ""
                 break;
         default:
            newType=ingType
             break;
     }
    addIngredients(ingQTy+" "+newType+" "+ingName)
    handleClose()
    setIngQTy("")
    setIngName("")
}

    return (
        <>
        <button className="signBtn" onClick={(e)=>handleShow(e)}>Add Ingredients</button>
        <Modal show={show}  className="modal-add-ing">
            <Modal.Header closeButton onClick={handleClose} >
              <Modal.Title>
                Add Ingredients <i></i>
              </Modal.Title>
            </Modal.Header>
            <Table>
                
                <tbody>
                    <td>
                    <input  type="text" value={ingQTy} onChange={(e)=>setIngQTy(e.target.value)} placeholder="quantity" />
                    <select  name="" id="" onChange={(e)=>setIngType(e.target.value)}>
                        <option selected disabled hidden>type</option>
                        <option value="gram">gram</option>
                        <option value="ml">ml</option>
                        <option value="cup">cup</option>
                        <option value="tsp">tsp</option>
                        <option value="tbsp">tbsp</option>
                        <option value="pinch">pinch</option>
                        <option value="zested">zested</option>
                        <option value="large">large</option>
                        <option value="medium">medium</option>
                        <option value="small">small</option>
                        <option value="other">other</option>
                    </select>
                    </td>
                    <td>
                      <input type="text" value={ingName} onChange={(e)=>setIngName(e.target.value)} placeholder="name"/>
                    </td>
                </tbody>
            </Table> 
           <button onClick={addIng}>Added</button>
        </Modal>
        </>
    )
}

export default AddIngredients
