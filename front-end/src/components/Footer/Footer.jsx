import React from "react";
import Carousel from "../Carousel";
import "./footer.css"
class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    const images1 = [
      "https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_960_340.jpg",
      "https://cdn.pixabay.com/photo/2014/07/21/23/00/orange-cake-398966__340.jpg",
      "https://cdn.pixabay.com/photo/2016/03/27/22/38/cake-1284548__340.jpg",
      "https://cdn.pixabay.com/photo/2013/02/19/16/00/france-confectionery-83373__340.jpg",
    ];
    const images2 = [
      "https://cdn.pixabay.com/photo/2016/09/19/23/31/cakes-1681543__340.jpg",
      "https://cdn.pixabay.com/photo/2020/03/07/17/30/cake-4910417__340.jpg",
      "https://cdn.pixabay.com/photo/2020/08/11/13/58/apple-pie-5479993__340.jpg",
      "https://cdn.pixabay.com/photo/2014/10/13/16/11/cake-486874__340.jpg",
    ];

    return (
      <div className="wrapFooter">
        { window.location.pathname!=="/Payment" &&  window.location.pathname!=="/Easy" && window.location.pathname!=="/Pantry"&&
                     <Carousel id="carouselExampleControls2">
                        <div className="container-fluid">
                            <div className="carousel-item active">
                                <div className="row">
                                    <div className="col-3">
                                        <img src="https://cdn.pixabay.com/photo/2014/07/21/23/00/orange-cake-398966__340.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="col-3">
                                        <img src= "https://cdn.pixabay.com/photo/2016/03/27/22/38/cake-1284548__340.jpg" className="d-block w-100" alt="..." />
                                    </div>

                                    <div className="col-3">
                                        <img src="https://cdn.pixabay.com/photo/2013/02/19/16/00/france-confectionery-83373__340.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="col-3">
                                        <img src="https://cdn.pixabay.com/photo/2016/09/19/23/31/cakes-1681543__340.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row">
                                    <div className="col-3">
                                        <img src="https://cdn.pixabay.com/photo/2020/03/07/17/30/cake-4910417__340.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="col-3">
                                        <img src= "https://cdn.pixabay.com/photo/2020/08/11/13/58/apple-pie-5479993__340.jpg" className="d-block w-100" alt="..." />
                                    </div>

                                    <div className="col-3">
                                        <img src= "https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_960_340.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="col-3">
                                        <img src="https://cdn.pixabay.com/photo/2014/10/13/16/11/cake-486874__340.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                            </div>

              
                  
                        </div>
                    </Carousel>
         }
         {window.location.pathname!=="/Pantry"&&
         <>
        <div className="social d-flex">
          <a
            className="fa fa-facebook"
            href="https://www.facebook.com/"
            aria-hidden="true"
          ></a>
          <a
            className="fa fa-instagram"
            href="https://www.instagram.com/"
            aria-hidden="true"
          ></a>
          <a
            className="fa fa-twitter"
            href="https://www.twitter.com/"
            aria-hidden="true"
          ></a>
        </div>
        <div className="ContactUs  d-flex flex-wrap ">
          <a className="fa fa-phone" aria-hidden="true">
            058-5577025
          </a>
          <a
            className="fa fa-map-marker"
            aria-hidden="true"
            href="https://g.page/PIANO-CENTER-ir-yamim?share"
          >
            {" "}
            Netanya,Piano Shopping Center
          </a>
          <a
            className="fa fa-envelope-o"
            aria-hidden="true"
            href="mailto:BakerLand@gmail.com?subject=Subject&body=message%20goes%20here"
          >
            BakerLand@gmail.com
          </a>
          © All rights reserved to Odelia Melloul
        </div>
        </>}
      </div>
    );
  }
}
export default Footer;
