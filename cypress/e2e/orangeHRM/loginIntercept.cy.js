/// <reference types= "cypress"/>

const { action } = require("commander");

describe('login feature ',() => {
    it('User login with Valid credentials',() =>{   
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionSummary");
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.wait("@actionSummary");
        cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
    })

    describe('login with blank username and password', () => {
        it('should have a validation', () => {
            cy.login(' ',' ');
            cy.checkRequiredUsernamePassword();
        });
    });


} )
