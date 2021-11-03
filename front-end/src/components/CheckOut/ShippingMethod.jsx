import React,{useState,useRef,useEffect} from 'react'
import { useSelector } from 'react-redux';


function ShippingMethod({getSumShipping,sum}) {

    const [checkMethod,setCheckMethod]=useState(false)
    const [SumShipping, setSumShipping] = useState(0)
    const cart=useSelector(state=>state.cart)

    
    useEffect(() => {
     
    if(checkMethod===false)
       getSumShipping(-1)
        else
       getSumShipping(SumShipping)

        console.log(checkMethod)
    }, [checkMethod,SumShipping])

    const methodChanged = (e) => {
      
      console.log(checkMethod)
      setCheckMethod(true)
        if (e.currentTarget.value === "standard") {
          if (sum < 35) setSumShipping( 2 );
          else setSumShipping(0);
        } 
         else {
          if (sum < 100)  setSumShipping(12);
          else setSumShipping(0);
        }
      };
      
      const addDays=(date, days)=>{
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toDateString();
      }
     const date = new Date();

    return(
      <>
          <img src="https://img.icons8.com/ultraviolet/40/000000/delivery--v2.png"/>
          <table className="d-flex flex-column mt-4 ">
  

            <tbody>          
            <thead>
              <th>Shipping Method</th>
              <th>Estimated to be delivered:</th>
              <th>Free-shipping</th>
            </thead>
              <tr>
                <td>
                
                <input
                    type="radio"
                    onClick={methodChanged}
                    value="standard"
                    name="delivery"
                    id="" />
                  <p>Standard shiping</p>
                </td>
              
                <td> 
                   <div className="date"> {addDays(date, 5)}</div>
                  <div  className="price"> 2.00$</div>
                </td>
                <td>
                   <div className="free"> over 35.00$</div>
                </td>
              </tr>

              <tr>
                <td >
                <input
                    type="radio"
                    onClick={methodChanged}
                    value="Express"
                    name="delivery"
                    id="" /><p>Express shiping</p>
                </td>
                <td> 
                   <div className="date"> {addDays(date,2)}</div>
                  <div  className="price"> 12.00$ </div></td>
                <td>
                   <div className="free"> over 100.00$</div>
                </td>
              </tr>
            </tbody>
          </table>
            
        </>
    )
}

export default ShippingMethod
