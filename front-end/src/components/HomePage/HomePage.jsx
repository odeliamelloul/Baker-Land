import React,{useEffect,useState} from "react"
import { Link } from "react-router-dom"
import './homePage.css'
import video1 from '../../baking-video/video1.mp4'
import video2 from '../../baking-video/video2.mp4'
import video3 from '../../baking-video/video3.mp4'
import video4 from '../../baking-video/video4.mp4'
import video5 from '../../baking-video/video5.mp4'
import video6 from '../../baking-video/video6.mp4'
import { useDispatch ,useSelector } from "react-redux"
import { listProducts } from "../../actions/productActions"
import Loader from "../Loader"
import Carousel from '../Carousel'
function HomePage(){

    const dispatch = useDispatch()
    const productsList=useSelector(state=>state.productList)
    const{loading,error,products}=productsList

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

   
    let arrRandom=[]
    useEffect(() => {
        dispatch(listProducts())

    }, [loading] )
    

   
            let random
            if(!loading && products.length>0)
            {
                for (let i = 0; i < 6; i++) {
                    random=products[Math.floor(Math.random()*products.length)]
                    if(arrRandom.includes(random))
                     i-=1
                    else
                    arrRandom.push(random) 
             }
           } 

           
    




   return(
       <>{ loading? <Loader/>:
       <div className="wrap-homePage">

        {/* <img className="img-principal" src="https://images.pexels.com/photos/806363/pexels-photo-806363.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" /> */}


              <Carousel id="carouselExampleControls7" className="carousel-six-video">
                       <div className="carousel-item">
                        <video className="bakerVideo" loop={true} autoPlay={true} muted={true}>
                            <source src={video1} type="video/mp4"/>
                         </video>                           
                        </div>
                        <div className="carousel-item ">
                        <video className="bakerVideo" loop={true} autoPlay={true} muted={true}>
                           <source src={video2} type="video/mp4"/>
                       </video> 
                        </div>
                        <div className="carousel-item ">
                        <video className="bakerVideo" loop={true} autoPlay={true} muted={true}>
                             <source src={video3} type="video/mp4"/>
                        </video> 
                        </div>
                        <div className="carousel-item active">
                        <video className="bakerVideo" loop={true} autoPlay={true} muted={true}>
                           <source src={video4} type="video/mp4"/>
                         </video>
                        </div>
                        <div className="carousel-item">
                        <video className="bakerVideo" loop={true} autoPlay={true} muted={true}>
                           <source src={video5} type="video/mp4"/>
                        </video>
                        </div>
                        <div className="carousel-item">
                        <video className="bakerVideo" loop={true} autoPlay={true} muted={true}>
                           <source src={video6} type="video/mp4"/>
                         </video>
                        </div>

             </Carousel>
      
              <p className="centered fs-3">Engaged  in the joy  of baking , With us anyone can  make chef recipes !</p>  

            <div className="home-Recipe d-flex">
              <Link  to={{pathname:"/Chef-Recipe"}}><img src="https://realfood.tesco.com/Media/images/RFO-636x418-Raspberry-ice-cream-cake-34942a7b-13cf-44c6-a8b3-4179b7bd70f8-0-636x418.jpg" alt="" /><h6 className="nameRecipes">Chef-Recipe</h6></Link>
              <Link  to={{pathname:"/Easy"}}> <img  src="https://tse1.mm.bing.net/th?id=OIP.ufP1m19On8Tq4JC-mt6l6QHaEK&pid=Api&P=0&w=312&h=177" /><h6 className="nameRecipes">Easy-Recipe</h6> </Link>
              <Link  to={{pathname:"/Pantry"}}> <img src="https://tse1.mm.bing.net/th?id=OIP.FpSlTZXSFJ6GhJSsHjQq2AHaJ7&pid=Api&P=0&w=300&h=300" alt="" /><h6 className="nameRecipes">According to your pantry</h6></Link>
              <Link  to={{pathname:userInfo && userInfo.length!==0?"/RecipeBook":"/SignIn"}}> 
              <img src="https://tse2.mm.bing.net/th?id=OIP.Mm-JksN5iN10bM97dhfynAHaFk&pid=Api&P=0&w=216&h=163" alt="" />
              <h6 className="nameRecipes">Your Recipe Book</h6></Link>
            </div>
            <div className="home-Products d-flex">
             {arrRandom.length>0 &&
             <Link className="btn-home-products" to={{pathname:"/Catalog"}}>Shop Now</Link>}  
                    <div className="shop-now d-flex">
                        <div>
                        {arrRandom.map((product)=>
                        <img src={product.image} alt="" />
                        )}</div>
                    </div>
            </div>
        </div>}
          </>
        )
    
}
export default HomePage           




       