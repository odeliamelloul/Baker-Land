import React,{useState,useEffect} from 'react'
import './checkOut.css'
function HeaderStatus() {
    
    const pathName = window.location.pathname;
    const StatusArr=[["/Bag","Cart"],["/Shipping","Shipping Adress"],["/PaymentMethod","Payment"],["order","Order Completed"]]
    
    const [ValueActive, setValueActive] = useState([])

    useEffect(() => {
        let arr=[]
        for(let i=0;i<StatusArr.length;i++)
        {

         if(StatusArr[i][0]===pathName || (i==3 && StatusArr[i][0]===pathName.split("/")[1]))
         {
            for(let j=0;j<i+1;j++)
                arr.push(j)
             break;
         }
        }
        setValueActive(arr)
    }, [pathName])

    

    return (
        <>
        <div className="headerStatus-md">
            {StatusArr.map((item,index)=>
                
                 <span className={ValueActive.includes(index)?  "active": "notActive"}> 
                    <span className="statusValue ">{item[1]}</span>
                    {index<StatusArr.length-1 && <span className="middle" >__</span>}
                 </span>
                 )
                }

        </div>          
        <div className="headerStatus-sm">
            {StatusArr.map((item,index)=>
               StatusArr[index][0]===pathName &&
                 <h1> 
                    <span className="statusValue ">{item[1]}</span>
                 </h1>
                 )
            }
            </div>
        </>
    )
}

export default HeaderStatus
