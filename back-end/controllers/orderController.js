import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//Create New Order
//Post /api/orders
//private
const addOrderItems = asyncHandler(async (req, res) => {
    const { 
        orderItems,
        shippingAddress,
        paymentMethod, 
        itemsPrice,
        taxPrice,
        coupon, 
        shippingPrice,
        totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No Order Items')
        return
    } else {
        const order = new Order(
            {
                orderItems, 
                user:req.user._id,
                shippingAddress,
                paymentMethod, 
                itemsPrice,
                taxPrice,
                coupon,
                shippingPrice,
                totalPrice
            }
        )
        const createdOrder= await order.save()
        res.status(201).json(createdOrder)
        
    }}
)

//Get Order By Id
//GET /api/orders/:id
//private
const getOrderById = asyncHandler(async (req, res) => {
const order= await Order.findById(req.params.id).populate('user','name email')
  
 if(order){
     res.json(order)
 }else{
   res.status(404)
   throw new Error('Order Not Found')
 }
})

//Get update Order to pay
//GET /api/orders/:id/pay
//private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order= await Order.findById(req.params.id)
      
     if(order){
         order.isPaid=true
         order.paidAt=Date.now()
         order.paymentResult={
             id:req.body.id,
             status:req.body.status,
             update_time:req.body.update_time,
             email_address:req.body.payer.email_address
         }
         const updatedOrder=await order.save()
         res.json(updatedOrder)
     }else{
       res.status(404)
       throw new Error('Order Not Found')
     }
    })

//Get Get logged in User Order
//GET /api/orders/myOrders
//private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders= await Order.find({user:req.user._id})
    res.json(orders)
 })

 
//Get Get all Order
//GET /api/orders
//private/admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
  })

export {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders}
