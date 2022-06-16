import { render, screen } from "@testing-library/react";
import { Home } from "./Home";
import axios from "axios";
import userEvent from '@testing-library/user-event';


describe("Home", () => {
    it("allows user to add a new friendpot successfully", () => {
        const newFriendName = 'friend name'
        const fakeAddFriendResponse = { id: 'addedFriendId', name: newFriendName }
        jest.spyOn(axios, 'post').mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve(fakeAddFriendResponse)
            })
        })

        render(<Home />);

        userEvent.click(screen.getByText(/new/i));

        userEvent.type(screen.getByLabelText(/name/i), newFriendName);

        userEvent.click(screen.getByText(/add/i));

        
    });
});
