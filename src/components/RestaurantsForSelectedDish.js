import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./shimmer";
import { SWIGGY_DISHES_AVAILABLE_RESTAURANTS_API } from "../utils/constants";

// RestaurantsForSelectedDish --> restaurants available for selected dish..
const RestaurantsForSelectedDish = () => {

    const [listOfRestaurants, setListofRestaurants] = useState([]);

    // catching api errors 
    const [apiError, setApiError] = useState(false);

    const { dishId } = useParams();
    console.log('dishId', dishId);

    const fetchRestaurants = async () => {
        try {
            const data = await fetch(`${SWIGGY_DISHES_AVAILABLE_RESTAURANTS_API}${dishId}&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null`)
            const json = await data.json();
            if(json.statusCode) {
                return setApiError(true)
            }
            setListofRestaurants(json?.data?.cards);
            setApiError(false);
            console.log(json);
        } catch (error) {
            setApiError(true)
        }
    }

    useEffect(() => {
        fetchRestaurants();
    }, [])


    // Title and Name 
    const { title, description } = listOfRestaurants.length > 0 && listOfRestaurants[0]?.card?.card;


    // Filtering Restaurants
    const filteredRestaurants = listOfRestaurants?.filter(restaurant => {
        return restaurant?.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    })

    if (apiError ) {
        return (
            <div className="flex justify-center items-center w-[90%] sm:w-[70%] lg:w-[35%] h-[200px] m-auto rounded-lg shadow-lg mt-4">
                <h2 className="font-bold text-xl sm:text-2xl text-red-700">Something went wrong.....</h2>
            </div>
        )
    }

    if (filteredRestaurants.length === 0) {
        return (
            <Shimmer />
        )
    }

    return (
        <div className="sm:w-[90%] md:w-[80%] m-[auto] sm:py-4 md:p-7">
            <div className="mx-4">
                <h1 className="font-bold text-3xl mt-6 mb-2">{title}</h1>
                <p className="font-semibold text-slate-700">{description}</p>
            </div>

            <h3 className="font-bold mx-4 mt-6 text-xl">Restaurants to explore</h3>

            <div className="flex flex-wrap justify-between cursor-pointer">
                {
                    filteredRestaurants?.map(resCard => {
                        console.log(resCard?.card?.card);
                        return (
                            <Link key={resCard?.card?.card?.info?.id} to={`/restaurants/${resCard?.card?.card?.info?.id}`}>
                                <RestaurantCard resData={resCard?.card?.card} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RestaurantsForSelectedDish