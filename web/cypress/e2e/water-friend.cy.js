import { v4 as uuidv4 } from "uuid";
import chaiColors from "chai-colors";
chai.use(chaiColors);

describe("Friend", () => {
    it("can have different states", () => {

        // Given a user and a friendpot that is in UNHEALTHY state
        // When the user logs in, visits the site and views their friendpot
        // It should be red
        // When the user waters the friendpot
        // It should be green

        // // Given a user and a friendpot
        // const testUserId = `${uuidv4()}@friendpots.com`;
        // const newFriend = {
        //     name: "Jamster",
        //     hardiness: 1,
        // };

        // // When the user logs in, visits the site and creates the friendpot
        // cy.visit("/");

        // //1. Log in
        // cy.get("#login-id").type(testUserId);
        // cy.get("#login-button").click();

        // //2. Successfully adds friendpot
        // cy.get("#add-friend-button").click();

        // cy.get("#name")
        //     .type(newFriend.name)
        //     .should("have.value", newFriend.name);

        // const hardinessLevelElement = `span[data-index=${
        //     newFriend.hardiness
        // }]`;
        // cy.get(hardinessLevelElement).click();

        // cy.get("#add-button").click();
        // cy.contains(newFriend.name);

        // cy.get("#status-snackbar").contains("Success");

        // // It should be in a healthy state

        // const newFriendPot = cy.get("div").contains(newFriend.name);

        // newFriendPot
        //     .should("have.css", "color")
        //     .and("be.colored", "green");
    });
});
