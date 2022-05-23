// NOTE This spec is reliable with a fresh database. (Restart the mock server)
// For proper integration, this spec would require re-seeding the database before each run.
// This interaction could be tested against mock api responses as well.
describe('star', () => {
  const input = '[data-cy="search-input"]'
  const result = '[data-cy="search-result"]'
  const starredCount = '[data-cy="starred-count"]'
  
  it('updates and persists starred status', () => {
    cy.visit('/')
    cy.get(starredCount).should('have.text', '0')
    
    cy.get(input).type('a')
    cy.get(result).first().should('not.have.class', 'starred')
    
    cy.get(result).first().click()
    cy.get(result).first().should('have.class', 'starred')
    cy.get(starredCount).should('have.text', '1')
    
    cy.reload()
    cy.get(input).type('a')
    cy.get(result).first().should('have.class', 'starred')
    
    cy.get(result).first().click()
    cy.get(result).first().should('not.have.class', 'starred')
    cy.get(starredCount).should('have.text', '0')
    
    cy.reload()
    cy.get(input).type('a')
    cy.get(result).first().should('not.have.class', 'starred')
  })
})