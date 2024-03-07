// import { eq } from "cypress/types/lodash";
import { createNewProduct } from "../../support/page_objects/newProduct";


describe('Product Module Test Case Suite', () => {

    beforeEach('Visit the website and connect into account', () => {
        cy.openHomePage();
        cy.loginToEvershop();
    })

    it('tries to make a product with empty required fields', () => {

        cy.contains('New Product').click();

        cy.contains('Save').click();
        cy.get('[for="name"]').parent().find('.field-error').should('contain', 'This field can not be empty');
        cy.get('[for="sku"]').parent().find('.field-error').should('contain', 'This field can not be empty');
        cy.get('[for="price"]').parent().find('.field-error').should('contain', 'This field can not be empty');
        cy.get('[for="weight"]').parent().find('.field-error').should('contain', 'This field can not be empty');
        cy.get('[for="qty"]').parent().find('.field-error').should('contain', 'This field can not be empty');
        cy.get('[for="url_key"]').parent().find('.field-error').should('contain', 'This field can not be empty');

    })

    it('tries to make a product with empty name', () => {
        
        createNewProduct.navigateToNewProductPageAndCreateOneWithoutName('sku-pom2', '21', '4', '51', 'url_key_pom2');
        
        cy.get('[for="name"]').parent().find('.field-error').should('contain', 'This field can not be empty');
        cy.get('[for="sku"]').parent().should('not.have.class', '.has-error');
        cy.get('[for="price"]').parent().should('not.have.class', '.has-error');
        cy.get('[for="weight"]').parent().should('not.have.class', '.has-error');
        cy.get('[for="qty"]').parent().should('not.have.class', '.has-error');
        cy.get('[for="url_key"]').parent().should('not.have.class', '.has-error');
    })

    it('tries to create a product with all valid fields', () => {

        createNewProduct.navigateToNewProductPageAndCreateOne('test name pom', 'sku-pom-test', '37', '9', '150', 'url_key_pom-test');

    })

    //3 out of 4 times it's not waiting for the ui to load and deletes the wrong product
    it('tries to create and delete a product', () => {

        var randName = function generateRandomName() {
            const letters = "abcdefghijklmnopqrstuvwxyz";
            let name = "";
            for (let i = 0; i < 6; i++) {
              name += letters[Math.floor(Math.random() * letters.length)];
            }
            return name;
        }

        var productName = 'produs de sters'
        createNewProduct.navigateToNewProductPageAndCreateOne(productName, randName(), '20', '3', '50', randName());

        cy.get('[placeholder="Name"]').invoke('prop', 'defaultValue').as('name')
        cy.contains('Save').click();

        cy.get('.page-heading').find('.page-heading-title').as('edit')
        cy.get('@edit').should('contain', `Editing ${productName}`)
        cy.get('@edit').parent().parent().find('.breadcrum-icon').click();

        //cy.wait(5000);
        // cy.get('tbody').find('tr', {timeout: 5000}).then( trow => {
        //     cy.wrap(trow).eq(1).find('td').then( tdata => {
        //         cy.wrap(tdata).eq(0).find('.checkbox-unchecked').click();
        //     })
        //     //cy.wait(5000);
        //     cy.wrap(trow).eq(0).should('be.visible', {timeout: 5000});
        //     cy.wrap(trow).eq(0).find('a').then( a => {
        //         cy.wrap(a).eq(3).click();
        //         cy.get('[class="card shadow"]').find('[class="button critical"]').click();
        //     })
        // })
        cy.contains(productName).get('.checkbox-unchecked').eq(1).click();
        cy.contains('Delete').click()
        cy.get('[class="card shadow"]').find('[class="button critical"]').click();

    })

    it('tries to create product with invalid price input', () => {

        createNewProduct.navigateToNewProductPageAndCreateOne('name example 4', 'sku 4', 'twenty', '3', '50', 'url_key4');
        
        cy.get('[role="alert"]').should('contain', 'Price should be a number with maximum 2 decimal places'); 
    
    })

    it('tries to create product with fake url key', () => {
        
        createNewProduct.navigateToNewProductPageAndCreateOne('name example509', 'sku5', '20', '3', '50', 'www.example.com/red-cotton-t-shirt');
        
        cy.get('[role="alert"]').should('contain', 'Invalid url_key: www.example.com/red-cotton-t-shirt'); 
    })

    it('tries to create the same product twice', () => {
        
        var prodSameName = 'same name'
        createNewProduct.navigateToNewProductPageAndCreateOne(prodSameName, 'same sku', '20', '3', '50', 'same_url');
        
        cy.get('.page-heading').find('.page-heading-title').as('edit')
        cy.get('@edit').should('contain', `Editing ${prodSameName}`)
        cy.get('@edit').parent().parent().find('.breadcrum-icon').click();
    
        //cy.get('.main-content-inner').contains('New Product').click();

        createNewProduct.navigateToNewProductPageAndCreateOne(prodSameName, 'same sku', '20', '3', '50', 'same_url');
        
        cy.get('[role="alert"]').as('deleteAlert')
        cy.get('@deleteAlert').should('contain', 'duplicate key value violates unique constraint "PRODUCT_SKU_UNIQUE"'); 
        cy.get('@deleteAlert').parent().find('button').click()
    
        cy.get('[placeholder="SKU"]').clear().type('sku other');
        cy.get('[placeholder="SKU"]').invoke('prop', 'defaultValue').then( text => {
          expect(text).to.equal('sku other'); 
        })
    
        cy.contains('Save').click();
    
        cy.get('[role="alert"]').should('contain', 'duplicate key value violates unique constraint "PRODUCT_URL_KEY_UNIQUE"');
    })
    
    it('tries to select, change and unassign a category', () => {
        
        cy.contains('New Product').click();
        cy.get('.card').as('card');
        cy.get('@card').find('.text-interactive').click();
        cy.get('@card').find('li').then( li => {
          cy.wrap(li).eq(0).find('a').then( a => {
            cy.wrap(a).eq(1).click();
            cy.get('@card').find('.text-gray-500').should('contain', 'Men');
          })
        })
        cy.contains('Change').click();
        cy.get('@card').find('li').then( li => {
          cy.wrap(li).eq(2).find('a').then( a => {
            cy.wrap(a).eq(1).click();
            cy.get('@card').find('.text-gray-500').should('contain', 'Kids');
          })
        })
        cy.contains('Unassign').click();
        cy.get('@card').should('contain','Select category');
    
    })
    
    it('tries to select a tax class', () => {
        cy.contains('New Product').click();
        cy.get('.card').find('#tax_class').select('Taxable Goods').should('contain', 'Taxable Goods');
        cy.get('.card').find('#tax_class').select('None').should('contain', 'None');
    })

    //didn't worked li iteration
    it('tries to save, add, delete pictures to product description; create folders; exit folder page', {retries: 0}, () =>{
        
        cy.contains('New Product').click();
        cy.contains('Description').parent().get('.ckeditor').find('a').click();
        
        cy.get('.file-browser').find('li.text-interactive').then( li => {
            cy.wrap(li).find('a').click();
        })
        
        cy.get('.col-span-1').find('li').then( li => {
            cy.wrap(li).eq(1).find('a').click();
        })
        
        // .then( li => {
        //   cy.wrap(li).eq(1).contains('9909').click();
        // })

        cy.get('.file-browser').find('.image-item').then( image => {
            cy.wrap(image).eq(1).click();
        })
        cy.contains('Insert Image').click();
    })

    //Cypress real events - https://www.npmjs.com/package/cypress-real-events?activeTab=code
    //discusion - https://github.com/ckeditor/ckeditor5/issues/12802
    it('tries the description features - bold, italic, link, bulleted list, numbered list, block quote, table', {retries: 0},() => {
        
        cy.contains('New Product').click();

        //cy.get('[role="textbox"]').click();
        //cy.realType('yes');

        cy.contains('Description').parent().find('.ck-toolbar__items').as('functions');
        cy.contains('Description').parent().find('[role="textbox"]').as('textbox');
        cy.get('@functions').find('[data-cke-tooltip-text="Bold (Ctrl+B)"]').click();
        cy.get('@textbox').click()
        cy.get('@textbox').type('using bold');
        cy.get('@functions').find('[data-cke-tooltip-text="Italic (Ctrl+I)"]').click();
        cy.get('@textbox').click()
        cy.get('@textbox').type('using italic');

        // cy.get('@functions').find('[data-cke-tooltip-text="Italic (Ctrl+I)"]').click();
        // cy.get('.ck-body-wrapper').find('form .ck-input').type('https://www.google.com');
        // // cy.get
        // // cy.get('@textbox').type('using links {enter}');
        // // cy.get('@functions').find('[data-cke-tooltip-text="Italic (Ctrl+I)"]').click();
        // // cy.get('@textbox').type('using bold {enter}');
    })
    
    it('tries to add pictures to product and delete them', () => {
        //npm install --save-dev cypress-file-upload
        cy.contains('New Product').click();

        cy.contains('Media').parent().parent().find('.uploader-icon').click()

        cy.contains('Media').parent().parent().find('[type="file"]', {force: true}).selectFile(
        "cypress/fixtures/pictures/example.jpg", {force: true}
        )
        
        cy.contains('Media').parent().parent().find('img').should('be.visible');
        cy.contains('Media').parent().parent().find('img').should('have.attr', 'src').and('include', 'example.jpg')

        cy.contains('Media').parent().parent().find('[type="file"]', {force: true}).selectFile(
        "cypress/fixtures/pictures/exemplu2.jpg", {force: true}
        )

        //cy.wait(3000)
        cy.contains('Media').parent().parent().find('[tabindex="0"]').find('img').should('have.attr', 'src').and('include', 'exemplu2.jpg')
        //.should('be.visible', {timeout: 10000})

        cy.get('#images').find('[tabindex="-1"]').find('.feather-trash-2').click()

    })

    it('tries to adjust the product status and checks it in the Products list', () => {
        
        cy.contains('New Product').click();

        cy.get('[placeholder="Name"]').type('verificare status produs');
        cy.get('[placeholder="Name"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal('verificare status produs') 
        })

        cy.get('[placeholder="SKU"]').type('sku status');
        cy.get('[placeholder="SKU"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal('sku status') 
        })

        cy.get('[placeholder="Price"]').type('20');
        cy.get('[placeholder="Price"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal('20') 
        })
        
        cy.get('[placeholder="Weight"]').type('3');
        cy.get('[placeholder="Weight"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal('3') 
        })
        
        cy.get('[placeholder="Quantity"]').type('50');
        cy.get('[placeholder="Quantity"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal('50') 
        })
        
        cy.get('[name="url_key"]').type('url_key_status');
        cy.get('[name="url_key"]').invoke('prop', 'defaultValue').then( text => {
            expect(text).to.equal('url_key_status') 
        })

        cy.get('[for="status"]').parent().as('productStatus')
        cy.get('@productStatus').find('#status0').click({force: true});
        cy.get('@productStatus').find('#status0').should('be.checked')
        cy.get('@productStatus').find('#status1').should('not.be.checked')
        cy.get('@productStatus').find('#status1').click({force: true});
        cy.get('@productStatus').find('#status0').should('not.be.checked')
        cy.get('@productStatus').find('#status1').should('be.checked')

        cy.contains('Save').click();

        cy.get('.page-heading').find('.page-heading-title').as('edit')
        cy.get('@edit').should('contain', 'Editing verificare status produs')
        cy.get('@edit').parent().parent().find('.breadcrum-icon').click();

        cy.get('table tbody').find('tr td').then( testData => {
            cy.wrap(testData).eq(6).find('span').should('have.class', 'success');
        })
        
    })

    //!!!
    //price and qantity do not make changes. only product name, sku and status make changes
    it.skip('tries to use the search filters for Products', () => {
        cy.contains('Products').click()

        // cy.get('[placeholder="Product Name"]').type('sosete{enter}');

        // cy.get('table tbody').find('tr td').then( testData => {
        //   cy.wrap(testData).eq(2).find('a').should('contain', 'sosete');
        // })

        // cy.get('[placeholder="Product Name"]').clear()
        cy.contains('Price').parent().parent().find('[placeholder="From"]').type('120{enter}')
        //cy.contains('Qty').parent().parent().find('[placeholder="From"]').type('35{enter}')

        cy.get('table tbody').find('tr').then( row => {
            cy.wrap(row).eq(1).find('td').then( tableData => {
                cy.wrap(tableData).eq(3).find('span').then( priceElement => {
                    const priceText = cy.wrap(priceElement).text()
                    const priceValue = parseFloat(priceText.substring(1))
                
                    cy.wrap(priceValue).should('be.at.least', 20)
                })
            })
        })
    })

})