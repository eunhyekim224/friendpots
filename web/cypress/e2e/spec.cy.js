describe('My First Test', () => {
  it('clicking "type" navigates to a new URL', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('type').click();

    cy.url().should('include', '/commands/actions');

    cy.get('#email1')
        .type('eunhye@test.com')
        .should('have.value', 'eunhye@test.com')
  })
})