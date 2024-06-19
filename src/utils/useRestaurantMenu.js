import { useState, useEffect } from "react";
import { SWIGGY_RESTAURANT_MENU_API } from "./constants";

// CUSTOM HOOK
const useRestaurantMenu = (resId,setApiError) => {

    const [resInfo, setResInfo] = useState(null);

    const fetchMenuData = async () => {
        try {
            const data = await fetch(`${SWIGGY_RESTAURANT_MENU_API}${resId}&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER`);
            const json = await data.json();
            console.log(json);
            setResInfo(json);
            setApiError(false)
        } catch (error) {
            setApiError(true);
        }
    
    }
    useEffect(() => {
        fetchMenuData();
    }, [])

    return resInfo;
}

export default useRestaurantMenu;