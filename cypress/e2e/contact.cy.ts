describe('contact page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/contact')
  });
  it('should visit contact page', () => {
    cy.visit('http://localhost:4200/contact')
  });
  it('should have contact form', () => {
    cy.get('.contact-form').should('exist')
  });
  it('should form button be disabled by default', () => {
    cy.get('.form-button').should('be.disabled')
  });
  it('should form button be enabled when form is valid', () => {
    cy.get('#name').type('test')
    cy.get('#case').select('Other')
    cy.get('#message').type('test')
    cy.get('.form-button').should('be.enabled')
  });
  it('should form button be disabled when form is invalid', () => {
    cy.get('#name').type('test')
    cy.get('#case').select('Other')
    cy.get('.form-button').should('be.disabled')
  });
  it('send form should work', () => {
    cy.get('#name').type('test')
    cy.get('#case').select('Other')
    cy.get('#message').type('test')
    cy.get('.form-button').click()
    cy.get('.success-message').should("contain", "Your message has been sent!")
  });
})
