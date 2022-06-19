import { render, screen } from "@testing-library/react";
import { Home } from "./Home";
import axios from "axios";
import userEvent from "@testing-library/user-event";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Home", () => {
    it("allows the user to add a new friendpot successfully", async () => {
        const newFriendName = "friend name";
        const fakeFriend = {
            id: "addedFriendId",
            name: newFriendName,
        };

        mockedAxios.post.mockResolvedValue({ data: fakeFriend });

        mockedAxios.get.mockResolvedValue({ data: fakeFriend });

        render(<Home />);

        userEvent.click(screen.getByText(/new/i));

        userEvent.type(screen.getByLabelText(/name/i), newFriendName);

        userEvent.click(screen.getByText("Add"));

        const alert = await screen.findByRole("alert");

        expect(alert).toHaveTextContent(/success/i);
        expect(screen.getByText(newFriendName)).toBeDefined();
    });
});
