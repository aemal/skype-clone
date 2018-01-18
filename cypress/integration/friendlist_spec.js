describe('Search for a friend in the friendlist', function() {
  it('Types a name in the search field and see just the corrosponding friend', function() {
    //be sure the viewport is big enough to show all the friends
    cy.viewport(1600, 800)

    cy.visit('localhost:3000/main')
    cy.get('#cypress-friend-search-button').click()          // Click on button
    
    //TODO Create Frieds-seeds with Username
    cy.get('#friend-list li').contains('Glenna Reichert')
    cy.get('#friend-list li').contains('Ervin Howell')
    cy.get('#friend-list li').contains('Clementine Bauch')

    //type beginning of one name in the search bar
    cy.get('#searchContact')
      .type('Er')
      .should('have.value', 'Er')

    cy.get('#friend-list li').its('length').should('eq', 2)
    cy.get('#friend-list li').contains('Glenna Reichert')
    cy.get('#friend-list li').contains('Ervin Howell')
    cy.get('#friend-list li').should('not.contain', 'Clementine Bauch')

    //Type the rest of the name
    cy.get('#searchContact')
      .type('vin')
      .should('have.value', 'Ervin')
    cy.get('#friend-list li').its('length').should('eq', 1)
    cy.get('#friend-list li').contains('Ervin Howell')
    cy.get('#friend-list li').should('not.contain', 'Glenna Reichert')
    cy.get('#friend-list li').should('not.contain', 'Clementine Bauch')

    // press backspace and see one more result 
    cy.get('#searchContact')
      .type('{backspace}{backspace}{backspace}')

    cy.get('#friend-list li').its('length').should('eq', 2)

    cy.get('#friend-list li').contains('Glenna Reichert')
    cy.get('#friend-list li').contains('Ervin Howell')
    cy.get('#friend-list li').should('not.contain', 'Clementine Bauch')

    cy.get('#searchContact')
      .type('{backspace}{backspace}{backspace}')

    cy.get('#friend-list li').contains('Ervin Howell')
    cy.get('#friend-list li').contains('Glenna Reichert')
    cy.get('#friend-list li').contains('Clementine Bauch')
    
    //type something stupid and check that no one is shown
    cy.get('#searchContact')
      .type('Prinzessin')

    cy.get('#friend-list li').should('not.contain', 'Ervin Howell')
      .should('not.contain', 'Glenna Reichert')
      .should('not.contain', 'Clementine Bauch')

  })
})
