import { v4 as uuidv4 } from "uuid";
import chaiColors from "chai-colors";
chai.use(chaiColors);

describe("Friend", () => {
    it("can have different states", () => {
        // Given a user and a friendpot that is in UNHEALTHY state
        const testUserId = `${uuidv4()}@friendpots.com`;
        const newFriend = {
            name: "Jamster",
            hardiness: 0,
        };

        // When the user logs in, visits the site and creates the friendpot
        cy.visit("/");

        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        cy.get("#add-friend-button").click();
        cy.get("#name")
            .type(newFriend.name)
            .should("have.value", newFriend.name);

        const hardinessLevelElement = `span[data-index=${newFriend.hardiness}]`;
        cy.get(hardinessLevelElement).first().click({ force: true });

        cy.get("#add-button").click();

        cy.contains(newFriend.name);
        cy.get("#status-snackbar").contains("Success");

        // Then the friend pot should be in an unhealthy state
        const newFriendPot = cy.get("div").contains(newFriend.name);
        newFriendPot.should("have.css", "color").and("be.colored", "red");

        // When the user clicks on the button to water the friendpot
        cy.get("#water-button").first().click();

        // Then the friend pot should be re-set to healthy
        newFriendPot.should("have.css", "color").and("be.colored", "green");
    });
});
