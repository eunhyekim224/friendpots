import { v4 as uuidv4 } from "uuid";
import chaiColors from "chai-colors";
chai.use(chaiColors);

describe("FriendPot", () => {
    it("can be watered back to health", () => {
        // Given a user and a friendpot that is in UNHEALTHY state
        const testUserId = `${uuidv4()}@friendpots.com`;
        const newFriend = {
            name: "Jamster",
            careLevel: "low",
        };

        // When the user logs in, visits the site and creates the friendpot
        cy.visit("/");

        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        cy.get("#add-friend-button").click();
        cy.get("#name")
            .type(newFriend.name)
            .should("have.value", newFriend.name);

        cy.get("#care-level-button-low").click();
        cy.get("#add-button").click();

        cy.contains(newFriend.name);
        cy.get("#status-snackbar").contains("Success");

        // Then the friend pot should be in an unhealthy state
        const newFriendPot = cy.get("div").contains(newFriend.name);
        newFriendPot.should("contain", "🥀");

        // Close success snackbar
        cy.get(".css-1e0d89p-MuiButtonBase-root-MuiIconButton-root").click();

        // When the user clicks on the button to water the friendpot
        cy.get("#water-button").first().click();

        cy.wait(500);

        // Then the friend pot should be re-set to healthy
        const wateredFriendPot = cy.get("div").contains(newFriend.name);
        wateredFriendPot.should("contain", "🪴");
    });
});
