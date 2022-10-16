describe("Home", () => {
    it("shows all my friends", () => {
        cy.visit("/");

        //Given there's a user and the user has a friend
        const testUserId = "test@friendpots.com";
        const newFriend = {
            name: "Jamiel",
        };

        //When the user lands on the homepage, enters email, and add a friend, and log out, and log back in

        //1. Log in
        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        //2. Successfully adds friend
        cy.get("#add-friend-button").click();
        cy.get("#name")
            .type(newFriend.name)
            .should("have.value", newFriend.name);
        cy.get("#add-button").click();
        cy.contains(newFriend.name);
        cy.get("#status-snackbar").contains("Success");

        //3. Log out
        cy.get("#logout-button").click();

        //4. Make sure there's no friendpot on the page
        cy.get("#friendpot").should('not.exist');

        //5. Log back in
        cy.get("#login-id").type(testUserId);
        cy.get("#login-button").click();

        //Then the user should see all their friends on the homepage

        cy.get("#friends-container");
        cy.get("#friendpot");

    });
});
