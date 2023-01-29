import { v4 as uuidv4 } from "uuid";
import chaiColors from "chai-colors";
chai.use(chaiColors);

describe("FriendPot", () => {
    it("can be watered back to health", () => {
        
        // Given a user and a friendpot that is in UNHEALTHY state
        const testUserId = `${uuidv4()}@friendpots.com`;
        const unhealthyFriend = {
            id: "test-new-friend",
            userId: testUserId,
            name: "Tiger",
            careLevel: "low",
            state: "Unhealthy",
        };

        cy.intercept(
            {
                method: "GET",
                url: `friends?userId=${testUserId}`,
            },
            [unhealthyFriend]
        ).as("getFriends");

        cy.intercept(
            {
                method: "POST",
                url: `friends/${unhealthyFriend.id}/water`,
            },
            { ...unhealthyFriend, state: "Healthy" }
        ).as("waterFriend");

        // When the user visits the site and logs in
        cy.visit("/");

        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        // Then the friend pot should be in an unhealthy state
        const friendPot = cy.get("div").contains(unhealthyFriend.name);
        friendPot.should("contain", "🥀");

        // When the user clicks on the button to water the friendpot
        cy.get("#water-button").first().click();

        cy.wait(500);

        // Then the friend pot should be re-set to healthy
        const wateredFriendPot = cy.get("div").contains(unhealthyFriend.name);
        wateredFriendPot.should("contain", "🪴");
    });
});
