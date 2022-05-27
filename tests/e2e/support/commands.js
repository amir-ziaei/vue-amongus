Cypress.Commands.add('login', (username = 'test@testing.test', password = 'test12') => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type(username)
    cy.get('[data-cy=password]').type(password)
    cy.get('[data-cy=submit]').click();
    cy.url().should('not.contain', 'login')
})

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy=logout]').click();
  cy.contains('Log In');
})