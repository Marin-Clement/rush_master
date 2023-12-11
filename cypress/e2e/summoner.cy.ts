describe('summoner page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
    cy.get('.summoner-container').first().click()
  });
  it('should visit summoner page', () => {
    cy.visit('http://localhost:4200')
    cy.get('.summoner-container').first().click()
    cy.url().should('include', '/summoner/')
  });
  it('should have summoner name', () => {
    cy.get('.summoner-name').should('not.be.empty')
  });
  it('should tab navigation work', () => {
    cy.get('.tab-nav-container').get('.nav-item').contains('Champions').click()
    cy.url().should('include', '/champions')
    cy.get('.tab-nav-container').get('.nav-item').contains('Live Game').click()
    cy.url().should('include', '/live')
    cy.get('.tab-nav-container').get('.nav-item').contains('Summoner').click()
    cy.url().should('include', '/overview')
  });
});

describe('summoner page - champion stats', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
    cy.get('.summoner-container').first().click()
  });
  it('should have summoner stats', () => {
    cy.get('.champion-stats-container').should('exist')
  });
  it('should have maximum 7 champions', () => {
    cy.get('.champion-stats').should('have.length.lte', 7);
  });
  it('should have view more button', () => {
    cy.get('.champion-stats-view-all-button').should('exist')
  });
  it('should view more button redirect to champion page', () => {
    cy.get('.champion-stats-view-all-button').click()
    cy.url().should('include', '/champions')
  });
});

describe('summoner page - match history', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
    cy.get('.summoner-container').first().click()
  });
  it('should have match history', () => {
    cy.get('.game-history').should('exist')
  });
  it('should have maximum 10 matches if not scrolled', () => {
    cy.get('.game-container').should('have.length.lte', 10);
  });
  it('should after scroll add at maximum 10 matches', () => {
    cy.get('.game-container').should('have.length.lte', 10);
    cy.scrollTo('bottom')
    cy.get('.game-container').should('have.length.lte', 20);
    cy.scrollTo('bottom')
  });
});

describe('summoner page - live game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
    cy.get('.summoner-container').first().click()
    cy.get('.tab-nav-container').get('.nav-item').contains('Live Game').click()
  });
  it('should have refresh button', () => {
    cy.get('.refresh-button').should('exist')
  });
  it('should refresh button work', () => {
    cy.get('.refresh-button').click()
    cy.get('.refresh-button').should('exist')
  });
});


describe('summoner page - game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
    cy.get('.summoner-container').first().click()
  });
  it('should open game details', () => {
    cy.get('.game-container').first().click()
    cy.get('.game-deep-info').should('exist')
  });
  it('should close game details', () => {
    cy.get('.game-container').first().click()
    cy.get('.game-deep-info').should('exist')
    cy.get('.game-container').first().click()
    cy.get('.game-deep-info').should('not.exist')
  });
});
