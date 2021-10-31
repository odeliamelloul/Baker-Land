import express from 'express'
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders} from '../controllers/orderController.js'
import { protect,admin } from '../middleware/authMidlleWare.js'

const router=express.Router()

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myOrders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)


export default router