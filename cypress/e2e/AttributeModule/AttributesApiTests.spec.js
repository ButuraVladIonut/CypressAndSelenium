describe.skip('Attribute API Test Case Suite', () => {

    beforeEach('Visit the website and connect into account', () => {
        cy.openHomePage();
        cy.loginToEvershop();
    })

    //doesn't work
    it('verifies mock/stub api request-response', () => {
        
        cy.intercept('POST', 'http://localhost:3000/api/admin/graphql', {fixture: "mockAttributes.json"})
        cy.contains('Attributes').click()
    
    })

})

