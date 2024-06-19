import {useSelector,useDispatch}  from 'react-redux';
import { addIntoCart,removeFromCart } from '../redux/cartSlice';


const AddButtonForCartItem = ({id,handleAddItem,cart}) => {
    const cartItems = useSelector(store=>store.cart.items);
    const dispatch = useDispatch();

    const indexOfButton = cartItems?.findIndex(cart=>{
        return cart?.card?.info?.id === id;
    })

    const handleIncreaseItem = (cart) => {
        console.log('cart add button ',cart);
        dispatch(addIntoCart({ item: cart }))
    }

    const handleDecreaseItem = (cart) => {
        dispatch(removeFromCart(cart));
    }

    if(indexOfButton>=0){
        return(
            <>
                {<span className="font-bold text-2xl text-center hover:bg-slate-300 rounded-lg cursor-pointer w-1/3" onClick={()=>handleDecreaseItem(cart)}>-</span>}
                <button className="text-green-800 font-bold  text-center w-6/12 px-1" >{cartItems[indexOfButton].cartQuantity}</button> 
                {<span className="font-bold text-2xl text-center hover:bg-slate-300 rounded-lg cursor-pointer w-1/3" onClick={()=>handleIncreaseItem(cart)}>+</span>}
            </>
        )
    }
    
    return (
        <div>
            <button className="text-green-800 font-bold  text-center w-6/12 px-1" onClick={handleAddItem}>ADD</button>
        </div>
    )
}

export default AddButtonForCartItem