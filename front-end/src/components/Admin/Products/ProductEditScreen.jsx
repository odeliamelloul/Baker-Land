import React,{ useState,useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux'
import Loader from "../../Loader";
import { listProductDetails, updateProduct } from "../../../actions/productActions";
import '../admin.css'
import { PRODUCT_UPDATE_RESET } from "../../../constants/productConstant";
import { Link } from "react-router-dom";


function ProductEditScreen ({match,history})
{
    const productId=match.params.id
    const [image, setImage] = useState("")    
    const [name, setName] = useState('')    
    const [price, setPrice] = useState(0)    
    const [weight, setWeight] = useState('')    
    const [categories, setCategories] = useState([])
    const checkList =['cake decoration','spread','powder','without gluten','extract','ganache','new']
    const [description, setDescription] = useState('')    
    const [countInStock, setCountInStock] = useState(0)    
    const dispatch = useDispatch()

    const productDetails=useSelector(state=>state.productDetails)
    const {loading,error,product}=productDetails

    const productUpdate=useSelector(state=>state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=productUpdate

    useEffect(() => {
            if(successUpdate)
            {
                dispatch({type:PRODUCT_UPDATE_RESET})
                history.push(`/admin/productList`)

            }else{

                if(!product.name || product._id!==productId )
                dispatch(listProductDetails (productId))
                
                else
                {
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setCountInStock(product.countInStock)
                    setCategories(product.categories)
                    setDescription(product.description)
                    setWeight(product.weight)
                }
            }
            
        
    }, [dispatch,history,productId,product,successUpdate])
   
      const sendForm=(e)=>{
        e.preventDefault()
        dispatch(updateProduct(
            { _id:productId,
            image,
            name,
            price,
            weight,
            categories,
            description,
            countInStock}
        ))
      }

      const handleCheck = (event) => {

        if(event.target.value==="milky" && categories.includes("parve"))
        {
            setCategories(categories.splice(categories.indexOf("parve"), 1));
        }
        if(event.target.value==="parve" && categories.includes("milky"))
        {
            setCategories(categories.splice(categories.indexOf("milky"), 1));
        }

        var updatedList = [...categories];
        if (event.target.checked) {
          updatedList = [...categories, event.target.value];
        } else {
          updatedList.splice(categories.indexOf(event.target.value), 1);
        }
        console.log(updatedList)
        setCategories(updatedList);
      };

  return ( 
      <>
       <div> 
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate &&<p>{errorUpdate}</p>}
            
            {loading ? <Loader/>:error?<p>{error}</p>
            :
           (<form onSubmit={sendForm} className="d-flex flex-column formSign">
            
            <label>Product Name</label>
            <input  type="text" value={name} onChange={(e)=>setName(e.target.value)}placeholder="enter product name" />
            <label>weight</label>
            <input  type="text" value={weight} onChange={(e)=>setWeight(e.target.value)} placeholder="enter weight" />
            <select name="" id="" onChange={(e)=>setWeight(weight+e.target.value)}>
                <option value="ml">ml</option>
                <option value="kg">kg</option>
                <option value="gram">gram</option>
            </select>
            <label>Image</label>
            <input  type="text" value={image} onChange={(e)=>setImage(e.target.value)} placeholder="enter Image url" />
            <label>Description</label>
            <input  type="text" value={description} onChange={(e)=>setDescription(e.target.value)}  placeholder="enter description"/>
            <label >price</label>
            <div className="d-flex priceDolar ">
                <input className="input-price" type="text" value={price} onChange={(e)=>setPrice(e.target.value)}  placeholder="enter price" />
                <label >$</label>
           </div>
           <label>Select categories:</label>
           <div className="checkList">
                <div className="list-container">
                {checkList.map((item, index) => (
                    
                    <div key={index}>
                    <input value={item} checked={categories.includes(item)?true:false} type="checkbox" onChange={handleCheck}/>
                    <span>{item}</span>
                    </div>
                ))}
                </div>
                <input type="radio" name="mp" id="milky" value="milky" checked={categories.includes("milky")?true:false} onChange={handleCheck}/> <span>milky</span>
                <input type="radio" name="mp" id="parve" value="parve" checked={categories.includes("parve")?true:false} onChange={handleCheck}/><span>parve</span>
            </div>
            <label>amount in stock</label>
            <input  type="text" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)} />
            <button  type="submit" className="signBtn">Update</button>
            {successUpdate && 
            <>
                <h4>successfully updated</h4>
                <Link to={{pathname:'/admin/productList'}}>Go Back</Link>
            </>
            }

        </form>)
        }
        

        </div> 
        </>
    )
}
export default ProductEditScreen