describe('search', () => {
  const input = '[data-cy="search-input"]'
  const result = '[data-cy="search-result"]'
  const results = '[data-cy="search-results"]'
  
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('renders 10 search results', () => {
    cy.get(result).should('not.exist')
    
    cy.get(input).type('mint')
    
    cy.get(result).should('have.length', 10)
    cy.get(results).contains('mint', {matchCase: false})
  })
  
  it('updates search results', () => {
    cy.get(input).type('mint')
    cy.get(result).first().should('exist')
    let mintText
    cy.get(result).then(el => mintText = el.text())
    
    cy.get(input).clear()
    cy.get(results).should('not.have.text', 'mint')
    
    cy.get(input).type('Rubber')
    cy.get(result).first().should('exist')
    cy.get(result).then(el => expect(el.text()).not.to.equal(mintText))
  })
})