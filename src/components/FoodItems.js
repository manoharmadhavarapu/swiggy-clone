import { useState } from "react";
import { Link } from "react-router-dom";

const FoodItems = ({ dishes }) => {

    return (

        <>
            {
                dishes?.map(dish => {
                    const EntityId = dish.entityId;
                    const entityIdLen = EntityId.split("").length;
                    // finding id for specific dishes restaurant.
                    if (entityIdLen < 7) {
                        return (
                            <div key={dish.id} className="w-[90px] sm:w-[80px] md:w-[100px] lg:w-[110px]">
                                <Link to={`dish/${EntityId}`}>
                                    <img className="w-full min-w-[90px] sm:min-w-[80px] md:min-w-[100px] lg:min-w-[110px] cursor-pointer " src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/` + dish.imageId} alt="dish-img" />
                                </Link>
                            </div>
                        )
                    }
                    else {
                        const entityIdArr = EntityId.split("=");
                        const entityIdNewArr = entityIdArr[1].split("&");
                        return (
                            <div key={dish.id} className="w-[90px] sm:w-[80px] md:w-[100px] lg:w-[110px]">
                                <Link to={`dish/${entityIdNewArr[0]}`}>
                                    <img className="w-full min-w-[90px] sm:min-w-[80px] md:min-w-[100px] lg:min-w-[110px] cursor-pointer " src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/` + dish.imageId} alt="dish-img" />
                                </Link>
                            </div>
                        )
                    }

                })
            }
        </>

    )
}

export default FoodItems;