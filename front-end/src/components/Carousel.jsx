import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle'
import React, { Component } from 'react'

// import './Carousel.css'

export default class Carousel extends Component {

    constructor(props){
        super(props)
    }

    
    render(){
        return (
            <div id={this.props.id} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {this.props.children}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#${this.props.id}`} data-bs-slide="prev">
                    <span className="fa fa-caret-left" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#${this.props.id}`} data-bs-slide="next">
                    <span className="fa fa-caret-right" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
        )
    }
    
}