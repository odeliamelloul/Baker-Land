import { CARD_ADD_ITEM,CARD_REMOVE_ITEM,CARD_SAVE_SHIPPING_ADRESS ,CARD_SAVE_PAYMENT_METHOD} from "../constants/cartConstant"

export const cartReducer=(state={cartItems:[],shippingAddress:{}},action)=>
{
 switch (action.type) {
     case CARD_ADD_ITEM:
         const item=action.payload
         const existItem=state.cartItems.find( x=>x.id===item.id )
         if(existItem)
         {
           return{
               ...state,
               cartItems:state.cartItems.map(x=>x.id===existItem.id?item:x)
           }
         }
         else{
             return{
                 ...state,
                 cartItems:[...state.cartItems,item]
             }
         }
         case CARD_REMOVE_ITEM:
        
              return{
                  ...state,
                  cartItems:state.cartItems.filter( (x)=>x.id!==action.payload )
              }
        case CARD_SAVE_SHIPPING_ADRESS:
        
                return{
                    ...state,
                    shippingAddress:action.payload
                }
        
        case CARD_SAVE_PAYMENT_METHOD:
        
                return{
                    ...state,
                    paymentMethod:action.payload
                }
        
     default:
         return state;
 }
}