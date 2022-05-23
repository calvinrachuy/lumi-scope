describe('home', () => {
  it('loads the home page', () => {
    cy.visit('/')
    cy.get('[data-cy="title"]')
    cy.get('[data-cy="search-input"]')
  })
})