import { fireEvent, render, screen } from "@testing-library/react"
import Body from "../Body";
import MOCK_RES_DATA from '../mocks/ResListMockData.json';
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json : ()=>{
            return Promise.resolve(MOCK_RES_DATA)
        }
    })
})


test("Should render the Restaurant list for searched data", async ()=>{

    await act(async ()=> {
        render(
            <BrowserRouter>
                <Body/>
            </BrowserRouter>
        )
    })

    const cardsBeforeSearch = screen.getAllByTestId('resCard');
    expect(cardsBeforeSearch.length).toBe(20)

    const searchBox = screen.getByTestId('searchInput');
    fireEvent.change(searchBox,{target:{value:'house'}})

    const searchButton = screen.getByRole('button',{name:'Search'});
    fireEvent.click(searchButton);

    const cardsAfterSearch = screen.getAllByTestId('resCard');
    expect(cardsAfterSearch.length).toBe(2);
    
})


test('should give top rated restaurants after click the button',async ()=>{

    await act(async ()=> {
        render(
            <BrowserRouter>
                <Body/>
            </BrowserRouter>
        )
    })

    const cardsBeforeClicked = screen.getAllByTestId('resCard');
    expect(cardsBeforeClicked.length).toBe(20)

    const topRatedButton = screen.getByRole('button',{name:'Ratings 4.0+'})
    fireEvent.click(topRatedButton)

    const cardsAfterClicked = screen.getAllByTestId('resCard');
    expect(cardsAfterClicked.length).toBe(18)

})