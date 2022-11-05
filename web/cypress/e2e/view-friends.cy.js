import { v4 as uuidv4 } from "uuid";

describe("Home", () => {
    it("shows all my friends", () => {
        //Given there's a user and the user has a friend
        const testUserId = `${uuidv4()}@friendpots.com`;
        const friend1 = {
            name: "Jamiel",
            userId: testUserId,
        };

        const friend2 = {
            name: "Ely",
            userId: testUserId,
        };

        //When the user lands on the homepage, enters email, and add a friend, and log out, and log back in

        cy.visit("/");

        //1. Log in
        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        //2. Successfully adds friends
        cy.get("#add-friend-button").click();
        cy.get("#name").type(friend1.name).should("have.value", friend1.name);
        cy.get("#add-button").click();
        cy.contains(friend1.name);
        cy.get("#status-snackbar").contains("Success");

        cy.get("#add-friend-button").click();
        cy.get("#name").type(friend2.name).should("have.value", friend2.name);
        cy.get("#add-button").click();
        cy.contains(friend2.name);
        cy.get("#status-snackbar").contains("Success");

        //3. Log out
        cy.get("#logout-button").click();

        //4. Make sure there's no friendpot on the page
        cy.get("#friendpot").should("not.exist");

        //5. Log back in
        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        //Then the user should see all their friends on the homepage

        cy.contains(friend1.name);
        cy.contains(friend2.name);
    });
});
