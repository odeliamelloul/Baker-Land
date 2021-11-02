import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const SearchBox = ({history}) => {
    const [keyword, setKeyWord] = useState('')

    const submitHandler = (e) => {
       e.preventDefault()
       if(keyword.trim())
       {
         history.push(`/search/${keyword}`)
       }
       else{
           history.push("/Catalog")
       }
      }

    return (
    <form  onSubmit={submitHandler}  className="search-Box">
        <input  onChange={(e)=>setKeyWord(e.target.value)}  className="form-control" type="Search"  placeholder="Search" aria-label="Search"/>
           <button type='submit' className="fa fa-search" style={{border:"none",backgroundColor:"transparent"}} ></button> 
    </form>

    )
}

export default SearchBox
