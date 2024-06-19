import { useSelector, useDispatch } from 'react-redux'
import { addIntoCart, clearCart, removeFromCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {

    const cartItems = useSelector((store) => store.cart.items);
    console.log('cartItems', cartItems);
    const resName = useSelector((store) => store.cart.resName);
    const cartTotalAmount = useSelector((store) => store.cart.cartTotalAmount);
    console.log(cartTotalAmount);

    const dispatch = useDispatch();

    const handleIncreaseItem = (cart) => {
        dispatch(addIntoCart({ item: cart }))
    }

    const handleDecreaseItem = (cart) => {
        dispatch(removeFromCart(cart));
    }

    const handleClearCart=()=>{
        dispatch(clearCart())
    }

    return (
        <>
            {cartItems.length>0 &&
                <div className='w-6/12 flex items-center justify-between m-auto mt-4'>
                    <h2 className='my-4 text-left font-bold text-red-600 text-xl'>{resName}</h2>
                    <h3 className='uppercase bg-black text-white font-medium p-1 rounded-md cursor-pointer' onClick={handleClearCart}>Clear Cart</h3>
                </div>
            }
            {cartItems.length > 0 ? 
            <div className='w-[80%] sm:w-[75%] lg:w-6/12 m-auto shadow-xl text-center p-3 border border-slate-200 my-4'>
                {
                    cartItems.map(cart => {
                        return (

                            <div data-testid='cartItem' key={cart.card.info.id} className='flex item-center justify-between w-full'>
                                <div className='my-4 w-1/3'>
                                    <h3 className='text-xs sm:text-base font-bold'>{cart?.card?.info?.name}</h3>
                                </div>
                                <div className='my-4 border w-[80px] h-[30px] border-black flex items-center justify-between px-1 rounded-sm'>
                                    <span className='font-medium text-2xl text-green-700 cursor-pointer' onClick={() => handleDecreaseItem(cart)}>-</span>
                                    <span className='font-bold text-green-700'>{cart?.cartQuantity}</span>
                                    <span className='font-medium text-2xl text-green-700 cursor-pointer' onClick={() => handleIncreaseItem(cart)}>+</span>
                                </div>
                                <div className='my-4 w-1/3'>
                                    <h3 className='font-medium text-xs sm:text-base'>₹{cart?.card?.info?.price ? cart?.card?.info?.price / 100 : cart?.card?.info?.defaultPrice / 100}</h3>
                                </div>
                            </div>

                        )
                    })
                }
                <hr className='my-3'></hr>
                <div className='text-start w-9/12 m-auto'>
                    <h4 className='font-medium my-2 text-green-700 text-xl text-center underline'>Bill Details</h4>
                    <div className='flex justify-between items-center my-1'>
                        <h4>Items Total</h4>
                        <h4>₹{cartTotalAmount.toFixed(2)}</h4>
                    </div>
                    <div className='flex justify-between items-center my-1'>
                        <h4>Delivery Fee</h4>
                        <h4>₹19</h4>
                    </div>
                    <hr></hr>
                    <div className='flex justify-between items-center my-1'>
                        <h3 className='uppercase font-bold'>To Pay</h3>
                        <h4 className='font-semibold'>₹{(cartTotalAmount + 19).toFixed(2)}</h4>
                    </div>
                    <div className='my-3 bg-green-600 p-2 text-center font-bold w-6/12 m-auto cursor-pointer'>
                        <h3 className='uppercase'>checkout</h3>
                    </div>
                </div>
            </div>
                :
                <div className='flex justify-center items-center mt-[20%] sm:w-6/12 sm:m-auto sm:mt-[10%]'>
                    <div className='text-center '>
                        <img className='rounded-lg ml-11 sm:ml-11 sm:my-3' src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSC574kFVXCBlFff7r0mCEc0mKq2KGY5J2OEsc__7WvAdBIh8nE' alt='no-items-cart' />
                        <p className='font-medium text-xl'>Your cart is empty</p>
                        <p className='font-light my-2'>You can go to home page to view more restaurants</p>
                        <Link to={'/'}>
                            <p className='text-white uppercase bg-orange-600 p-2 rounded-md w-9/12 m-auto font-semibold my-2'>See restaurants near you</p>
                        </Link>
                    </div>
                </div>
            }
        </>
    )
}

export default Cart;