beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.intercept('GET', '**/web/index.php/directory/viewDirectory').as('getDirectory');
    cy.get('[href="/web/index.php/directory/viewDirectory"]').click();
});

it('Should allow adding a new user', () => {
    cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary').contains('Add').click();
    cy.get('.oxd-dialog').should('be.visible');
    cy.get('[name="systemUser[employeeName][empName]"]').type('John Smith');
    cy.get('[name="systemUser[userName]"]').type('johnsmith');
    cy.get('[name="systemUser[password]"]').type('Password123!');
    cy.get('[name="systemUser[confirmPassword]"]').type('Password123!');
    cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').contains('Save').click();
    cy.get('.oxd-table-body').contains('johnsmith').should('be.visible');
});

it('Should allow resetting the search form', () => {
    cy.get('[placeholder="Type for hints..."]').type('Linda');
    cy.get('[type="submit"]').click();
    cy.get('.oxd-grid-4.orangehrm-directory-grid-item').should('have.length.greaterThan', 0);
    cy.get('[type="reset"]').click();
    cy.get('[placeholder="Type for hints..."]').should('have.value', '');
});

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('Admin'); // Use valid credentials for login
        cy.get('[name="password"]').type('admin123');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.intercept('GET', '**/web/index.php/admin/viewSystemUsers').as('getSystemUsers');
        cy.get('[href="/web/index.php/admin/viewSystemUsers"]').click();

    });
    it('Should allow searching for a user', () => {
        cy.get('[name="searchSystemUser[userName]"]').type('Admin');
        cy.get('[type="submit"]').click();
        cy.get('.oxd-table-body').find('.oxd-table-row').should('have.length.greaterThan', 0);
    });
    it('Should allow deleting a user', () => {
        cy.get('[name="searchSystemUser[userName]"]').type('johnsmith');
        cy.get('[type="submit"]').click();
        cy.get('.oxd-table-body').find('.oxd-table-row').should('have.length.greaterThan', 0);
        cy.get('.oxd-table-body').contains('johnsmith').parents('.oxd-table-row').find('.oxd-checkbox-wrapper').click();
        cy.get('.oxd-button.oxd-button--medium.oxd-button--label-danger').contains('Delete').click();
        cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').contains('Yes, Delete').click();
        cy.get('.oxd-table-body').contains('johnsmith').should('not.exist');
    });


