/// <reference types="Cypress" />

describe("Search", () => {
  context("iPhone 6 resolution", () => {
    beforeEach("visit UKTV website using iPhone 6", () => {
      // resolution and baseUrl specified in cypress.json
      cy.visit("/");
      // search query specified in fixtures/uktvsearch.json
      cy.fixture("uktvsearch").as("search");
      // dismisses cookie notice
      cy.get('.btn-container > .accept').click();
    });

    it("displays relevant search result", () => {
      cy.get(".nav-buttons")
        .should("be.visible")
        .click();
      cy.get("@search").then(search => {
        cy.get(".search-input")
          .should("be.visible")
          .type(search.search1);
        cy.get(".results-list > :nth-child(1)").click();
        // need to match search term somehow taking into account capitalisation variation
        cy.get(".vod-episode__title".toUpperCase).should("eq", (search.search1.toUpperCase));
      });
    });
  });
});
