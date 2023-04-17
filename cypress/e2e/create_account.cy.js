describe('create account', () => {
  it.only('passes', () => {
    cy.visit('https://atlascraft.onrender.com/')
    //click sign up button
    cy.get('.MuiGrid-container > :nth-child(1) > .MuiTypography-root').click
    cy.contains('Sign Up').click()
  })

  //this one tests creatging a demo account, once it runs, then no longer gonna work.
  it('fill information', () => {
    cy.visit('https://atlascraft.onrender.com/register')
    cy.get('#firstName').type('First')
    cy.get('#lastName').type('last')
    cy.get('#email').type('cypresstest@gmail.com')
    cy.get('#username').type('cypressTest')
    cy.get('#password').type('test1234')
    cy.get('#passwordVerify').type('test1234')
    cy.get(':nth-child(7) > .css-b62m3t-container > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click()
    cy.get('#react-select-2-option-0').click()
    cy.get('#answer1').type('answer1')
    cy.get(':nth-child(9) > .css-b62m3t-container > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click()
    cy.get('#react-select-3-option-1').click()
    cy.get('#answer2').type('answer2')
    cy.get('.MuiGrid-container > .MuiButtonBase-root').click()
  })
})