describe('Send and receive messages over the chat', function() {
  it('Types messages in the input and see the message appear in the chat protocol', function() {
    //be sure the viewport is big enough to show all the friends
    
    cy.viewport(1900, 1700)
    cy.visit('localhost:3000/')

    //login with cypress
    cy.get('#email')
    .wait(2000)
    .type('husseinfarhat1@hotmail.com', { force: true },{ delay: 2000 })
    .wait(2000)
    .get('#password')
    .wait(2000)
    .type('12345678', { force:true},{ delay: 2000 })
    .wait(1000)
    .get('.login-button')
    .click()
    
    //testing the chat 
    cy.get('#multiline-flexible')
      .type('Hi There Who is working', {force:true},{ delay: 2000 })
      .wait(1000)
      .should('have.value', 'Hi There Who is working')
      //.type('{enter}', {force: true})
      .get('#emoji')
      .click()
      .wait(1000)
      .get('.emoji')
      //.should('have.attr', 'tabindex')
      .eq(110)
      .click({force: true})
      .get('#multiline-flexible')
      .wait(1000)
      .type('{enter}', {force: true})

      cy.get('#multiline-flexible')
      .type('We are proud of our project maybe is it not perfect but is a lot of work', {force:true},{ delay: 2000 })
      .wait(1000)
      .should('have.value', 'We are proud of our project maybe is it not perfect but is a lot of work')
      //.type('{enter}', {force: true})
      .get('#emoji')
      .click()
      .wait(2000)
      .get('.emoji')
      //.should('have.attr', 'tabindex')
      .eq(112)
      .click({force: true})
      .get('#multiline-flexible')
      .wait(2000)
      .type('{enter}', {force: true})

      cy.get('#cypress-friend-search-button')
      .click()  
      .wait(2000)
      .get('#searchContact')
      .wait(2000)
      .type('J')
      .should('have.value', 'J')
      .wait(2000)
      cy.get('#friend-list li').contains('J')
      .click({force: true})
      .wait(2000)

      cy.get('#cypress-vedio')
      .click({force: true})
      .wait(4000)

      cy.get('#cypress-settings')
      .click({force:true})


      cy.get('#cypress-add-freind')
      .wait(2000)
      .click({force: true})

      cy.get('#cypress-add-new')
      .type('jose', {force: true},{delay:2000})
      .wait(2000)
      .get('#cypress-ser-new-freind')
      .click({force: true})
      .wait(2000)

      cy.get('#close-cypress')
      .click({force: true})
      .wait(2000)

      cy.visit('localhost:3000/auth')
      //logout app
      .wait(2000)
      .get('#cypress-logout')
      .click({force: true})
      /*.find('')
      .click('center', {force: true})
      .should('have.value', ':smiley:')
      .click({force: true})*/
      //.should('have.value', 'Tester')
      //.type('{enter}', { force: true })
  }
  )}
)

