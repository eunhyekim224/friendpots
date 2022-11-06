import { v4 as uuidv4 } from "uuid";
import chaiColors from "chai-colors";
chai.use(chaiColors);

describe("Friend", () => {
    it("can have different states", () => {
        // Given a user and a friendpot
        const testUserId = `${uuidv4()}@friendpots.com`;
        const newFriend = {
            name: "Jamster",
            hardiness: 1,
        };

        // When the user logs in, visits the site and creates the friendpot
        cy.clock();
        cy.visit("/");

        //1. Log in
        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        //2. Successfully adds friendpot
        cy.get("#add-friend-button").click();

        cy.get("#name")
            .type(newFriend.name)
            .should("have.value", newFriend.name);

        const hardinessLevelElement = `span[data-index=${
            newFriend.hardiness
        }]`;
        cy.get(hardinessLevelElement).click();

        cy.get("#add-button").click();
        cy.contains(newFriend.name);

        cy.get("#status-snackbar").contains("Success");

        // It should be in a healthy state

        const newFriendPot = cy.get("div").contains(newFriend.name);

        newFriendPot
            .should("have.css", "background-color")
            .and("be.colored", "green");

        // When the number of days that they can go without water has passed

        cy.tick("86400000");

        // It should be in an unhealthy state

        newFriendPot
            .should("have.css", "background-color")
            .and("be.colored", "red");

        // When it is watered
        newFriendPot.get("#water-button").click();

        // It should be in a healthy state again
        newFriendPot
            .should("have.css", "background-color")
            .and("be.colored", "green");

        // restore clock
        cy.clock().invoke("restore");
    });
});
