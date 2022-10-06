describe("Home", () => {
    it("shows all my friends", () => {
        cy.visit("/");

        const testUserId = "test@friendpots.com";

        // Log user in with their email
        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        cy.get("friends-container");

        cy.get("friendpot");

        // cy.get("#add-friend-button").click();

        // cy.get("#name").type("New Friend").should("have.value", "New Friend");

        // cy.get("#add-button").click();

        // cy.contains("New Friend");

        // cy.get("#status-snackbar").contains("Success");
    });
});
