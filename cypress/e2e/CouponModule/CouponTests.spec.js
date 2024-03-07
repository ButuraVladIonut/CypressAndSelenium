describe('Coupon Module Test Case Suite', () => {
   
    beforeEach('Visit the website and connect into account', () => {
        cy.openHomePage();
        cy.loginToEvershop();
    })
    
    //can't do the end date - display:none 
    it('tries to add start and end date to a coupon', () => {
/*
        function selectDayFromCurrent(day) {
          let date = new Date()
          date.setDate(date.getDate() + day)
          let futureDay = date.getDate()
          let futureMonth = date.toLocaleDateString('en-US', {month: 'numeric'})
          futureMonth = futureMonth.padStart(2, '0');
          let futureYear = date.getFullYear()
          let dateToAssert = `${futureYear}-${futureMonth}-${futureDay}`
          
          cy.get('.today').invoke('attr', 'aria-label').then( dateAttribute => {
            if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
                cy.get('.flatpickr-next-month').click()
                selectDayFromCurrent(day)
            } else {
              cy.get('.flatpickr-day').not('.prevMonthDay').not('.nextMonthDay').contains(futureDay).should('be.visible')
              cy.get('.flatpickr-day').not('.prevMonthDay').not('.nextMonthDay').contains(futureDay).click()
            }
          })
          return dateToAssert
        }
    
        cy.contains("New Coupon").click()
    
        cy.get('#start_date').then( input => {
          cy.wrap(input).click()
          const dateToAssert = selectDayFromCurrent(5)
          cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
          //or
          cy.wrap(input).should('have.value', '2024-02-21')
        })
    
        cy.get('#end_date').then( input => {
          cy.wrap(input).click()
          const dateToAssert = selectDayFromCurrent(6)
          cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
          //or
          cy.wrap(input).should('have.value', '2024-02-26')
        })
        */

        function selectDayFromCurrent(day) {
          let date = new Date()
          date.setDate(date.getDate() + day)
          let futureDay = date.getDate()
          let futureMonth = date.toLocaleDateString('en-US', {month: 'numeric'})
          let futureMonthLong = date.toLocaleDateString('en-US', {month: 'long'})
          futureMonth = futureMonth.padStart(2, '0');
          let futureYear = date.getFullYear()
          let dateToAssert = `${futureYear}-${futureMonth}-${futureDay}`
          
          cy.get('.open').get('.today').invoke('attr', 'aria-label').then( dateAttribute => {
            
            if(!dateAttribute.includes(futureMonthLong) || !dateAttribute.includes(futureYear)) {
                cy.get('.flatpickr-next-month').click()
                selectDayFromCurrent(day)
            } else {
              cy.get('span[class="flatpickr-day"]').not('.prevMonthDay').not('.nextMonthDay').contains(futureDay).should('be.visible')
              cy.get('.flatpickr-day').not('.prevMonthDay').not('.nextMonthDay').contains(futureDay).click()
            }
          })
          return dateToAssert
        }
    
        cy.contains("New Coupon").click()
        cy.get('#start_date').click();
    
        cy.get('#start_date').then( input => {
          cy.wrap(input).click()
          const dateToAssert = selectDayFromCurrent(5)
          cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
          //sau
          cy.wrap(input).should('have.value', '2024-03-11')
        })
    
        // cy.get('#end_date').then( input => {
        //   cy.wrap(input).click()
        //   const dateToAssert = selectDayFromCurrent(6)
        //   cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
        //   //sau
        //   cy.wrap(input).should('have.value', '2024-03-11')
        // })
    
    
    })
    
    it('tries to toggle the status, check the free shipping and select a discount type', () => {
        
        cy.contains('New Coupon').click()
        
        cy.get('.toggle').should('have.class', 'enabled')
        cy.get('.toggle').click()
        cy.get('.toggle').should('not.have.class', 'enabled')

        cy.get('[type="checkbox"]').should('not.be.checked')
        cy.get('[type="checkbox"]').click({force: true}) //or
        cy.get('[type="checkbox"]').should('be.checked')
        cy.get('[type="checkbox"]').check({force: true})

        cy.contains('Discount Type').parent().parent().find('.radio-field').children().each((child, index) => {
            cy.wrap(child).find('input').click({force: true})
            cy.wrap(child).find('input').should('be.checked')
        })
  
    })



})