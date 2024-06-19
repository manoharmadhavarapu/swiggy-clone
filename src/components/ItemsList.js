import {useDispatch, useSelector} from 'react-redux';
import { addIntoCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddButtonForCartItem from './AddButtonForCartItem';


// ItemList --> Items available in a particular restaurant. (Accordian)
const ItemsList = ({ items, searchText, resName }) => {

    // const cartItems = useSelector(store=>store.cart.items);
    const cartTotalQuantity = useSelector(store=>store.cart.cartTotalQuantity);

    const dispatch = useDispatch();

    // handling addintocart feature
    const handleAddItem = (item,resName,price,id) => {
        console.log('cart add 1st', item,price);
        dispatch(addIntoCart({item,resName,price}))
    }

    return (
        <>
            <div className='mb-4'>
                {
                    items?.filter(item=>item?.card?.info?.name.toLowerCase().includes(searchText?.toLowerCase()))
                    .map(item => {
                        const {name,id,price,description,ratings,imageId,defaultPrice} =item?.card?.info;
                        return (
                            <div data-testid='itemList' className="my-4" key={id}>
                                <div className="flex justify-between items-center w-full">
                                    <div className="w-9/12">
                                        <div className="my-5">
                                            <h4 className="font-semibold">{name}</h4>
                                            <h5 className="font-semibold">₹ {price ? price / 100 : defaultPrice/100}</h5>
                                        </div>
                                        {
                                            ratings.aggregatedRating.rating &&
                                            <div className="my-4">
                                                <h5 className="text-green-700 font-medium"><span className="text-green-800">&#9733;</span>  {ratings.aggregatedRating.rating}({ratings.aggregatedRating.ratingCountV2})</h5>
                                            </div>
                                        }
                                        <div>
                                            <p className="text-gray-600">{description}</p>
                                        </div>
                                    </div>
                                    <div className="w-[130px]">
                                        {imageId && <div className="shadow-lg">
                                            <img className="w-[100%] rounded-lg" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`} alt="res-info-img" />
                                        </div>}
                                        <div className="w-[100px] m-auto p-1 shadow-xl hover:bg-slate-200 rounded-lg flex items-center justify-center mt-1 bg-slate-100">
                                            
                                            {/* seperate component for add button/ items into cart. after clicking add button shows number of quantity added till now */}
                                            <AddButtonForCartItem id={id} handleAddItem={()=>handleAddItem(item,resName,price||defaultPrice,id)} cart={item}/>
                            
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-[15px]'>
                                    <hr></hr>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
            {cartTotalQuantity>0 && 
                <div className="bg-green-600 text-white font-medium flex items-center justify-between p-3 fixed right-0 bottom-0 left-0 mb-1 w-6/12 m-auto">
                    <h3>{cartTotalQuantity} items added</h3>
                    <Link to={'/cart'}><h3 className="uppercase">view cart</h3></Link>
                </div>
            }
        </>
    )
}

export default ItemsList;
