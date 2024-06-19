import { render, screen } from "@testing-library/react"
import RestaurantCard, { withPromotedLabel } from '../RestaurantCard';
import MOCK_DATA from '../mocks/ResCardMockData.json';
import '@testing-library/jest-dom';

test('should load RestaurantCard component',()=>{
    
    render(
        <RestaurantCard resData={MOCK_DATA}/>
    )
    
    const restaurantName = screen.getByText("McDonald's")
    expect(restaurantName).toBeInTheDocument();
})

test('should load RestaurantCard component with veg restaurants',()=>{
    
    const RestaurantCardLabel = withPromotedLabel(RestaurantCard)
    render(
        <RestaurantCardLabel resData={MOCK_DATA}/>
    )
    
    const resCardLabel = screen.getByText("Veg Restaurant")
    expect(resCardLabel).toBeInTheDocument();

    const areaName = screen.getByText("Guntur")
    expect(areaName).toBeInTheDocument();
})