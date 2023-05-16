Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

describe('Comment Testing', () => {
  it('Comment Test', () => {
    cy.visit('https://atlascraft.onrender.com/')
    cy.get('#\\:r0\\:').type('AtlasTester3')
    cy.get('#\\:r1\\:').type('test1234')
    cy.get('form > .MuiButtonBase-root').click()
    cy.get(':nth-child(1) > [style="width: 96%; top: 50%; left: 2%; height: 50%; position: absolute;"] > [style="height: 100%; width: 50%; position: absolute; font-size: 24px; color: rgb(245, 222, 179);"] > [aria-label="View Map"]').click()
    cy.get('#comment').click().type('This is comment').wait(1000)
    cy.get('[style="background: rgb(192, 192, 192);"] > .MuiButtonBase-root').click()
    cy.get('#comment').click().type('This is another comment').wait(1000)
    cy.get('[style="background: rgb(192, 192, 192);"] > .MuiButtonBase-root').click()
  })
})