describe('home page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  });
  it('should visit home page', () => {
    cy.visit('http://localhost:4200/')
  });
  it('should be able to navigate using the navbar', () => {
    cy.get('.nav-link').contains('About').click()
    cy.url().should('include', '/about')
    cy.get('.nav-link').contains('Contact').click()
    cy.url().should('include', '/contact')
    cy.get('.nav-link').contains('Leaderboard').click()
    cy.url().should('include', '/')
  });
  it('should have a summoner card', () => {
    cy.get('.summoner-container').first().should('exist')
  });
  it('should redirect to summoner page', () => {
    cy.get('.summoner-container').first().click()
    cy.url().should('include', '/summoner/')
  });
})

describe('radio widget', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  });
  it('should have radio collapse', () => {
    cy.get('.radio.collapsed').should('exist')
  });
  it('should collapse button work', () => {
    cy.get('.collapse-button').click()
    cy.get('.radio.collapsed').should('not.exist')
    cy.get('.collapse-button').click()
    cy.get('.radio.collapsed').should('exist')
  });
  it('should play button work', () => {
    cy.get('.collapse-button').click()
    cy.get('.play-stop-button').click()
    cy.get('.play-stop-button').should('have.class', 'playing')
    cy.get('.play-stop-button').click()
    cy.get('.play-stop-button').should('not.have.class', 'playing')
  });
  it('should sound slider work', () => {
    cy.get('.collapse-button').click()
    cy.get('.volume-slider').invoke('val', 0.5).trigger('input')
    cy.get('.volume-slider').should('have.value', 0.5)
  });
  it('should before button work', () => {
    cy.get('.collapse-button').click()
    let oldSong = cy.get('.radio-info').invoke('text')
    cy.get('.before-button').click()
    cy.get('.radio-info').should('not.equal', oldSong)
    cy.get('.radio-info').should('not.be.empty')
  });
  it('should after button work', () => {
    cy.get('.collapse-button').click()
    let oldSong = cy.get('.radio-info').invoke('text')
    cy.get('.after-button').click()
    cy.get('.radio-info').should('not.equal', oldSong)
    cy.get('.radio-info').should('not.be.empty')
  });
  it('should have a music title', () => {
    cy.get('.radio-info').should('not.be.empty')
  });
})
