import express from 'express'
import {
    deleteProduct,
    getProducts,
    getProductsByID,
    updateProduct,
    createProduct,
} from '../controllers/productController.js'
import { protect,admin } from '../middleware/authMidlleWare.js'

const router=express.Router()

router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id').get(getProductsByID).delete(protect,admin,deleteProduct)
.put(protect,admin,updateProduct)






export default router
