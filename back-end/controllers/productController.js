import Product from '../models/productModel.js'
import  asyncHandler from 'express-async-handler'

const getProducts= asyncHandler(async(req,res)=>{
   const keyword=req.query.keyword?
   {
     name:
     {
       $regex:req.query.keyword,
       $options:'i'
     }
   }:{}
    

    const products=await Product.find({...keyword})
    res.json(products)
})

const getProductsByID= asyncHandler(async(req,res)=>{
    const product=await Product.findById( req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({message:'Product not found'})
    }
})

  
  // @desc  Delete a product
  // @route  DELETE /api/products/:id
  // @access Private/Admin
  const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
  
    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
  

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {

  const product = new Product({
    price:0,
    user: req.user._id,
    name:"name",
    image:"url",
    weight:"0",
    categories:[],
    description:"",
    rating:0,
    countInStock:0,
  })

  const createdProduct = await product.save()
  res.status(201).json(product)
})

// @desc    Update a product
// @route   POST /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    price,
    name,
    weight,
    image,
    categories,
    rating,
    description,
    countInStock,
    review
  } = req.body
  
  const product = await Product.findById(req.params.id)

  if(product){
    product.price=price
    product.name=name
    product.weight=weight
    product.image=image
    product.categories=categories
    product.rating=rating
    product.description=description
    product.countInStock=countInStock
    product.review=review


    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {

    updateProduct,
    createProduct,
    getProducts,
    getProductsByID,
    deleteProduct,
}