import React,{ useRef, useState,useEffect} from "react"
import {useDispatch,useSelector} from 'react-redux'
import {saveShippingAddress} from '../../actions/cartActions'
import "./checkOut.css";


function Adress(props){  
    
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    
    const [country, setCountry] = useState(shippingAddress.country)
    const [errCity, setErrCity] = useState("")
    const [errStreet, setErrStreet] = useState("")
    const [errPostCode, setErrPostCode] = useState("")
    const [saveAdress, setSaveAdress] = useState(false)
    const [flag, setFlag] = useState(false)
    const dispatch = useDispatch()
    const city =  useRef()
    const address = useRef()
    const postCode= useRef()
    
useEffect(() => {
   
   setCountry(shippingAddress.country)
   city.current.value=shippingAddress.city
   address.current.value=shippingAddress.address
   postCode.current.value=shippingAddress.postalCode
   console.log(shippingAddress)
}, [])

//Country
const  CountryChange=(e)=>{
   setCountry(e.target.value)
}
//city
const cityChange = () => {
  if (!/^[a-zA-Z]+$/.test(city.current.value)) {
    setFlag(false)
    city.current.style.border = "red solid 1px"

    if (city.current.value === "")
      setErrCity( "*Please enter a City" )
       else setErrCity( "*only letter " )
  }
   else {
   setFlag(true)
    setErrCity( "" )
    city.current.style.border = "none"
  }

}

//adress: street +num
const addressChange = () => {
  if (!/^[a-zA-Z]+[\s,\,]+[0-9]+$/.test(address.current.value)) {
    setFlag(false)
    address.current.style.border = "red solid 1px"
    if (address.current.value === "")
      setErrStreet( "*Please Enter an adress" )
    else setErrStreet( "*Enter an Correct adress like: street,num" ) }

  else {
    setErrStreet(true)
    address.current.style.border = "none"
    setErrStreet( "" )
  }
}
//postCodeChange
const postCodeChange = () => {
  if (!/^[0-9]{7}$/.test(postCode.current.value)) {
    setFlag(false)
    postCode.current.style.border = "red solid 1px"
    if (postCode.current.value === "")
      setErrPostCode("*Please Enter a PostCode" )
    else setErrPostCode( "**only Number Up to 7 digits" )
  } else {
   setFlag(true)
   postCode.current.style.border = "none"
    setErrPostCode("")
  }
}
const SaveChange = () => {
    cityChange()
    postCodeChange()
    addressChange()
  
    if(flag===true)
    {
      setSaveAdress(true)
      dispatch(saveShippingAddress({country:country, address:address.current.value,city:city.current.value,postalCode:postCode.current.value}))
    }

  }
    return (
    <div>
      <div className="d-flex flex-column">
        <img className="icon-Checkout" width="40px" height="40px" src="https://img.icons8.com/ultraviolet/40/000000/map-marker.png"/>
          {/* <p> please enter your delivery Adress</p> */}
         
          <select onChange={CountryChange} name="country" className="form-select-country" id="edit-country">
            <option value="Israel" > Israel </option>
            <option value="Belgium">Belgium</option>
            <option value="Brazil">Brazil</option>
            <opton  value="Canada">Canada</opton>
            <option value="Egypt">Egypt</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Ireland">Ireland</option>
            <option value="Italy">Italy</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Mexico">Mexico</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Yemen">Yemen</option>

          </select> <br />

          <div className=" d-flex flex-column">
            <input
              className="adress"
              onChange={cityChange}
              ref={city}
              placeholder="city"
            />
            <label className="ErrForm">{errCity}</label>
          </div>
          <div className=" d-flex flex-column">
            <input
              className="adress"
              onChange={addressChange}
              ref={address}
              placeholder="adress"
            />
            <label className="ErrForm">{errStreet}</label>
          </div>

          <div className=" d-flex flex-column"> 
            <input
              className="adress"
              onChange={postCodeChange}
              ref={postCode}
              placeholder="PostCode"
            />
            <label className="ErrForm">{errPostCode}</label>
          </div>
          <button onClick={SaveChange} className="shippingBtn">  Save Adress </button>
        </div>
        {saveAdress && <div> <p> Your adrees was saved!</p>
      </div>} 
    </div>
    )
}

export default Adress
