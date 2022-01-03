import { mount } from '@cypress/react';
import DropdownMenu from './DropdownMenu';
import { menuLinks } from './menuLinks';
import { BrowserRouter } from 'react-router-dom';

it('should contains links', () => {
  mount(<BrowserRouter>
            <DropdownMenu />
        </BrowserRouter>);
  menuLinks.forEach((page) => {
      cy.get('li').contains(page.name);
  })
});

it('should be folded', () => {
    mount(<BrowserRouter>
              <DropdownMenu />
          </BrowserRouter>);
    cy.get('[tabindex="0"] > .MuiMenuItem-root > .MuiTypography-root')
        .should('not.be.visible')
  });

it('should open when I click on the button', () => {
    mount(<BrowserRouter>
              <DropdownMenu />
          </BrowserRouter>);
    cy.get('#button-appbar').click()
    cy.get('[tabindex="0"] > .MuiMenuItem-root > .MuiTypography-root')
        .should('be.visible')
  });