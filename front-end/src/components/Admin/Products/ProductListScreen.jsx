import React,{ useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux'
import {Table,Button} from 'react-bootstrap'
import Loader from '../../Loader'
import { deleteProduct, listProducts,createProduct } from '../../../actions/productActions'
import { PRODUCT_CREATE_RESET } from "../../../constants/productConstant"
import { Link } from "react-router-dom"



const ProductListScreen = ({history,match}) => {
    const dispatch = useDispatch()

    const productsList=useSelector(state=>state.productList)
    const{loading,error,products}=productsList

    const productDelete=useSelector(state=>state.productDelete)
    const{loading:loadingDelete,error:errorDelete,success:successDelete}=productDelete

    const productCreate=useSelector(state=>state.productCreate)
    const{loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct}=productCreate

    const userLogion=useSelector(state=>state.userLogin)
    const {userInfo}=userLogion

    useEffect(() => {
    dispatch({type:PRODUCT_CREATE_RESET})

    if(!userInfo.isAdmin)
        history.push('/SignIn')

    if(successCreate)
    {
        history.push(`/admin/product/${createdProduct._id}/edit`)
    }else{
        dispatch(listProducts())
    }
     
    }, [dispatch,userInfo,successDelete,successCreate,createdProduct])

    const deleteUserHandler=(productId)=>
    {
        if(window.confirm('Are you sure?')){
          //deleteProduct
          dispatch(deleteProduct(productId))
        }
    }
    const createProductHandler=()=>
    {
      dispatch(createProduct())
    }
    return (
        <> 
        <div className="d-flex justify-content-between">
            <div className="d-flex-column"> 
                <h1>Products</h1>
            </div>
            <div className="d-flex-column text-right"> 
                <button className="mt-3  create-product-btn" onClick={createProductHandler}>
                    <i className='fa fa-plus'></i>Create Product
                 </button>
            </div>
        </div>
        {loadingDelete && <Loader/>}
        {errorDelete && <p>{errorDelete}</p> }
        {loadingCreate && <Loader/>}
        {errorCreate && <p>{errorCreate}</p> }
        {loading ? <Loader/> : error ? <p>{error}</p>:
            <div>
            <Table  border hover responsive className="table-sm">
                <thead>
                    <th>IMAGE</th>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>WEIGHT</th>
                    <th>PRICE</th>
                    <th>iN STOCK</th>
                    <th>CATEGORY</th>
                    <th></th>
                </thead>
                <tbody>
                    {
                        products.map(product=>
                            (
                             <tr key={product._id}>
                                 <td><img width="50px" height="50px" src={product.image} alt="product.image" /></td>
                                 <td>{product._id}</td>
                                 <td className="td-name">{product.name}</td>
                                 <td>{product.weight}</td>
                                 <td>{product.price}$</td>
                                 <td>{product.countInStock}</td>
                                 <td className="td-name">{product.categories.map((cat,index)=>
                                    (
                                       index<product.categories.length-1?
                                        <td>{cat},</td>: <td>{cat}</td>
                                    ))}</td>
                                 <td >
                               <div className="d-flex container-edit-delete-btn">
                                <Link to={{pathname:`/admin/product/${product._id}/edit`}}>
                                 <Button variant='light' className='btn-sm'>
                                    <i className='fa fa-edit'></i>
                                  </Button>
                                </Link>
                                  <Button variant='light' className='btn-sm' onClick={()=>deleteUserHandler(product._id)}>
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

export default ProductListScreen