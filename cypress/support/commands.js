// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import axios from 'axios';

let userList = [];

Cypress.Commands.add('getRandomUserData', () => {
    return axios
      .get('https://randomuser.me/api/?password=special,upper,lower,number')
      .then((response) => {
        const user = response.data.results[0];
        return {
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          password: user.login.password,
          country: user.location.country,
          phone: user.phone
        };
      });
  });


  // Comando personalizado para adicionar um usuário à lista
Cypress.Commands.add('addUserToList', (user) => {
  userList.push(user);
});

// Comando personalizado para retornar a lista de usuários
Cypress.Commands.add('getUserList', () => {
  return userList;
});


Cypress.Commands.add('cookiesClosed',()=>{
    cy.intercept('GET','https://cdn.cookielaw.org/logos/static/ot_guard_logo.svg').as('cookiesClosed')
    cy.wait('@cookiesClosed').window().then((win) => {
      // Encontrar o botão de aceitar cookies usando JavaScript nativo
      const btnAceitarCookies = win.document.querySelector('#onetrust-accept-btn-handler') // Substitua pelo seletor correto do botão

      // Verificar se o botão de aceitar cookies foi encontrado corretamente
      if (btnAceitarCookies) {
        btnAceitarCookies.click()

      } else {
       cy.log('O botão de aceitar cookies não foi encontrado.')
      }
    })
})

Cypress.Commands.add('signUpNewUser',()=>{
  cy.cookiesClosed()
  cy.getRandomUserData().then((userData)=>{
    const user = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      country: userData.country,
      phone: userData.phone
    };
    cy.addUserToList(user);
    cy.get('#field-6').clear().type(`@#! ${user.name}`,); // só pra mostrar que não tem velidação no input de Nome completo
    cy.get('#field-7').clear().type(`${user.email}`);
    cy.get('#field-8').clear().type(`${user.password}`,{ parseSpecialCharSequences: false });
    cy.intercept('GET','https://api.beta.coodesh.com/lists/companies_dashboard').as('signupRequest')
    cy.get("#privacy-gpdr").click({force:true});
    cy.get("#privacy-gpdr").should('have.attr','value','true');
    cy.contains('Inscreva-se').click({force:true}).wait('@signupRequest');
    cy.url().should('eq','https://beta.coodesh.com/onboarding/developer/profile');
  })
})

Cypress.Commands.add('getIframe',(iframe)=>{
  return cy.get(iframe).its('0.contentDocument.body').should('be.visible').then(cy.wrap)
})