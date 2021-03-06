describe('Home', () => {
  it('adding a new friendpot displays the name of the new friendpot', () => {
    cy.visit('/');

    cy.get('#add-friend-button').click();

    cy.get('#name')
        .type('New Friend')
        .should('have.value', 'New Friend')

    cy.get('#add-button').click();

    cy.contains('New Friend')

    cy.get('#status-snackbar').contains('Success')
  })
})