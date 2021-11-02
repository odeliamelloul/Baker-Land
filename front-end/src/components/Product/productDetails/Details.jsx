import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Details.css";
import StarAnimation from "../../StarAnimation";
import Carousel  from "../../Carousel";
import {useDispatch,useSelector} from 'react-redux'
import { addToCart } from '../../../actions/cartActions';
import {listProductDetails} from '../../../actions/productActions'


function ProductDetails (props) {
  const [amount, setAmount] = useState(0);
  const [shareCopied, setShareCopied] = useState(false);
  const [copiedSrc, setCopiedSrc] = useState("https://img.icons8.com/83176B/ios-glyphs/30/share--v1.png" );
  const [isAdd, setIsAdd] = useState(false);

  const dispatch = useDispatch()
  const productsDetails=useSelector(state=>state.productDetails)
  const{loading,error,product}=productsDetails

  const cart= useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(listProductDetails(props.match.params.id))

    cart.cartItems.forEach((item) => {
        if (item.id ===props.match.params.id)
        setAmount(item.qty)
      });
    

  }, [dispatch,props.match])
  
  const removeProduct = () => {
    let num = amount;
    if (num > 0) {
      num -= 1;
      setAmount(num);
      cart.cartItems.forEach((item) => {
        if (item.id === props.match.params.id)
         item.qty =num;
         dispatch(addToCart(product._id,num))
      });
    }
  };

  const addProduct = () => {setAmount(amount + 1);};

  const addProductToCart = () => {
    setIsAdd(true);
    dispatch(addToCart(product._id,amount))
    setTimeout(() => {
      setIsAdd(false);
    }, 350);
  };

  const itsCopied = () => {
    setShareCopied(true);
    setCopiedSrc("https://img.icons8.com/fluency/48/000000/good-pincode.png");
    setTimeout(
      () => {
        setShareCopied(false);
        setCopiedSrc(
          "https://img.icons8.com/83176B/ios-glyphs/30/share--v1.png"
        );
      },

      1500
    );
  };
  const url = window.location.href;

  return (
   
    <div className="detailsCard  ">
      
      <div >
        <img src={product.image} className="detailsImg" alt=""/>
      </div>      
      <div className="details">
        <div>
          <div className="d-flex">
             <p className="nameOfProduct">{product.name}</p>
              <button className="shareUrl" onClick={itsCopied}>
              <CopyToClipboard text={url}>
                <img src={copiedSrc} />
              </CopyToClipboard>
            </button>
               {shareCopied && <span className="copied">Copied!</span>}
            </div>
         
          <p>Price: {product.price}$</p>
          <p><i class="fa fa-balance-scale"></i> {product.weight}</p>
          
          <div className="addToBag">
           {product.description!==""&& <p>description: {product.description}</p>}
            <p >status:{product.countInStock>0?'In Stock':'Out Of Stock'}</p>
            <div className="addOrRemove">
              <p>quantity:</p>
              <i className="fa fa-plus" onClick={()=>addProduct()} ></i>
              <span className="amountPlusMinus">{amount}</span>
              <i className="fa fa-minus" onClick={()=>removeProduct()}></i>
            </div >
            
            {isAdd && (
              <img className="animImg" src={product.image} alt="" />
            )}
            <button className="btnAdd" onClick={()=>addProductToCart()}>
              <i className="fa fa-shopping-cart"></i> Add to cart
            </button>
            <button className="btnAdd">
              <i className="fa fa-heart-o"></i> Add to favorites
            </button>
            <StarAnimation />
          </div>
        </div>
       
      </div>
    </div>
  );
};


export default ProductDetails;
