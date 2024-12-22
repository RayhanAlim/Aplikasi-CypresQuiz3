/// <reference types= "cypress"/>

describe('login feature ',() => {
    it('User login with Valid credentials',() =>{   
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
    })

    it('User cannot login with invalid credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text', 'Login');
        cy.get('[name="username"]').type('InvalidUser');
        cy.get('[name="password"]').type('InvalidPass');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
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
        // Assuming there's a confirmation message or redirect
        cy.get('.oxd-alert-content-text').should('have.text', 'Please contact HR admin in order to reset the password');
    });

    it('User can invalid forgot password process', () => {
        cy.get('.orangehrm-login-forgot').click();
        cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text', 'Reset Password');
        cy.get('[name="username"]').type('Adam');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-forgot-password-button"]').click();
        // Assuming there's a confirmation message or redirect
        cy.get('.oxd-alert-content-text').should('have.text', 'Please contact HR admin in order to reset the password');
    });



} )
