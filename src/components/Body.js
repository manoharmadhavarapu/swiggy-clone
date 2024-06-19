import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import FoodItems from "./FoodItems";
import { SWIGGY_RESTAURANTS_API } from "../utils/constants";

const Body = () => {

  const [activeFilter, setActiveFilter] = useState(false);

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  // catching api errors 
  const [apiError, setApiError] = useState(false);

  //making a copy of all restaurants for purpose of not changing original list.
  const [filterList, setFilterList] = useState([]);
  // Title
  const [title, SetTitle] = useState('');
  // FoodItems - Biryani, idli, chinese etc...
  const [dishes, setDishes] = useState([])

  // whenver state variable update, react triggers a reconciliation cycle( re-renders the component )
  const [searchText, setSearchText] = useState('');

  //CHECKING ONLINE STATUS --> CUSTOM HOOK
  const onlineStatus = useOnlineStatus();

  // Higher Order Component 
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {

      // Handling CORS error -->Add the proxy server infront of our API--> https://thingproxy.freeboard.io/fetch/OUR_API OR add cors chrome extension without adding proxy server.
      const data = await fetch(SWIGGY_RESTAURANTS_API);

      const json = await data.json();

      // optional chaining
      setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      setFilterList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      SetTitle(json?.data?.cards[2]?.card?.card?.title);
      setDishes(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info)
      setApiError(false);

    } catch (error) {
        setApiError(true)
    }

  }

  // Handling Four + rating filter
  const handleRatingFilter = () => {
    if (activeFilter === false) {
      let filteredRestaurants = listOfRestaurants.filter(res => res.info.avgRating > 4)
      setFilterList(filteredRestaurants)
      setActiveFilter(true)
    }
    if (activeFilter === true) {
      setFilterList(listOfRestaurants)
      setActiveFilter(false)
    }

  }

  // Handle Search 
  const handleSearch = () => {

    // Filter the restaurant cards and update in UI.
    let filterSearchRestaurants = listOfRestaurants.filter(res => {
      return res.info.name.toLowerCase().includes(searchText.toLowerCase());
    })

    setFilterList(filterSearchRestaurants)

  }

  // checking internet connection
  if (onlineStatus === false) {
    return (
      <div className="flex justify-center items-center w-[90%] sm:w-[70%] lg:w-[35%] h-[200px] m-auto rounded-lg shadow-lg mt-4">
        <h2 className="font-bold text-xl sm:text-2xl text-red-700">Check your internet connection...</h2>
      </div>
    )
  }

  if(apiError){
    return (
      <div className="flex justify-center items-center w-[90%] sm:w-[70%] lg:w-[35%] h-[200px] m-auto rounded-lg shadow-lg mt-4">
        <h2 className="font-bold text-xl sm:text-2xl text-red-700">Something went wrong.....</h2>
      </div>
    )
  }

  // if no data is present then shimmer ui will display until data available.
  if (filterList?.length === 0) {
    return (<Shimmer />)
  }


  return (
    <div className='p-3 sm:p-0 sm:w-[90%] sm:m-auto md:w-[80%] md:m-[auto] lg:p-7'>

      <h2 className="text-2xl font-bold sm:text-xl sm:mt-4 lg:text-2xl lg:mt-8">What's on your mind?</h2>
      <div className="flex overflow-x-scroll cardScroll">
        <FoodItems dishes={dishes}/>
      </div>

      <div className="flex flex-col sm:flex-row  my-5 items-center sticky top-[80px] z-10">

        <div className="mr-3 flex items-center rounded-lg shadow-md border-2 border-solid border-black mb-4 sm:mb-0 w-[300px] sm:w-[380px] lg:w-[450px]">
          <input data-testid='searchInput' type="text" placeholder='Search for restaurants.....' className="p-2 w-[80%] sm:w-[80%] lg:w-[80%] bg-slate-100 placeholder:font-bold rounded-s-lg" value={searchText} onChange={(e) => {
            setSearchText(e.target.value)
          }} />
          <button className="p-2 bg-black text-white w-[20%] sm:w-[20%] lg:w-[20%] font-bold" onClick={handleSearch}>Search</button>
        </div>

        <div className="mx-4">
          <button className={activeFilter ? "bg-slate-200 border border-black sm:text-sm p-1 px-2 rounded-2xl lg:font-semibold" : "bg-white border border-black sm:text-sm p-1 px-2 rounded-2xl lg:font-semibold"} onClick={handleRatingFilter}>Ratings 4.0+ {activeFilter && <>&#x2716;</>}</button>
        </div>

      </div>

      <div className="mt-10">
        <h3 className="font-bold text-xl">{title}</h3>
      </div>

      <div className='flex flex-wrap items-center justify-center sm:justify-between'>
        {
          filterList?.map(restaurant => {

            return (

              // by clicking this link navigate to particular restaurant menu
              <Link to={'/restaurants/' + restaurant.info.id} key={restaurant.info.id} >
                {
                  restaurant?.info?.veg ? <RestaurantCardPromoted resData={restaurant} />
                    :
                    <RestaurantCard resData={restaurant} />}
              </Link>
            )
          })
        }
      </div>

    </div>
  )
}

export default Body;