import React,{ useState,useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux'
import { getUserDetails,updateUser } from "../../../actions/userActions";
import { USER_UPDATE_RESET } from "../../../constants/userConstant";
import Loader from "../../Loader";
import '../admin.css'
function UserEditScreen ({match,history})
{
    const userId=match.params.id
    const [isAdmin, setIsAdmin] = useState(false)    
    const [email, setEmail] = useState('')    
    const [phone, setPhone] = useState('')    
    const [name, setName] = useState('')    

    const dispatch = useDispatch()

    const userDetails=useSelector(state=>state.userDetails)
    const {loading,error,user}=userDetails

    const userUpdate=useSelector(state=>state.userUpdate)
    const {loading:loadingUpdate,error:errorUpdate,successUpdate}=userUpdate

    useEffect(() => {

        if(successUpdate){
           dispatch({type:USER_UPDATE_RESET})
           history.push('/admin/userList')
        }else{  

            if(!user.name || user._id!==userId )
            dispatch(getUserDetails (userId))

            else
            {
                setName(user.name)
                setEmail(user.email)
                setPhone(user.phone)
                setIsAdmin(user.isAdmin)
            }
        }
        
    }, [dispatch,history,userId,user,successUpdate])
   

      const sendForm=(e)=>{
        e.preventDefault()
        dispatch(updateUser({_id:userId,name,email,phone,isAdmin}))
      }
    
  return ( 
      <>
       <div> 
            <h1>Edit User</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate &&<p>{errorUpdate}</p>}
            
            {loading ? <Loader/>:error?<p>{error}</p>
            :
           (<form onSubmit={sendForm} className="d-flex flex-column formSign">
            
            <label>Full Name</label>
            <input  type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="xxxxx yyyyy"/>
            <label >Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="xxxx@gmail.com"/>
            <label>Phone Number</label>
            <input  type="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="050-1132222311"/>
            <div className="d-flex edit-user-list">
                <input type="checkbox" name="" id="isAdmin" value="isAdmin" onChange={(e)=>setIsAdmin(e.target.checked)}/>
                <label htmlFor="isAdmin">is Admin</label>
            </div>
                <button  type="submit" className="signBtn">Update</button>
        </form>)
        }
        </div> 
        </>
    )
}
export default UserEditScreen