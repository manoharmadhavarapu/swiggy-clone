import { render,screen } from "@testing-library/react";
import Contact from '../Contact';
import '@testing-library/jest-dom';

test("Should load ContactUs component", ()=>{

    // render the component in jsdom
    render(<Contact/>)

    // Querying
    const heading = screen.getByRole('heading');

    // Assertions
    expect(heading).toBeInTheDocument();

})