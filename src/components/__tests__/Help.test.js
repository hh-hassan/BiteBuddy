import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Help from "../Help";

describe("Contact Us Page Test Case", () => {
    
    test("Should load Help component", () => {
    
        render(<Help />);

        const heading = screen.getByRole("heading");

        expect(heading).toBeInTheDocument();
    });

    test("Should load Help component", () => {
    
        render(<Help />);

        const heading = screen.getByRole("heading");

        expect(heading).toBeInTheDocument();
    });

    it("Should load Help component", () => {
    
        render(<Help />);

        const heading = screen.getByRole("heading");

        expect(heading).toBeInTheDocument();
    });
});