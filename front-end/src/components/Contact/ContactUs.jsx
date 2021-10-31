import React from "react"
import Map from "../Map"
import './contact.css'
class ContactUs extends React.Component
{
 constructor()
 {
     super()
     this.state={
     isSubmit:false
     }
     this.flag=false
     this.name=React.createRef()
     this.email=React.createRef()
     this.password=React.createRef()
     this.phone=React.createRef()
 }
    nameChange=()=>
    {
          if(!/^[A-Za-z]+\s[A-Za-z]+$/.test(this.name.current.value) || this.name.current.value==="")
          {
              this.flag=false
              this.name.current.style.border="red solid 1px";
              

              if(this.name.current.value.match(/^[a-z]*[1-9]+[a-z]*$/))
              {
                 this.setState({errName:"*letter only like: odelia melloul"})
              }
              if(this.name.current.value.match(/^[A-Za-z]+$/))
              {
                 this.setState({errName:"*Missing name or last name"})
              }
              if(this.name.current.value==="")
              {
                 this.setState({errName:"*Missing name and last name"})
              }
          }   
          
          else{
              
              this.flag=true
              this.setState({errName:""})
              this.name.current.style.border="black solid 1px";
              localStorage.setItem("FullName",this.name.current.value)
          }
    }


    //email

    emailChange=()=>
    {
        if(!/^[a-zA-z0-9]+@gmail\.com$/.test(this.email.current.value))
        {
            this.flag=false
            this.email.current.style.border="red solid 1px";
            if(this.email.current.value==="")
            this.setState({errMail:" please Enter an email"})
            else
            this.setState({errMail:" Enter an  email like xxxx@gmail.com"})
        }  
        else{
            this.flag=true
            this.email.current.style.border="black solid 1px";
            this.setState({errMail:""})
            localStorage.setItem("Email",this.email.current.value)
        }
    }

    
    //phone
    phoneChange=()=>
    {
      if(!/^[0-9]{3}\-[0-9]{7}$/.test( this.phone.current.value))
      {
          this.flag=false
          this.phone.current.style.border="red solid 1px";
          if(this.phone.current.value==="")
          this.setState({errPhone:"Please Enter a phoneNumber"})
          else
          this.setState({errPhone:"*10 digit in this format xxx-xxxxxxx"})

      }
      else{
          this.flag=true
          this.phone.current.style.border="black solid 1px";
          this.setState({errPhone:""})
          localStorage.setItem("Phone",this.phone.current.value)
      }
    }
    submitForm=(e)=>{
        e.preventDefault()
           this.nameChange()
           this.emailChange()
           this.phoneChange()
           if(this.flag===true)
           this.setState({ isSubmit:true})
      }
  render(){
    return (
    <div className="wrapContactUs">
       <h1>Contact Us</h1>  
       <div className=" d-flex Contact">
        <div className="contactUsIcon d-flex flex-column"> 
             <a className="fa fa-envelope-o"  href="mailto:BakerLand@gmail.com?subject=Subject&body=message%20goes%20here" aria-hidden="true"></a>
             <a className="fa fa-phone" aria-hidden="true"></a>
             <a className="fa fa-facebook" aria-hidden="true" href="https://www.facebook.com/"></a>
             <a className="fa fa-instagram" aria-hidden="true"  href="https://www.instagram.com/"></a>
          </div>
          
          <form className=" d-flex flex-column formContactUs">
           
            <input type="text" ref={this.name} onChange={this.nameChange} placeholder="Full Name" />
            <label className="ErrForm" >{this.state.errName}</label>
            <input type="email" ref={this.email} onChange={this.emailChange} placeholder="xxx@gmail.com" />
            <label className="ErrForm">{this.state.errMail}</label>
            <input type="phone" ref={this.phone} onChange={this.phoneChange} placeholder="xxx-xxxxxxx" />
            <label className="ErrForm">{this.state.errPhone}</label>
            <textarea name="" id="" placeholder="message" ></textarea>
            <button type="submit" onClick={this.submitForm} >Submit</button>
            {this.state.isSubmit && <h2>Your Message was send Succesfully</h2> }
        </form>
        
         </div> 
          <Map/>
        </div>
    )
}}
export default ContactUs

