import { mount } from '@cypress/react';
import InlineMenu from './InlineMenu';
import { menuLinks } from './menuLinks';
import { BrowserRouter } from 'react-router-dom';

it('should contains links', () => {
  mount(<BrowserRouter>
            <InlineMenu />
        </BrowserRouter>);
  menuLinks.forEach((page) => {
      cy.get('a').contains(page.name);
  })
});
