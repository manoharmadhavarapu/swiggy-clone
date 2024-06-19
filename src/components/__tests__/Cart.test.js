import { fireEvent, render, screen } from "@testing-library/react"
import RestaurantMenu from '../RestaurantMenu';
import Header from '../Header';
import Cart from '../Cart';
import MOCK_DATA_RES_MENU from '../mocks/ResMenuMockData.json';
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import appStore from '../../redux/store';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json:()=>{
            return Promise.resolve(MOCK_DATA_RES_MENU)
        }
    })
})


test('should render Restaurant Menu list', async ()=>{
    await act(async ()=>{
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header/>
                    <RestaurantMenu/>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        )
    })

    const specialDosaAccordianHeader = screen.getByText('Special Dosas (26)');
    fireEvent.click(specialDosaAccordianHeader)
    expect(screen.getAllByTestId('itemList').length).toBe(55)

    const dosaAccordianHeader = screen.getByText('Dosas (29)');
    fireEvent.click(dosaAccordianHeader)
    expect(screen.getAllByTestId('itemList').length).toBe(26)

    const addBtn = screen.getAllByRole('button',{name:'ADD'});
    fireEvent.click(addBtn[0]);
    expect(screen.getByTestId('spanTag')).toBeInTheDocument()

    expect(screen.getAllByTestId('cartItem').length).toBe(1)

    fireEvent.click(addBtn[1]);
    fireEvent.click(addBtn[2]);
    expect(screen.getAllByTestId('cartItem').length).toBe(3)

    const clearCart = screen.getByText('Clear Cart');
    fireEvent.click(clearCart)
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();

})