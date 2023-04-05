describe('template spec', () => {

  it('passes', () => {
    cy.visit('http://64.227.29.95/')
    cy.get('a.MuiButtonBase-root').click
    cy.get('.css-1an0zpc > .MuiBox-root > button.MuiButtonBase-root').click
    cy.get('.MuiBox-root > .MuiTypography-inherit').click
    cy.get('.MuiBox-root > .MuiTypography-inherit').click({force: true})
  });

  it('create account test', function() {
    cy.visit('http://64.227.29.95/register')
    cy.get('.MuiGrid-spacing-xs-2 > :nth-child(1)').type('First')
    cy.get('#lastName').type('Last')
    cy.get('#username').type('test')
    cy.get('#email').type('test@gmail.com')
    cy.get('#password').type('test1234')
    cy.get('#passwordVerify').type('test1234')
    cy.get('.css-1rcoy2u > .MuiBox-root > .MuiButtonBase-root').click
    cy.get('.css-1rcoy2u > .MuiBox-root > .MuiButtonBase-root').click({force: true})
  });

  it('login test', function() {
    cy.visit('http://64.227.29.95/login')
    cy.get('#Username').type('test')
    cy.get('#password').type('test1234')
    cy.get('.css-1y8ugea > .MuiBox-root > .MuiButtonBase-root').click
    cy.get('.css-1y8ugea > .MuiBox-root > .MuiButtonBase-root').click({force: true})
  });

  it('mainpage test', function() {
    cy.visit('http://64.227.29.95/login')
    cy.get('#Username').type('test')
    cy.get('#password').type('test1234')
    cy.get('.css-1y8ugea > .MuiBox-root > .MuiButtonBase-root').click
    cy.get('.css-1y8ugea > .MuiBox-root > .MuiButtonBase-root').click({force: true})
    cy.get('[href="/all"]').click
    cy.get('[href="/home"]').click
    cy.get('.Mui-selected').click
    cy.get('.MuiAvatar-root').click
  });

})