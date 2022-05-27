/// <reference types="Cypress" />
// https://docs.cypress.io/api/table-of-contents

describe("Blog", () => {
  beforeEach(() => {
    cy.login()
  })

  afterEach(() => {
    cy.logout()
  })

  it("should create new article", () => {
    cy.visit('/articles/new');
    cy.get('[data-cy=title]').type('Test title');
    cy.get('[data-cy=slug]').type('test-article');
    cy.get('[data-cy=body]').type('Test article body');
    cy.get('[data-cy=submit]').click();
    cy.contains('Test title').click();
    cy.get('[data-cy=delete]').click();
  });

  it("should edit article", () => {
    cy.visit('/articles/new');
    cy.get('[data-cy=title]').type('Test title');
    cy.get('[data-cy=slug]').type('test-article');
    cy.get('[data-cy=body]').type('Test article body');
    cy.get('[data-cy=submit]').click();
    cy.contains('Test title').click();
    cy.get('[data-cy=edit]').click();
    cy.get('[data-cy=title]').clear().type('Test title edited');
    //edit body too
    cy.get('[data-cy=body]').clear().type('Test article body edited');
    cy.get('[data-cy=submit]').click();
    cy.contains('Test title edited');
    cy.contains('Test article body edited');
    cy.get('[data-cy=delete]').click();
  });

  it("should delete article", () => {
    cy.visit('/articles/new');
    cy.get('[data-cy=title]').type('Test title');
    cy.get('[data-cy=slug]').type('test-article');
    cy.get('[data-cy=body]').type('Test article body');
    cy.get('[data-cy=submit]').click();
    cy.contains('Test title').click();
    cy.get('[data-cy=delete]').click();
    cy.contains('Test title').should('not.exist');
  })
});
