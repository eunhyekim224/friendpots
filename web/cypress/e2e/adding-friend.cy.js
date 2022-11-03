import { v4 as uuidv4 } from "uuid";

describe("Home", () => {
    it("adding a new friendpot displays the name of the new friendpot", () => {
        cy.visit("/");

        const testUserId = `${uuidv4()}@friendpots.com`;
        const newFriend = {
            name: "Jam",
        };

        // Log user in with their email
        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        cy.get("#add-friend-button").click();

        cy.get("#name")
            .type(newFriend.name)
            .should("have.value", newFriend.name);

        cy.get("#add-button").click();

        cy.get("#status-snackbar").contains("Success");

        cy.contains(newFriend.name);
    });
});
