// import Table from '../src/component/Table'
import Table from "../../src/component/Table";
import App from "../../src/App";
import * as React from 'react';

describe('Testing funtionality', () => {
  it('playground', () => {
    // cy.mount()
    cy.mount(<App/>)
    cy.mount(<Table/>)
    cy.contains(/NBA TEAMS/i).should('be.visible');
    cy.contains(/Export to csv/i).should('be.visible');
  })
});