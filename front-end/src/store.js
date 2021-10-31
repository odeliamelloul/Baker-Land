
import { createStore,combineReducers,applyMiddleware } from 'redux'
import {composeWithDevTools} from "redux-devtools-extension" 
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderMyListReducer,
    orderListReducer
} from './reducers/orderReducers'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productUpdateReducer,
    productCreateReducer,
} from './reducers/productReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userListReducer,
    userUpdateProfileReducer,
    userDeleteReducer,
    userUpdateReducer
 } from './reducers/userReducers'
import {
    recipeListReducer,
    recipeCreateReducer,
    recipeUpdateReducer,
    recipeDetailsReducer
} from './reducers/recipeReducers'

const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    
    cart:cartReducer,

    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userUpdate:userUpdateReducer,
    userDelete:userDeleteReducer,

    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderMyList:orderMyListReducer,
    orderList:orderListReducer,

    recipesList:recipeListReducer,
    recipeCreate:recipeCreateReducer,
    recipeUpdate:recipeUpdateReducer,
    recipeDetails:recipeDetailsReducer
})
const cartItemFromStorage=localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    :[]

const userInfoFromStorage=localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    :[]  
const shippingAddressFromStorage=localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    :{}
const initialState={
  cart:{cartItems:cartItemFromStorage,shippingAddress:shippingAddressFromStorage},
  userLogin:{userInfo:userInfoFromStorage}
}
const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store