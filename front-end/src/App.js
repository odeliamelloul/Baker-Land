
import './App.css';
import React  from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import Header from './components/Header';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';

import Catalog from "./components/Catalog"
import AboutUs from "./components/AboutUS"
import ContactUs from './components/Contact/ContactUs'
import Blog from './components/Blog/Blog';

import SignIn  from './components/LogIn/SignIn';
import SignUp from "./components/LogIn/SignUp"
import UserProfile from './components/LogIn/UserProfile';

import productDetails from "./components/Product/productDetails/Details"
import Bag from './components/Bag/Bag';
import CartModal from './components/CartModal';


import Pantry from "./components/Recipes/Pantry"
import Recipe from './components/Recipes/Recipe';
import RecipeBook from './components/Recipes/RecipeBook';
import RecipeEditScreen from './components/Recipes/Create-update-recipe/RecipeEditScreen';
import ListRecipes from './components/Recipes/ListRecipes';

import Shipping from './components/CheckOut/Shipping';
import PaymentMethod from './components/CheckOut/PaymentMethod';
import PlaceOrder from './components/CheckOut/PlaceOrder';
import OrderScreen from './components/OrderScreen';

// Admin Screen
import UserListScreen from './components/Admin/Users/UserListScreen';
import UserEditScreen from './components/Admin/Users/UserEditScreen';
import ProductListScreen from './components/Admin/Products/ProductListScreen';
import ProductEditScreen from './components/Admin/Products/ProductEditScreen';
import OrderListScreen from './components/Admin/Orders/OrderListScreen';

class App extends React.Component{

  render(){
  return (
    <div className="App">
       <Router>
            <Header />  
              <Switch>
                <Route  exact path="/"  component={HomePage} />
                <Route  exact path="/Catalog" component={Catalog}/>
                <Route  exact path="/Search/:keyword" component={Catalog}/>
                <Route  exact path="/Search/:category" component={Catalog}/>
                <Route  exact path="/Catalog/page/:Id" component={Catalog}/>
                <Route  path="/Catalog/:id"  component={productDetails} />
                <Route  path="/AboutUS" component={AboutUs} />  
                <Route  path="/ContactUs" component={ContactUs} />  
                <Route  path="/Blog" component={Blog} /> 
                <Route  path="/SignIn" component={SignIn} />  
                <Route  path="/SignUp" component={SignUp} />  
                <Route  path="/UserProfile" component={UserProfile} /> 
                <Route  path="/Bag"component={Bag} />
                <Route  path="/PaymentMethod" component={PaymentMethod} />
                <Route  path="/Shipping" component={Shipping} />
                <Route  exact path="/order" component={PlaceOrder} />
                <Route  exact path="/order/:id" component={OrderScreen} />
                <Route  path="/CartModal" component={CartModal} /> 
                <Route  path="/Easy"  component={() => <ListRecipes recipesType={`Easy`} />} />
                <Route  path="/Chef-Recipe"  component={() => <ListRecipes recipesType={`Chef-Recipe`} />} />
                <Route  path="/Recipe/:id" component={Recipe} />   
                <Route  path="/RecipeBook" component={RecipeBook} />   
                <Route  path="/Pantry" component={Pantry} />    
                <Route  path="/RecipeEdit/:id/edit" component={RecipeEditScreen} />     
                <Route  path="/admin/userList" component={UserListScreen} />    
                <Route  path="/admin/user/:id/edit" component={UserEditScreen} />    
                <Route  path="/admin/productList" component={ProductListScreen} />    
                <Route  path="/admin/product/:id/edit" component={ProductEditScreen} />    
                <Route  path="/admin/orderList" component={OrderListScreen} />    
              </Switch>           
           <Footer/>
         </Router>
    </div>
  );
  
}}

export default App;
