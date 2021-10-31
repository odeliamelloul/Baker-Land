import Product from '../models/userModel.js'
import  asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser= asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        myRecipe:user.myRecipe,
        favoriteRecipe:user.favoriteRecipe,
        cart:user.cart,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password,phone} = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
      name,
      email,
      password,
      phone
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        myRecipe:user.myRecipe,
        favoriteRecipe:user.favoriteRecipe,
        cart:user.cart,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
 


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        myRecipe:user.myRecipe,
        favoriteRecipe:user.favoriteRecipe,
        cart:user.cart,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })



// @desc    Get all users
// @route   GET /api/users
// @access  Private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})


// @desc    delete user by id
// @route   GET /api/users/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if(user){
    await user.remove()
    res.json({message:'User Removed'})
  }
  else{
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    update user by id
// @route   PUT /api/users/:id
// @access  Public

const updateUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name||user.name
    user.email = req.body.email||user.email
    user.phone = req.body.phone||user.phone
    user.myRecipe= req.body.myRecipe||user.myRecipe,
    user.favoriteRecipe= req.body.favoriteRecipe||user.favoriteRecipe
    user.cart=req.body.cart||user.cart
    if(req.body.password)
      user.password = req.body.password
    
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      password:updatedUser.password,
      myRecipe:updatedUser.myRecipe,
      favoriteRecipe:updatedUser.favoriteRecipe,
      cart:updatedUser.cart,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


// @desc    update user by id
// @route   PUT /api/users/:id
// @access  Private/admin

const updateUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id)
  if (user) {
    user.name =  req.body.name||user.name
    user.email = req.body.email||user.email
    user.phone = req.body.phone||user.phone
    user.isAdmin = req.body.isAdmin
    
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,

    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})



export {
  authUser,
  getUserProfile,
  registerUser,
  getUsers,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser

}