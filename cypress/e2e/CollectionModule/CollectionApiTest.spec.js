describe('Coupon API Test Case Suite', () => {

    beforeEach('Visit the website and connect into account', () => {
        cy.openHomePage();
        cy.loginToEvershop();
    })

    //cannot get the request right ... it shows the list empty and not when i click on it... i have to go Collections -> New Collection -> Edit New Collection -> Collections and the response is empty while the list should have the collections
    it.skip('wants to find the api with the graphql', () => {
        
        cy.contains('Collections').click()
        cy.contains('New Collection').click()
        cy.get('[name="name"]').type('newCollection')
        cy.get('[name="code"]').type('codeNewCollection')
        cy.contains('Save').click()
    
    })

    //intercept using cypress playground to see the call for creating the collection - dissapears 
    it('verifies creation of collection api request-response', () => {
        
        cy.intercept('POST', 'http://localhost:3000/api/collections').as('postCollections')

        cy.contains('Collection').click()
        cy.contains('New Collection').click()

        cy.get('[name="name"]').type('collectionNE2')
        cy.get('[name="code"]').type('colNEW2')

        cy.contains('Save').click()

        cy.wait('@postCollections').then( xhr => {
            console.log(xhr)
            expect(xhr.request.body.code).to.equal('colNEW2')
            expect(xhr.response.body.data.code).to.equal('colNEW2')
        })
    })

    //didn't worked - api 
    it.skip('gives requests to the api, rather than going through ui', () => {
        
        const userCredentials = {
            "email": "butura.vlad.ionut@gmail.com",
            "password": "Vladd123$"
        }

        const bodyRequest = {
            "name":"collectionNE2",
            "collection_id":"",
            "code":"colNEW2",
            "description":""
        }

        cy.request('POST', 'http://localhost:3000/admin/user/login', userCredentials).its('body').then( body => {
            const cookie = body.data.sid
            let uuid;

            cy.request({
                url: 'http://localhost:3000/api/collections',
                headers: { 'Cookie': cookie },
                method: 'POST',
                body: bodyRequest
            }).then( response => {
                expect(response.status).to.equal(200)
                uuid = response.body.data.uuid
            })

            cy.contains('Collections').click()

            cy.get('table tbody').find('tr').then( row => {
                cy.wrap(row).eq(1).find('td').then( rowData => {
                    cy.wrap(rowData).eq(0).find('.checkbox-unchecked').click()
                })
                cy.wrap(row).eq(0).find('a').then( a => {
                    cy.wrap(a).eq(1).find('span').click()
                    cy.contains('Delete 1 collections').parent().parent().find('.critical').click()
                })
            })

            cy.request({
                url: 'http://localhost:3000/api/collections/' + uuid,
                headers: { 'Cookie': cookie },
                method: 'DELETE'
            }).its('body').then( body => {
                console.log(body)
            })
        })

    })

})