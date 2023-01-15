import { v4 as uuidv4 } from "uuid";

describe("FriendPot", () => {
    it("can be removed", () => {
        const testUserId = `${uuidv4()}@friendpots.com`;
        const newFriend = {
            name: "Lucas",
            hardiness: "9",
        };

        cy.visit("/");

        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        cy.get("#add-friend-button").click();

        cy.get("#name")
            .type(newFriend.name)
            .should("have.value", newFriend.name);

        const hardinessLevelElement = `span[data-index=${newFriend.hardiness}]`;
        cy.get(hardinessLevelElement).click();

        cy.get("#add-button").click();

        cy.get("div")
            .contains(newFriend.name)

        cy.get("#delete-button").click();

        cy.get("div").contains(newFriend.name).should('not.exist');
    });
});
