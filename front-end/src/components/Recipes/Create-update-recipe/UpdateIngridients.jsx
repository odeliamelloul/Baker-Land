import React,{useState,useEffect} from 'react'
import { Modal,Table } from "react-bootstrap";


const UpdateIngridients = ({allIngredients,UpdateIng}) => {
    const [ingUpdated, setIng] = useState([])
    const [qty, setQty] = useState("")
    const [type, setType] = useState("")

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    let array=allIngredients.map((ing)=> (ing.split(" ")))
     
    useEffect(() => {
       setIng(array)
    }, [ingUpdated])

        const updateIng=()=>
        {
            handleClose()
        }


        const ingChanged=(value,typeChange,index)=>
        {
         
          switch (typeChange) {
              case "ing":
                {
                  array[index].splice(2,array[index].length)
                  array[index][2]=value
                  break;
                }
              case "qty":
                 { 
                  array[index][0]=value
                  break;
                }
              case "type":
                  {
                   array[index][1]=value
                  break;
                 }
              default:
                  break;
          }
          setIng(array)
        }
    return (
        <>
            <button onClick={handleShow} className="fa fa-edit signBtn" ></button>
            <Modal show={show} className="modal-update-ing">
            <Modal.Header closeButton onClick={()=>handleClose()} >
              <Modal.Title>
                Update Ingredients
              </Modal.Title>
            </Modal.Header>
            
            <Table>
                <thead>
                   <th>ingredients</th>
                   <th>quantity</th>
                </thead>
                  
                <tbody>
                { ingUpdated.map((ing,index)=>(
                    <tr>
                        <td>
                            <input id={index} type="text" value={ingUpdated[index].slice(2,ingUpdated[index].length)} onChange={(e)=>ingChanged(e.target.value,"ing",index)}/>
                        </td>
                        <td>
                            
                            <input type="text" value={ingUpdated[index][0]} onChange={(e)=>ingChanged(e.target.value,"qty",index)}/>
                        </td>
                        <td>
                            
                            <input type="text" value={ingUpdated[index][1]} onChange={(e)=>ingChanged(e.target.value,"type",index)}/>
                        </td>
                    </tr>
                )
                )}
                </tbody>
            </Table>
  
         <button onClick={updateIng}>Added</button>
        </Modal>
        </>
    )
}

export default UpdateIngridients
