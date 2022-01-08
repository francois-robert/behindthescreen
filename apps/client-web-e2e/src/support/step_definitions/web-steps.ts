import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";


const login = (user) => {
    cy.visit('/');
    cy.get(`[data-cy=login-button]`).click();

    cy.database("find", "users", {username:user}).then((user) => {
        cy.get(`[data-cy=email-input]`).type(user.email);
        cy.get(`[data-cy=password-input]`).type("strongpwd");
        cy.get(`[data-cy=signin-button]`).click();
    })
}

/*
 * Given
 */

Given(`I am on the homepage`, () => {
    cy.visit('/');
})

Given(`I am on the {string} page`, (page) => {
    cy.visit(page);
})


Given(`I am logged as {string}`, (user) => {
    login(user)
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