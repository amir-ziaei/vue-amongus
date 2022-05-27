/// <reference types="Cypress" />
// https://docs.cypress.io/api/table-of-contents

const APP_URL = "http://localhost:8080";


describe("Register Flow", () => {
  it("should register", () => {
    cy.visit(`${APP_URL}/register`);
  });
});