import { v4 as uuidv4 } from "uuid";

describe("Home", () => {
    it("adding a new friendpot displays the name of the new friendpot", () => {
        const testUserId = `${uuidv4()}@friendpots.com`;
        const newFriend = {
            name: "Jam",
            hardiness: "8",
        };

        cy.visit("/");

        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        cy.get("#add-friend-button").click();

        cy.get("#name")
            .type(newFriend.name)
            .should("have.value", newFriend.name);

        const hardinessLevelElement = `span[data-index=${
            newFriend.hardiness
        }]`;
        cy.get(hardinessLevelElement).click();

        cy.get("#add-button").click();

        cy.get("#status-snackbar").contains("Success");

        cy.get("div")
            .contains(newFriend.name)
            .should("have.css", "color")
            .and("be.colored", "green");
    });
});
