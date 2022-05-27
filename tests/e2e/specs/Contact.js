/// <reference types="Cypress" />
// https://docs.cypress.io/api/table-of-contents

describe("Contact", () => {
    beforeEach(() => {
        cy.visit("/contact")
    })

    it("should validate the name", () => {
        cy.get("[data-cy=name]").type("t").clear()
        cy.contains("Name is required")
        cy.get("[data-cy=name]").type("t")
        cy.contains("Name must have at least 5 letters.");
        cy.get("[data-cy=name]").type("john doe")
        cy.contains("Name must have at least 5 letters.").should("not.exist")
    })

    it("should validate the email", () => {
        cy.get("[data-cy=email]").type("t").clear()
        cy.contains("Email is required")
        cy.get("[data-cy=email]").type("t")
        cy.contains("Email is invalid")
        cy.get("[data-cy=email]").type("john@doe")
        cy.contains("Email is invalid")
    })

    it("should clear the form", () => {
        cy.get("[data-cy=name]").type("t")
        cy.get("[data-cy=email]").type("t")
        cy.get("[data-cy=message]").type("t")
        cy.get("[data-cy=reset]").click()
        cy.get("[data-cy=name]").should("not.have.value")
        cy.get("[data-cy=email]").should("not.have.value")
        cy.get("[data-cy=message]").should("not.have.value")
    });
});
  