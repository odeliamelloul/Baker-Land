import React ,{useState} from 'react'

function StarAnimation() {
    

    const [star1, setStar1] = useState("fa fa-star-o")
    const [star2, setStar2] = useState("fa fa-star-o")
    const [star3, setStar3] = useState("fa fa-star-o")
    const [star4, setStar4] = useState("fa fa-star-o")
    const [star5, setStar5] = useState("fa fa-star-o")
    
    const changeAllStar=()=>
    {
        setStar1(`fa fa-star-o`)
        setStar2(`fa fa-star-o`)
        setStar3(`fa fa-star-o`)
        setStar4(`fa fa-star-o`)
        setStar5(`fa fa-star-o`)
    }

    const changeStar=(id)=>
    {
        switch (id) {
               case 1:
               if(star1==="fa fa-star-o")
               setStar1(`fa fa-star`)
               else changeAllStar()
               break;
                case 2:
               if(star2==="fa fa-star-o" ){setStar1(`fa fa-star`);setStar2(`fa fa-star`)}
               else changeAllStar()
               break;
               case 3:
               if(star3==="fa fa-star-o" ){setStar1(`fa fa-star`);setStar2(`fa fa-star`);setStar3(`fa fa-star`)}
               else changeAllStar()
               break;
               case 4:
               if(star4==="fa fa-star-o" ){setStar1(`fa fa-star`);setStar2(`fa fa-star`);setStar3(`fa fa-star`);setStar4(`fa fa-star`)}
               else changeAllStar()
               break;
               case 5:
               if(star5==="fa fa-star-o" ){setStar1(`fa fa-star`);setStar2(`fa fa-star`);setStar3(`fa fa-star`);setStar4(`fa fa-star`);setStar5(`fa fa-star`)}
               else changeAllStar()
               break;
        
            default:
                break;
        }
    }
    
    return (
    <div className="text-center">
                <i className={star1} onClick={()=>changeStar(1)} aria-hidden="true"></i>
                <i className={star2} onClick={()=>changeStar(2)} aria-hidden="true"></i>
                <i className={star3} onClick={()=>changeStar(3)} aria-hidden="true"></i>
                <i className={star4} onClick={()=>changeStar(4)} aria-hidden="true"></i>
                <i className={star5} onClick={()=>changeStar(5)} aria-hidden="true"></i>
    </div>   
        
    )
}

export default StarAnimation
