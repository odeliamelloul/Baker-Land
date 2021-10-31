import React,{ useEffect,useState } from "react"
import {useDispatch,useSelector} from 'react-redux'
import {deleteUser, listUsers } from "../../../actions/userActions"
import {Table,Button} from 'react-bootstrap'
import Loader from '../../Loader'
import { Link } from "react-router-dom"


const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList=useSelector(state=>state.userList)
    const {loading,error,users}=userList

    const userDelete=useSelector(state=>state.userDelete)
    const {success:successDelete}=userDelete

    const userLogion=useSelector(state=>state.userLogin)
    const {userInfo}=userLogion

    useEffect(() => {
    
    if(userInfo && userInfo.isAdmin)
        dispatch(listUsers())
    else history.push('/SignIn')
     
    }, [dispatch,successDelete,userInfo])

    const deleteUserHandler=(userId)=>
    {
        if(window.confirm('Are you sure?')){
           dispatch(deleteUser(userId))
        }
    }
    return (
        <> 
        <h1>Users</h1>
        {loading ? <Loader/> : error ? <p>{error}</p>:
            <div>
            <Table striped border hover responsive className="table-sm">
                <thead>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </thead>
                <tbody>
                    {
                        users.map(user=>
                            (
                             <tr key={user._id}>
                                 <td>{user._id}</td>
                                 <td>{user.name}</td>
                                 <td><a href={`mailto:${user.email}`}></a>{user.email}</td>
                                 <td>{user.isAdmin?(<i className="fa fa-check" style={{color:'green'}}></i>)
                                :
                                (<i className="fa fa-times" style={ {color:'red'}}></i>)}</td>
                                <td>
                                <div className="d-flex  container-edit-delete-btn" >
                                <Link to={{pathname:`/admin/user/${user._id}/edit`}}>
                                 <Button variant='light' className='btn-sm'>
                                    <i className='fa fa-edit'></i>
                                  </Button>
                                </Link>
                                  <Button variant='light' className='btn-sm' onClick={()=>deleteUserHandler(user._id)}>
                                    <i className='fa fa-trash'></i>
                                  </Button>
                                  </div>
                                </td>
                             </tr>
                            ))
                    }
               </tbody>
            </Table>
        </div>}
        </>
    )
}

export default UserListScreen

