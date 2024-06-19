import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {useSelector} from 'react-redux';

// Link Component --> which can be used to navigate to different route by click on it. 
// <a></a> tag --> refreshes the whole page when navigate but Link component not do like that.
 
const Header = () => {

  const cartTotalQuantity = useSelector(store=>store.cart.cartTotalQuantity);

    return (
      <div className="shadow-lg sticky bg-white top-0 z-10">
        <div className='flex justify-between sm:w-full md:w-[80%] md:m-[auto]'>
          <div>
            <Link to={'/'}><img className="w-[90px] sm:w-[85px] lg:w-[120px]" src={LOGO_URL} alt='logo-image'></img></Link>
          </div>
          <div className='flex justify-center items-center'>
            <ul className="flex">

              <li className={"mx-[10px] sm:mx-[20px] font-semibold sm:font-bold"}>
                <NavLink style={({isActive})=>isActive?{color:'orangered'}:{}} to='/'>
                  <i className="fa-solid fa-house text-center mr-1 sm:mr-2"></i>
                  Home
                </NavLink>
              </li>

              <li className="mx-[10px] sm:mx-[20px] font-semibold sm:font-bold">
                <NavLink style={({isActive})=>isActive?{color:'orangered'}:{}} to='/cart'>
                  <i className="fa-solid fa-cart-shopping mr-1 sm:mr-2"></i>
                  Cart
                </NavLink>
                {cartTotalQuantity>0 &&<span data-testid='spanTag' className="font-bold text-green-600 absolute top-[20%]">{cartTotalQuantity}</span>}
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    )
  }

  export default Header;