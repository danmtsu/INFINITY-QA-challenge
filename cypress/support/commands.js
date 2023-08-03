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

