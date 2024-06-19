import { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import { Link, useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { withRestaurantCategoryList } from "./RestaurantCategory";

// After clicking on restaurant card this component will triggers. and displays restaurant details and Menu(itemlists).
const RestaurantMenu = () => {

    // whenver state variable update, react triggers a reconciliation cycle( re-renders the component )
    const [searchText, setSearchText] = useState('');
    // catching api errors 
    const [apiError, setApiError] = useState(false);

    const { resId } = useParams();

    // CALLING CUSTOM HOOK and getting Restaurant Menu Info from api.
    const resInfo = useRestaurantMenu(resId,setApiError)

    //Higher Order Component --> For category list
    const RestaurantCategoryList = withRestaurantCategoryList(RestaurantCategory)
    const [showIndex, setShowIndex] = useState(0)

    const handleClick = (i)=>{
        console.log('clicked');
        if(showIndex===i){
            return setShowIndex(null)
        }
        setShowIndex(i);
    }

    if(resInfo?.statusMessage || apiError){
        return (
          <div className="flex justify-center items-center w-[90%] sm:w-[70%] lg:w-[35%] h-[200px] m-auto rounded-lg shadow-lg mt-4">
            <h2 className="font-bold text-xl sm:text-2xl text-red-700">Something went wrong.....</h2>
          </div>
        )
      }

    if (resInfo === null || resInfo === undefined || !resInfo) {
        return (
            <Shimmer />
        )
    }

    // object destructering --> Restaurant Banner Info
    const { name, avgRating, totalRatingsString, costForTwoMessage, cuisines, sla, areaName, feeDetails } = resInfo?.data?.cards[2]?.card?.card?.info;

    // Filtering Item categories --> ex: recommended, starters, curries, etc..
    const categories = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(category=>{
        return category?.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    })

    // Filtering NestedItem categories --> same like item categories but here categories are nested. ex: curries--> veg, non-veg etc..
    const nestedCategories = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(category=>{
        return category?.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    })

    return (
        <>
            <div className="w-[85%] sm:w-[80%] md:w-[60%] lg:w-[50%] m-[auto]">

                {/* Restaurant Details and Banner. */}
                <div className="my-4">
                    {name && <h2 className="font-bold text-2xl">{name}</h2>}
                </div>
                
                <div className="p-5 rounded-lg shadow-2xl">
                    <div className="flex items-center">
                        <h4 className="font-semibold"><span className="mr-1 text-green-800 font-bold">&#9733;</span>{avgRating} ({totalRatingsString})</h4>
                        <h4 className="ml-4 font-semibold">{costForTwoMessage}</h4>
                    </div>
                    <div>
                        <h4 className="text-orange-600 font-medium">{cuisines.join(', ')}</h4>
                    </div>
                    <div className="flex my-2">
                        <h4 className="font-medium">Outlet </h4>
                        <p className="ml-3">{areaName}</p>
                    </div>
                    <div className="mb-2">
                        <h4 className="font-semibold">{sla.slaString.toLowerCase()}</h4>
                    </div>
                    <div className="m-1">
                        <hr></hr>
                        <p className="mt-2">{feeDetails.message}</p>
                    </div>
                </div>

                <div className="my-10 flex items-center justify-center">
                    <p className="font-bold">--------- M E N U ---------</p>
                </div>


                {/* search for dishes */}
                <div className="flex items-center sticky top-20">
                    <input
                        className="w-[100%] bg-slate-300 p-2 rounded-lg placeholder:text-center font-bold"
                        type="text"
                        placeholder={"Search in " + name}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    >
                    </input>
                    {searchText.length!==0 && <span onClick={()=>setSearchText('')} className="cursor-pointer font-medium absolute right-[10px]">X</span>}
                </div>
                
                {/* this is for item category */}
                <div className="my-5">
                    {
                        categories.length > 0 &&
                        categories?.map((category,index)=>{
                            return(
                                // RestaurantCategory is now CONTROLLED COMPONENT.
                                <RestaurantCategory 
                                    key={category?.card?.card?.title} 
                                    data={category?.card?.card} 
                                    searchText={searchText}
                                    showIndex={showIndex===index?true:false}
                                    handleClick={()=>handleClick(index)}
                                    resName={name}
                                />
                            )
                        })

                    }
                </div>

                {/* this is for nested items category */}
                <div className="my-5">
                    {
                        nestedCategories.length>0 && nestedCategories?.map((category)=>{
                            return(
                                // RestaurantCategory is now CONTROLLED COMPONENT.
                                <RestaurantCategoryList 
                                    key={category?.card?.card?.title} 
                                    data={category?.card?.card} 
                                    searchText={searchText}
                                    resName={name}
                                />
                            )
                        })
                    }
                </div>
                
            </div>
           
        </>
    )
}

export default RestaurantMenu;