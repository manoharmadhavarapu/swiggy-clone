import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import appStore from '../../redux/store'
import Header from "../Header"
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

test('should render header component with a login button',()=>{

    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    )

    // const loginButton = screen.getByRole('button');
    const loginButton = screen.getByText('Login');

    expect(loginButton).toBeInTheDocument();
})


test('should change Login to Logout button when on click',()=>{

    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    )

    const loginButton = screen.getByRole('button');

    fireEvent.click(loginButton);

    // if we have multiple button then this optional parameter give the exact our matched one.
    const logoutButton = screen.getByRole('button',{name:'Logout'})

    expect(logoutButton).toBeInTheDocument();
})