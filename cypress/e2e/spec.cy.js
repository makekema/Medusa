describe('my first spec', () => {
  it('Displays the home page', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Join').click()
  });
});
