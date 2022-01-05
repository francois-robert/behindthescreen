import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

/*
 * Given
 */

Given(`I am on the homepage`, () => {
    cy.visit('/');
})

Given(`I am on the {string} page`, (page) => {
    cy.visit(page);
})

/*
 * When
 */
When(`I click on the {string} button`, (button) => {
    cy.get(`[data-cy=${button}-button]`).click();
})

When(`I visit the {string} page`, (page) => {
    cy.visit(page);
})

When(`I fill {string} with {string}`, (input, value) => {
    cy.get(`[data-cy=${input}-input]`).type(value)
})

/*
 * Then
 */

Then(`I should see behindthescreen's logo`, () => {
    cy.get('[data-cy=svglogo]').should('be.visible');
})

Then(`I should see {string}`, value => {
    cy.get(`[data-cy=${value}]`).should('be.visible');
})

// A refactor
Then(`I should see the {string} form`, (form) => {
    cy.get(`[data-cy=${form}-form]`).should('be.visible');
})

Then(`I should not see the {string} form`, (form) => {
    cy.get(`[data-cy=${form}-form]`).should('not.be.visible');
})

Then(`I should see the account menu`, () => {
    cy.get(`[data-cy=account-menu]`).should('be.visible');
})


Then(`I should not see the {string} button`, (button) => {
    cy.get(`[data-cy=${button}-button]`).should('not.be.visible');
})

Then(`I should be on the {string} page`, (page) => {
    cy.location().should((loc) => {
        expect(loc.pathname).to.eq(page)
    })
})