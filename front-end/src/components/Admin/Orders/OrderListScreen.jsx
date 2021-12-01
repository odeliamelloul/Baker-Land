import React,{ useEffect,useState } from "react"
import {useDispatch,useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import Loader from '../../Loader'
import {listOrders} from '../../../actions/orderAction'
import { Link } from "react-router-dom"

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()

    const orderList=useSelector(state=>state.orderList)
    const {loading,error,orders}=orderList

    const userLogion=useSelector(state=>state.userLogin)
    const {userInfo}=userLogion

    useEffect(() => {
    if(userInfo && userInfo.isAdmin)
        dispatch(listOrders())
    else history.push('/SignIn')
     
    }, [dispatch,history,userInfo])

    return (
        <> 
        <h1>Orders</h1>
        {loading ? <Loader/> : error ? <p>{error}</p>:
            <div>
            <Table striped border hover responsive className="table-sm">
                <thead>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL PRICE</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>

                </thead>
                 <tbody>
                    {
                        orders.map(order=>
                            (
                             <tr key={order._id}>
                                 <td>{order._id}</td>
                                 <td>{order.user && order.user.name}</td>
                                 <td>{order.createdAt.substring(0,10)}</td>
                                 <td>{order.totalPrice.toFixed(2)}</td>
                                 <td style={ {color:'green'}}>
                                    {order.isPaid?(order.paidAt.substring(0,10))
                                    :
                                    (<i className="fa fa-times" style={ {color:'red'}}></i>)}
                                </td>

                                <td>
                                    {order.isDelivered?(order.deiveredAt.substring(0,10))
                                    :
                                    (<i className="fa fa-times" style={ {color:'red'}}></i>)}
                                </td>
                                <td>
                                <Link to={{pathname:`/order/${order._id}`}}>
                                 <Button variant='light' className='btn-sm'>
                                    Details
                                  </Button>
                                </Link>
                                 
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

export default OrderListScreen

