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

describe('Uploading Test', () => {
  it('', () => {
    cy.get('[aria-label="Create New Map"]').click().wait(500)
    cy.contains('Upload').click()
    cy.get('.MuiButtonGroup-root > :nth-child(1)').selectFile('test.geojson').wait(500)
    cy.get('.leaflet-control-zoom-out > span').click().wait(500)
    cy.get('.leaflet-control-zoom-out > span').click().wait(500)
    cy.get('.leaflet-control-zoom-out > span').click().wait(500)
    cy.get('.leaflet-control-zoom-out > span').click().wait(500)
    cy.get('.leaflet-control-zoom-out > span').click().wait(2000)
  })
})