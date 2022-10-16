describe("Home", () => {
    it("adding a new friendpot displays the name of the new friendpot", () => {
        cy.visit("/");

        const testUserId = "test@friendpots.com";
        const newFriend = {
            name: "Jam"
        }

        // Log user in with their email
        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        cy.get("#add-friend-button").click();

        cy.get("#name").type(newFriend.name).should("have.value", newFriend.name);

        cy.get("#add-button").click();

        cy.contains(newFriend.name);

        cy.get("#status-snackbar").contains("Success");
    });
});
