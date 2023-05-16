Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

beforeEach(() => {
  cy.visit('https://atlascraft.onrender.com/')
  cy.get('#\\:r0\\:').type('AtlasTester3')
  cy.get('#\\:r1\\:').type('test1234')
  cy.get('form > .MuiButtonBase-root').click()
})



describe('Publishing and Deleting Test', () => {
  it('Publishing a map', () => {
    cy.get('[aria-label="View Your Maps"]').click()
    cy.get(':nth-child(2) > [style="width: 96%; top: 80%; left: 2%; height: 50%; position: absolute;"] > [style="height: 100%; width: 100%; position: absolute;"] > [aria-label="Edit Map"]').click().wait(500)
    cy.get('[data-testid="PublishIcon"]').click()
  })
  it('Deleting Test', () => {
    cy.get('[aria-label="View Your Maps"]').click()
    cy.contains("Delete").click()
  })
})