import React ,{useState,useEffect} from "react"
import Card from "./Product/productCard/Card"
import Category from './Category/Category';
import Pagination from "./Pagination";
import {useDispatch,useSelector} from 'react-redux'
import { listProducts } from "../actions/productActions"
import Loader from "./Loader";
import { load } from "dotenv";

function Catalog(props)
{
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [display, setDisplay] = useState("none")

  const keyword=props.match.params.keyword
  
  const dispatch = useDispatch()
  const productsList=useSelector(state=>state.productList)
  const{loading,error,products}=productsList
  

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // let filteredProduct=localStorage.getItem("filteredProducts")?JSON.parse(localStorage.getItem("filteredProducts")): localStorage.setItem("filteredProducts",JSON.stringify(products))
  let currentProducts = products? products.slice(indexOfFirstProduct, indexOfLastProduct):[];
   

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch,keyword]
  )

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const displayChange=()=>
  {
    display==="none"? setDisplay("block"): setDisplay("none")
  }
  return(
          <>
          { loading ? <Loader/>: error? <p>{error}</p>:

          <div className="Catalog">
           <div className="d-flex" >
               {/* <button className="btnDisplay" onClick={displayChange}> 
                        <img  src="https://img.icons8.com/material-rounded/32/D59F04/sorting-answers.png"/>  
                  </button>   */}
               {/* {display==="block"  && <Category />} */}
              
               <div div className="container Products" width="100%">
              { loading ? <Loader/>:
              !error && currentProducts.length==0? <p className="p-5" style={{color:"white"}}>Sorry there is no matching product for your search</p>:
              currentProducts.map((p)=> <Card  id={p._id} name={p.name} price={p.price} image={p.image} weight={p.weight} />
              )} 

            </div>
          </div>
          <Pagination
               currentPage={currentPage}
               productsPerPage={productsPerPage}
               totalProducts={products.length}
               paginate={paginate}
             />
          </div>
          }
          </>
          )
}
export default Catalog