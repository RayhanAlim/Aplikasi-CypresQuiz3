/// <reference types= "cypress"/>
import loginPage from "../../../pom/orangeHRM/login/login";

const { action } = require("commander");

describe('login feature ',() => {
    it('User login with Valid credentials',() =>{   
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textlogin().should('have.text','Login');
        loginPage.inputUsername().type ('Admin');
        loginPage.inputPassword(). type('admin123');
        cy.intercept("GET","https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employess/subun").as("actionSummary");
        loginPage.buttonLogin().click();
        cy.wait("@actionSummary").then((intercept) => {
            const item = intercept.response.body.data[2];
            let group1 = item.subunit.name;
        loginPage.verifyMyAction().should('contain.text', group1);
        });
        loginPage.menuDashboard().should('have.text','Dashboard ')
       
    })

    it('User cannot login with invalid credentials', () => {
     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
     loginPage.textlogin().should('have.text','Login');
       loginPage.inputUsername().type ('Empty');
        loqginPage.inputPassword(). type('Epmpty');
        cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
    });

    it('User cannot login with empty username', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text', 'Login');
        cy.get('[name="password"]').type('admin123');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.get('.oxd-alert-content-text').should('have.text', 'Username cannot be empty');
    });

    it('User cannot login with empty password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text', 'Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.get('.oxd-alert-content-text').should ('have.text', 'Password cannot be empty');
    });

    it('User cannot login with invalid input username', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text', 'Login');
        cy.get('[name="username"]').type('arkanfikri');
        cy.get('[name="password"]').type('admin123');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
    });

    it('User cannot login with invalid input password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text', 'Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('kaka');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
    });

    it('User can initiate forgot password process', () => {
        cy.get('.orangehrm-login-forgot').click();
        cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text', 'Reset Password');
        cy.get('[name="username"]').type('Admin');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-forgot-password-button"]').click();
        cy.get('.oxd-alert-content-text').should('have.text', 'Please contact HR admin in order to reset the password');
    });

    it('User can invalid forgot password process', () => {
        cy.get('.orangehrm-login-forgot').click();
        cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text', 'Reset Password');
        cy.get('[name="username"]').type('Adam');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-forgot-password-button"]').click();
       
        cy.get('.oxd-alert-content-text').should('have.text', 'Please contact HR admin in order to reset the password');
    });

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



} )
