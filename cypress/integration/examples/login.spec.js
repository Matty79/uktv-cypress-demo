/// <reference types="Cypress" />

describe("Login", () => {
  context("iPhone 6", () => {
    beforeEach("visit UKTV website using iPhone 6", () => {
      // resolution and baseUrl specified in cypress.json
      cy.visit("/");
      // password details specified in fixtures/uktvuser.json
      cy.fixture("uktvuser").as("user");
    });

    it("displays mobile menu when clicked", () => {
      // dismisses cookie notice
      cy.get('.btn-container > .accept').click();
      // checks web elements are not present
      cy.get("navigation-bar transparent").should("not.be.visible");
      // checks mobile elements are present
      cy.get(".menu-btn")
        .should("be.visible")
        .click();
      cy.contains("Sign in").should("be.visible");
    });

    it("signs user in", () => {
      cy.get(".menu-btn").click();
      cy.contains("Sign in").click();
      cy.get("@user").then(user => {
        cy.get("#email").type(user.username);
        cy.get("#password").type(user.password);
      });
      cy.get("#sign-in-btn").click();
    });
  });
});
