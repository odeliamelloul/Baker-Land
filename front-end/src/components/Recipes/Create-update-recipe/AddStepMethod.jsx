import React,{useState,useEffect} from 'react'
import { Modal, Button, Table } from "react-bootstrap";

const AddStepMethod = ({addSteps}) => {
    const [step, setStep] = useState("")
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = (e) =>{ 
        e.preventDefault()
        setShow(true)};

const addNewStep=()=>
{
    addSteps(step)
    handleClose()
    setStep("")
}
    return (
        <>
        <button className="signBtn" onClick={(e)=>handleShow(e)}>Add Steps</button>
        <Modal show={show} className="modal-add-step">
            <Modal.Header closeButton onClick={()=>handleClose()} >
              <Modal.Title>
                Add Steps
              </Modal.Title>
            </Modal.Header>
                <label htmlFor="">Enter a step:</label>
                <textarea value={step} onChange={(e)=>setStep(e.target.value)} />
         <button onClick={addNewStep}>Added</button>
        </Modal>
        </>
    )
}

export default AddStepMethod
