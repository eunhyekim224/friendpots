import { render, screen } from "@testing-library/react";
import { FriendPot } from "./FriendPot";

describe("Home", () => {
    const name = "test name";

    it("should render correctly", () => {
        const tree = render(<FriendPot name={name} />);
        expect(tree).toMatchSnapshot();
    });

    it("should display the name correctly", () => {
        const { getByRole } = render(<FriendPot name={name} />);

        expect(getByRole('friend-name')).toHaveTextContent(name);
    })
});
