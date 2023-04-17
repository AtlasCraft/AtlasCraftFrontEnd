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

describe('mapcard testing', () => {
  it('view screen', () => {
    cy.get(':nth-child(1) > [style="width: 96%; top: 50%; left: 2%; height: 50%; position: absolute;"] > [style="height: 100%; width: 50%; position: absolute; font-size: 24px; color: rgb(245, 222, 179);"] > :nth-child(1)').click()
  })
  it('fork screen', () => {
    cy.get(':nth-child(1) > [style="width: 96%; top: 50%; left: 2%; height: 50%; position: absolute;"] > [style="height: 100%; width: 50%; position: absolute; font-size: 24px; color: rgb(245, 222, 179);"] > :nth-child(2)').click()
  })
  it('edit screen', () => {
    cy.get(':nth-child(2) > [style="width: 96%; top: 50%; left: 2%; height: 50%; position: absolute;"] > [style="height: 100%; width: 50%; position: absolute; font-size: 24px; color: rgb(245, 222, 179);"] > :nth-child(4)').click()
  })
  it('add screen', () => {
    cy.get('[style="height: 100%; width: 80%; left: 10%; position: absolute;"] > :nth-child(1) > :nth-child(3)').click()
  })
})

describe('homescreen path testing', () => {
  it('path testing', () => {
    
    cy.get('[style="height: 100%; width: 80%; left: 10%; position: absolute;"] > :nth-child(1) > :nth-child(1)').click()  
    cy.get('[style="height: 100%; width: 80%; left: 10%; position: absolute;"] > :nth-child(1) > :nth-child(2)').click()
    cy.get('[data-testid="MenuIcon"] > path').click()
    cy.get('.css-1sucic7 > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click()
    cy.get('.MuiPaper-root > .MuiList-root > :nth-child(2)').click()
    cy.get('.MuiPaper-root > .MuiList-root > :nth-child(3)').click()
    cy.get('.MuiPaper-root > .MuiList-root > :nth-child(4)').click()
  })
})

describe('navigation bar testing', () => {
  it('log-out testing', () => {
    cy.get('.MuiAvatar-root').click()
    cy.get('.MuiList-root > div > :nth-child(1)').click()
  })
  it('change password path testing', () => {
    cy.get('.MuiAvatar-root').click()
    cy.get('.MuiList-root > div > :nth-child(2)').click()
    cy.get('img').click()
    cy.get('.MuiAvatar-root').click()
    cy.get('.MuiList-root > div > :nth-child(2)').click()
    cy.get('.MuiButton-containedSecondary').click()
  })
})
