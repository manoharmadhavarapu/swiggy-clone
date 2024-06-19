import { CDN_URL } from "../utils/constants";

// RestaurantCard --> A card which is visible at home page with restaurant details.
const RestaurantCard = (props) => {

    const {resData} = props;
    const {info} = resData;
    const {name, avgRating, cuisines, sla, cloudinaryImageId,areaName} = info;
  
    return (
      <div data-testid='resCard' className=' max-w-[300px] min-w-[270px] sm:w-[270px] p-2 my-3 rounded-lg hover:scale-90 mx-1'>
        <img className='w-[100%] object-cover h-[150px] rounded-2xl' src={CDN_URL+cloudinaryImageId} alt='card-img'></img>
        <h3 className="my-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis">{name}</h3>
        <h3 className='text-green-800 font-medium'>&#9733;{avgRating} - {sla.deliveryTime} mins</h3>
        <p className="text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">{cuisines.join(', ')}</p>
        <p className="text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">{areaName}</p>
      </div>
    )
  }


  /* 
    Higher Order Component --> its just a normal function takes COMPONENT as parameter and returns the enchanced COMPONENT i.e returnes
    component with some extra functianlity without changing our original component.
  */

  export const withPromotedLabel = (RestaurantCard)=>{
    return (props)=>{
      return(
        <div>
          <label className="bg-green-600 text-white rounded-md absolute p-1">Veg Restaurant</label>
          <RestaurantCard {...props}/>
        </div>
      )
    }
  }


  export default RestaurantCard;