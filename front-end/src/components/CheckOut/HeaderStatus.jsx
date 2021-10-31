import React,{useState,useEffect} from 'react'
import './checkOut.css'
function HeaderStatus() {
    
    const pathName = window.location.pathname;
    const StatusArr=[["/Bag","cart"],["/Shipping","Shipping adress"],["/PaymentMethod","Payment"],["order","Order Complete"]]
    
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
        
        <div className="headerStatus">
            {StatusArr.map((item,index)=>
                { 
                 return(
                 <span className={`${ ValueActive.includes(index)?  "active": "notActive"}`}> 
                    <span className="statusValue ">{item[1]}</span>
                    {index<StatusArr.length-1 && <span className="middle" > ____ </span>}
                 </span>
                 )
                })
            }
        </div>
    )
}

export default HeaderStatus
