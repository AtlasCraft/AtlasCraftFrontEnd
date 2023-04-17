beforeEach(() => {
  cy.visit('https://atlascraft.onrender.com/')
})
describe('basic path testing', () => {
  it('password retrieval screen', () => {
    cy.get('form > .MuiGrid-container > :nth-child(2) > .MuiTypography-root').click()
    cy.get('.MuiButton-containedSecondary').click()
  })

  it('navigation bar testing', () => {
    cy.get('.MuiIconButton-root').click()
    cy.get('.MuiList-root > div > :nth-child(1) > a').click()
  })

  it('register screen testing', () => {
    cy.get('.MuiGrid-container > :nth-child(1) > .MuiTypography-root').click()
  })
})