describe('Send and receive messages over the chat', function() {
  it('Types messages in the input and see the message appear in the chat protocol', function() {
    //be sure the viewport is big enough to show all the friends
    cy.viewport(1600, 2700)
    cy.visit('localhost:3000/')



    /*Cypress.Commands.add('login', (email, options = {}) => {
      Cypress.log({
        name: 'login'
      })

      const options = {
        method: 'POST',
        url: 'http://localhost:3000',
        qs: {
          redirectTo: 'http://localhost:3001'
        },
        form:true,
        body: {
          email: 'husseinfarhat1@hotmail.com',
          password: '12345678',
        }
      }
      cy.request(options)
    })
    cy.login*/
    //login with cypress
    cy.get('#email')
    .wait(1000)
    .type('husseinfarhat1@hotmail.com', { force: true },{ delay: 2000 })
    .wait(1000)
    .get('#password')
    .wait(1000)
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

      cy.get('#cypress-friend-search-button')
      .click()  
      .wait(1000)
      .get('#searchContact')
      .wait(1000)
      .type('Jo')
      .should('have.value', 'Jo')
      .wait(1000)

      cy.get('#cypress-add-freind')
      .wait(1000)
      .click({force: true})

      cy.get('#cypress-add-new')
      .type('jose', {force: true},{delay:2000})
      .wait(1000)
      .get('#cypress-ser-new-freind')
      .click()
      /*.find('')
      .click('center', {force: true})
      .should('have.value', ':smiley:')
      .click({force: true})*/
      //.should('have.value', 'Tester')
      //.type('{enter}', { force: true })
  }
  )}
)

