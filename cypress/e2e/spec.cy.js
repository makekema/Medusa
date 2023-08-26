describe('The home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.contains('Join');
  });

  it('should focus on input on load', () => {
    cy.focused().should('have.class', 'SelectorInput');
  });
});

describe('Input form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const typedText = 'Fiddle Faddle';
  it('accepts input', () => {
    cy.get('.SelectorInput').type(typedText).should('have.value', typedText);
  });
});

describe('Create new chat box', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const newChat = 'Poodles';
  it('Creates a new chat box on submit', () => {
    cy.get('input[name="roomInput"]').type(newChat).type('{enter}');
    cy.contains(newChat);
  });
});

describe('Send a message', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  const newChat = 'Poodles';
  const message = 'Ahoy matey!';
  
  it('Sends a message', () => {
    cy.get('input[name="roomInput"]').type(newChat).type('{enter}');
    cy.get('input[name="messageInput"]').type(message).type('{enter}');
    cy.contains(message);
  });
});
