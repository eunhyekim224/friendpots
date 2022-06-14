import { render } from "@testing-library/react";
import { Home } from "./Home";

describe("Home", () => {
    it("should render correctly", () => {
        const tree = render(<Home />);
        expect(tree).toMatchSnapshot();
    });
});
