describe('Collection test case suite', () => {
    
    beforeEach('Visit the website and connect into account', () => {
        cy.openHomePage();
        cy.loginToEvershop();
    })

    //error from app when clicking Add Product - collection error
    //https://stackoverflow.com/questions/62980435/the-following-error-originated-from-your-application-code-not-from-cypress
    it('creates a collection of products and add products to it', () => {
        //cy.once('uncaught:exception', () => false); //turn of, but no result
        
        cy.contains('Collections').click()

        cy.get('table tbody').find('tr td').then( testData => {
            cy.wrap(testData).eq(2).find('a').click();
        })

        cy.get('.text-interactive').should('be.visible').then( link => {
            cy.get(link).click()
        })
        // cy.get('.text-interactive').click();
        cy.contains('Select Products').parents()

    })

})