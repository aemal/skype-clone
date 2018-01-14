describe('My First Test', function() {
  it('Click on Nav and scroll', function() {

    cy.visit('localhost:3000')
    cy.get('#cypress-friend-search-button').click()          // Click on button
    
    cy.get('#searchContact')
      .type('Ervin')
      .should('have.value', 'Ervin')
    
    cy.get('#custom-color-input')
      .type('Tester', { force: true })
      .should('have.value', 'Tester')

    //cy.get('#friend-list').should('have.text', 'Leanne Graham')
      //.should('have.value', 'Ervin')

  })
})
