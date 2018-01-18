describe('Send and receive messages over the chat', function() {
  it('Types messages in the input and see the message appear in the chat protocol', function() {
    //be sure the viewport is big enough to show all the friends
    cy.viewport(1600, 800)
    cy.visit('localhost:3000/main')
    cy.get('#custom-color-input')
      .type('Tester', { force: true })
      .should('have.value', 'Tester')
      .type('{enter}', { force: true })
  }
  )}
)

