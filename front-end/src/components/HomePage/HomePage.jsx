import React from "react"
import { Link } from "react-router-dom"
import Carousel from "../Carousel"
import Map from "../Map"
import '../../baking-video/video.css'
import './homePage.css'
import video1 from '../../baking-video/video1.mp4'
import video2 from '../../baking-video/video2.mp4'
import video3 from '../../baking-video/video3.mp4'
import video4 from '../../baking-video/video4.mp4'
import video5 from '../../baking-video/video5.mp4'
class HomePage extends React.Component
{
    constructor()
    {
        super()
         this.state={ }
    }

        render(){
       
        return(
          <div className="homePage d-flex">
          <div className="homePage d-flex flex-column">
           <div className="d-flex flex-column wrap-videos">
                <video className="video1" loop controls autoPlay>
                        <source src={video1} type="video/mp4"/>
                    </video>            
                <video className="video2" loop controls autoPlay>
                        <source src={video2} type="video/mp4"/>
                    </video>            
                <video className="video3" loop controls autoPlay>
                        <source src={video3} type="video/mp4"/>
                    </video>            
                <video className="video4" loop controls autoPlay>
                        <source src={video4} type="video/mp4"/>
                    </video>            
                <video className="video5" loop controls autoPlay>
                        <source src={video5} type="video/mp4"/>
                    </video>
              </div>
              <p className="centered fs-3">Engaged <br /> in the joy  of baking<br /> With us, anyone can  make <br /> chef recipes</p>
             <Link className="centeredBtn " to={{pathname:"/Catalog"}}>Shop Now</Link>
            </div>  
            <img src="https://images.pexels.com/photos/806363/pexels-photo-806363.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
            {/* <Carousel id="carouselExampleControls1" className="w-100">
                       <div className="carousel-item">
                            <img  src="https://cdn.pixabay.com/photo/2021/01/01/21/56/cooking-5880136__340.jpg" alt="altplacer" />
                        </div>
                        <div className="carousel-item ">
                            <img  src="https://media.istockphoto.com/photos/raw-ingredients-for-cooking-pie-bakery-background-top-view-picture-id1254524198?k=20&m=1254524198&s=612x612&w=0&h=8zgFjQDjdWeFYT5egLOFHvWsthZXBbwHTeIYeXzx6gQ=" alt="altplacer" />
                        </div>
                        <div className="carousel-item active">
                            <img  src="https://media.istockphoto.com/photos/kitchen-utensils-and-tools-for-homemade-baking-on-a-light-wooden-picture-id853351012?k=20&m=853351012&s=612x612&w=0&h=9kyOVQB8RvQ8ujUghnAyBET8fScNhW7BwJ_ihgSNRgQ=" alt="altplacer" />
                            <text className="centered fs-3">Engaged in the joy of baking <br />With us, anyone can make chef recipes</text>
                            <Link className="centeredBtn " to={{pathname:"/Catalog"}}>Shop Now</Link>
                        </div>
                        <div className="carousel-item">
                            <img  src="https://media.istockphoto.com/photos/mom-with-daughter-on-kitchen-picture-id883109876?k=20&m=883109876&s=612x612&w=0&h=JzQOzGQeM7fqU5gAuS6J_f5WMXK8SPxItM6bMeCaLbg=" alt="altplacer" />
                        </div>
                        <div className="carousel-item">
                            <img  src="https://media.istockphoto.com/photos/belgian-waffles-with-ice-cream-and-berries-picture-id1033058306?k=20&m=1033058306&s=612x612&w=0&h=KETbzjwRwAuX18aqp1Ue7uMDol7JpCiVkXY_FNbRhxw=" alt="altplacer" />
                        </div>

             </Carousel> */}
    
          </div>
        )
    }
}
export default HomePage