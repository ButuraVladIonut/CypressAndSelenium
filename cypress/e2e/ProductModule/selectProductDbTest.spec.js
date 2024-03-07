describe('database tests - data integrity', () => {
    
    beforeEach('Visit the website and connect into account', () => {
        cy.openHomePage();
        cy.loginToEvershop();
    })
    
    it('tries to see if the newly created product is in the db', () => {
      
        var randName = function generateRandomName() {
          const letters = "abcdefghijklmnopqrstuvwxyz";
          let name = "";
          for (let i = 0; i < 6; i++) {
            name += letters[Math.floor(Math.random() * letters.length)];
          }
          return name;
        }

        var productName = 'produs db';
        
        var the_sku = 'sku_test_db';
        var the_url_key = randName();
       
        cy.contains('New Product').click();
    
        cy.get('[placeholder="Name"]').type(productName);
        cy.get('[placeholder="Name"]').invoke('prop', 'defaultValue').then( text => {
          expect(text).to.equal(productName) 
        })
    
        cy.get('[placeholder="SKU"]').type('sku_test_db');
        cy.get('[placeholder="SKU"]').invoke('prop', 'defaultValue').then( text => {
          expect(text).to.equal('sku_test_db') 
        })
    
        cy.get('[placeholder="Price"]').type('123');
        cy.get('[placeholder="Price"]').invoke('prop', 'defaultValue').then( text => {
          expect(text).to.equal('123') 
        })
        
        cy.get('[placeholder="Weight"]').type('5');
        cy.get('[placeholder="Weight"]').invoke('prop', 'defaultValue').then( text => {
          expect(text).to.equal('5') 
        })
        
        cy.get('[placeholder="Quantity"]').type('50');
        cy.get('[placeholder="Quantity"]').invoke('prop', 'defaultValue').then( text => {
          expect(text).to.equal('50') 
        })
        
        cy.get('[name="url_key"]').type(the_url_key);
        cy.get('[name="url_key"]').invoke('prop', 'defaultValue').then( text => {
          expect(text).to.equal(the_url_key) 
        })
    
        cy.get('[name="group_id"]').select('Default')
    
        cy.contains('Save').click();
    
        cy.get('.page-heading').find('.page-heading-title').as('edit')
        cy.get('@edit').should('contain', `Editing ${productName}`)
        cy.get('@edit').parent().parent().find('.breadcrum-icon').click();
        
        cy.contains(productName).as('product')

        cy.task("READFROMDB", {
          //get config from cypress.config.js
          dbConfig: Cypress.config('DB'),
          //SQL we want to perform
          sql: 'select sku, price, weight from "product" order by product_id desc limit 1'
        }).then( result => {
          console.log(result.rows)
          console.log(result.rows[0].sku)
          expect(result.rows[0].sku).to.equal('sku_test_db')
          console.log(result.rows[0].price)
          expect(result.rows[0].price).to.equal('123.0000')
          console.log(result.rows[0].weight)
          expect(result.rows[0].weight).to.equal('5.0000')
        })
      })

    it('deletes a product and verifies if it has been deleted from the database', () => {

        cy.contains('Products').click()
        var productName = 'produs db';

        cy.contains(productName).get('.checkbox-unchecked').eq(1).click();
        cy.contains('Delete').click()
        cy.get('[class="card shadow"]').find('[class="button critical"]').click();

        cy.task("READFROMDB", {
          //get config from cypress.config.js
          dbConfig: Cypress.config('DB'),
          //SQL we want to perform
          sql: 'select sku, price, weight from "product" order by product_id desc limit 1'
        }).then( result => {
          console.log(result.rows)
          console.log(result.rows[0].sku)
          expect(result.rows[0].sku).not.to.equal('sku_test_db')
          console.log(result.rows[0].price)
          expect(result.rows[0].price).not.to.equal('123.0000')
          console.log(result.rows[0].weight)
          expect(result.rows[0].weight).not.to.equal('5.0000')
        })
    }) 
})