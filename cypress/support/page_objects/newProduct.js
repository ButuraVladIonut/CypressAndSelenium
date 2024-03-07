export class CreateNewProduct {
    navigateToNewProductPageAndCreateOne (productName, productSku, productPrice, productWeight, productQuantity, productUrlKey) {
        cy.contains('New Product').click();

        cy.get('[placeholder="Name"]').type(productName);
        cy.get('[placeholder="Name"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal(productName) 
        })

        cy.get('[placeholder="SKU"]').type(productSku);
        cy.get('[placeholder="SKU"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal(productSku) 
        })

        cy.get('[placeholder="Price"]').type(productPrice);
        cy.get('[placeholder="Price"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal(productPrice) 
        })
        
        cy.get('[placeholder="Weight"]').type(productWeight);
        cy.get('[placeholder="Weight"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal(productWeight) 
        })
        
        cy.get('[placeholder="Quantity"]').type(productQuantity);
        cy.get('[placeholder="Quantity"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal(productQuantity) 
        })
        
        cy.get('[name="url_key"]').type(productUrlKey);
        cy.get('[name="url_key"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal(productUrlKey) 
        })

        cy.contains('Save').click();
    }

    navigateToNewProductPageAndCreateOneWithoutName (productSku, productPrice, productWeight, productQuantity, productUrlKey) {
        cy.contains('New Product').click();

        cy.get('[placeholder="SKU"]').type(productSku);
        cy.get('[placeholder="SKU"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal(productSku) 
        })

        cy.get('[placeholder="Price"]').type(productPrice);
        cy.get('[placeholder="Price"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal(productPrice) 
        })
        
        cy.get('[placeholder="Weight"]').type(productWeight);
        cy.get('[placeholder="Weight"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal(productWeight) 
        })
        
        cy.get('[placeholder="Quantity"]').type(productQuantity);
        cy.get('[placeholder="Quantity"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal(productQuantity) 
        })
        
        cy.get('[name="url_key"]').type(productUrlKey);
        cy.get('[name="url_key"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal(productUrlKey) 
        })

        cy.contains('Save').click();
    }
}

export const createNewProduct = new CreateNewProduct();