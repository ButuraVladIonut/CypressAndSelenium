describe.skip('Setting Module Test Suite', () => {

    beforeEach('Visit the website and connect into account', () => {
        cy.openHomePage();
        cy.loginToEvershop();
    })

    //no access to payment methods 
    it('tries the settings and tests the user payment methods', () => {

        cy.contains('Setting').click()
        cy.contains('Payment Setting').click()
        cy.contains('Paypal Payment').parent().parent().find('.toggle').click()
        cy.contains('Save').click()
        cy.contains('Shipping Setting').click()
        // cy.contains('Create new shipping zone').click()
        // cy.get('[placeholder="Enter zone name"]').type('Bucharest')
        // cy.contains('Country').parent().parent().find('input').select('Romania')
        // cy.contains('Provinces/States').parent().parent().find('input').select('Bucuresti')
        // cy.contains("Save").click()
    
        cy.contains('+ Add Method').click()
        cy.contains('Method name').parent().parent().find('.css-19bb58m').type('payment_method_bucuresti_romania{enter}')
        cy.get('.toggle').click()
        cy.get('[placeholder="Shipping cost"]').type('14.99')
        cy.contains('Add condition').click()
        cy.get('[placeholder="Minimum order price"]').type('20')
        cy.get('[placeholder="Maximum order price"]').type('200')
        cy.contains('Save').click()
    
        //have to change this to selecting from combobox
        // cy.contains('Country').parent().parent().find('[role="combobox"]').type('Romania{enter}')
        // cy.contains('Provinces/States').parent().parent().find('[role="combobox"]').type('Bucuresti{enter}')
        // cy.contains('Save').click()
    
        cy.visit('http://localhost:3000/account/login')
        // cy.contains('Create an account').click()
        // cy.get('[name="full_name"]').type('Marin Popescu')
    
        cy.get('[name="email"]').type('marin.popescu@yahoo.com')
        cy.get('[name="password"]').type('marinpop123$')
        cy.contains('SIGN IN').click()
    
        cy.contains('Kids').click()
        cy.get('.grid-cols-2').children().eq(1).find('.product-name').click()
        cy.get('[name="qty"]').clear().type('3')
        cy.contains('ADD TO CART').click()
    
        cy.contains('JUST ADDED TO YOUR CART').parent().parent().find('.add-cart-popup-button').not('.underline').click()
        cy.contains('CHECKOUT').click()
    
        cy.get('[placeholder="Email"]').type('marinpopescu@yahoo.com')
        cy.contains('Continue to shipping').click()
    
        cy.get('[name="address[full_name]"]').type('Marin Popescu')
        cy.get('[name="address[telephone]"]').type('0723345678')
        cy.get('[name="address[address_1]"]').type('Address example for shipping')
        cy.get('[name="address[city]"]').type('Bucharest')
        cy.get('[name="address[country]"]').select('Romania')
        cy.get('[name="address[province]"]').select('Bucuresti')
        cy.get('[name="address[postcode]"]').type('123456')
        //cy.get('Continue to payment').click()
    
    })

})
