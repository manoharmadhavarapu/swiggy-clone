import { useState } from "react";
import ItemsList from "./ItemsList";


const RestaurantCategory = ({ data, searchText, showIndex, handleClick, resName }) => {

    return (
        <div className={searchText.length===0 && 'shadow-lg p-3 my-2 rounded-lg'}>
            {/* Accordian Header --> Items Categories* */}
            {
                searchText.length===0 && 
                <div className="flex justify-between items-center cursor-pointer" onClick={handleClick}>
                    <h2 className="text-lg font-bold">{data?.title} ({data?.itemCards?.length})</h2>
                    <h2 className="text-center text-2xl font-bold " >{showIndex?<i className="fa-solid fa-chevron-up text-base"></i>:<i className="fa-solid fa-chevron-down text-base"></i>}</h2>
                </div>
            }

            {/* Accordian Body --> Resataurant Items */}
            {
                searchText.length === 0 ?
                showIndex && <ItemsList items={data?.itemCards} searchText={searchText} resName={resName}/> 
                : 
                <ItemsList items={data?.itemCards} searchText={searchText} resName={resName}/>
            }
        </div>
    )
}

export const withRestaurantCategoryList = (RestaurantCategory) => {
    return (props)=>{
        const [showIndex, setShowIndex] = useState(0)

        const handleClick = (i)=>{
            if(showIndex===i){
                return setShowIndex(null)
            }
            setShowIndex(i);
        }

        return(
            <div className={props.searchText.length===0 && 'shadow-lg p-3 my-2 rounded-lg'}>
                {/* Accordian Header --> Items Categories* */}
                {
                    props.searchText.length===0 && 
                    <div className="flex items-center cursor-pointer">
                        <h2 className="text-lg font-bold text-green-700">{props?.data?.title} ({props?.data?.categories?.length})</h2>
                    </div>
                }

                {
                    props?.data?.categories.map((category,index)=>{
                        return(
                            <RestaurantCategory 
                                {...props}
                                key={category?.title} 
                                data={category} 
                                showIndex={showIndex===index?true:false}
                                handleClick={()=>handleClick(index)}
                            />
                        )
                    })
                }

            </div>
        )
    }
}

export default RestaurantCategory;