describe('Home', () => {
  it('adding a new friendpot displays the name of the new friendpot', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#add-friend-button').click();

    cy.get('#name')
        .type('New Friend')
        .should('have.value', 'New Friend')

    cy.get('.MuiDialogActions-root > :nth-child(2)').click();

    cy.contains('New Friend')
  })
})