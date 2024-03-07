describe('check dashboard page', () => {

    beforeEach('Visit the website and connect into account', () => {
      cy.openHomePage();
      cy.loginToEvershop();
    })
  
    it('shows sale statistics - daily/weekly/monthly', () => {
      
      cy.contains('Dashboard').click();
    /*
      readStatistics.readStatisticsDailyWeeklyOrMonthly(45, 179,'Weekly');
  
      readStatistics.readStatisticsDailyWeeklyOrMonthly(45, 179, 'Monthly');
  */
      cy.get('.recharts-wrapper').find('.recharts-tooltip-wrapper').trigger('mouseover', 45, 179, {force: true});
  
      cy.get('.recharts-tooltip-label').should('contain', 'Oct 31');
      cy.get('.recharts-tooltip-item').should('contain', 'count : 0');
    /* 
      bug#1 - ramane cu o iteratie in urma.
      cy.contains('Weekly').click();
  
      cy.get('.recharts-wrapper').find('.recharts-tooltip-wrapper').trigger('mouseover', 45, 179, {force: true});
  
      cy.get('.recharts-tooltip-label').should('contain', 'Sep 30');
      cy.get('.recharts-tooltip-item').should('contain', 'count : 0');
*/
   
    })

    it('navigates to the Products section', () => {

        cy.contains('Dashboard').click();
        cy.contains('All products').click();
        cy.get('.page-heading').should('contain', 'Products');

    })

})