describe('database tests - CRUD operations', () => {

    it('tests only the tasks operations', () => {
        //insert new row
        cy.task("READFROMDB", {
            //get config from cypress.config.js
            dbConfig: Cypress.config('DB'),
            //SQL we want to perform
            sql: `insert into product (sku, price, weight) values ('sku-db', 500, 10);`
        })

        //verify its presence
        cy.task("READFROMDB", {
            //get config from cypress.config.js
            dbConfig: Cypress.config('DB'),
            //SQL we want to perform
            sql: 'select sku, price, weight from "product" order by product_id desc limit 1'
        }).then( result => {
            console.log(result.rows)
            console.log(result.rows[0].sku)
            expect(result.rows[0].sku).to.equal('sku-db')
            console.log(result.rows[0].price)
            expect(result.rows[0].price).to.equal('500.0000')
            console.log(result.rows[0].weight)
            expect(result.rows[0].weight).to.equal('10.0000')
        })

        //delete the row
        cy.task("READFROMDB", {
            //get config from cypress.config.js
            dbConfig: Cypress.config('DB'),
            //SQL we want to perform
            sql: `delete from product where sku = 'sku-db';`
        })

        //verify the row was deleted
        cy.task("READFROMDB", {
            //get config from cypress.config.js
            dbConfig: Cypress.config('DB'),
            //SQL we want to perform
            sql: 'select sku, price, weight from "product" order by product_id desc limit 1'
        }).then( result => {
            console.log(result.rows)
            console.log(result.rows[0].sku)
            expect(result.rows[0].sku).not.to.equal('sku-db')
            console.log(result.rows[0].price)
            expect(result.rows[0].price).not.to.equal('500.0000')
            console.log(result.rows[0].weight)
            expect(result.rows[0].weight).not.to.equal('10.0000')
        })
    })

})