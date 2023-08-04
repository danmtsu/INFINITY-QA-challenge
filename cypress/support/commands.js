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
