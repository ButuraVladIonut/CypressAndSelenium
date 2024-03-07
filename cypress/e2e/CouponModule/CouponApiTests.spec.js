describe('Coupon API Test Case Suite', () => {

    beforeEach('Visit the website and connect into account', () => {
        cy.openHomePage();
        cy.loginToEvershop();
    })

    //intercept - action - validation
    //https://katalon.com/resources-center/blog/test-cases-for-api-testing
    it('verifies the api call to changing coupon details', () => {

        cy.intercept('PATCH', 'http://localhost:3000/api/coupons/286ff959-c1ed-4489-937f-6953b97c5c90').as('patchCoupon')

        cy.contains('Coupons').click()

        // cy.get('table tbody').find('tr').then( row => {
        //     cy.wrap(row).eq(1).find('td').then( rowData => {
        //         cy.wrap(rowData).eq(1).find('a').click()
        //     })
        // })
        var coupon = 'coupon1';
        cy.contains(coupon).click()

        cy.get('[name="coupon"]').invoke('attr', 'value').should('contain', 'coupon1')
        cy.get('[name="coupon"]').clear().type('coupon2')
        cy.contains('Save').click()

        cy.wait('@patchCoupon').then( xhr => {
            console.log(xhr)

            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.request.body.discount_amount).to.equal('40')
            expect(xhr.request.body.coupon).to.equal('coupon2')
        })

    })
})
 