import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given(/I am on the homepage/, () => {
    cy.visit('/');
})

Then(/I should see behindthescreen's logo/, () => {
    cy.get('svg[class="SvgLogo"]').should('be.visible');
})