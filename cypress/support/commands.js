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

Cypress.Commands.add('searchJob',(nomeEmpresa)=>{
  cy.visit('https://beta.coodesh.com/jobs')
  cy.get('button[type="submit"]').contains('Limpar').click({force:true})
  cy.get('#filter-categories').click({force:true}).should('have.attr','aria-expanded','true')
  cy.get('#qa').click({force:true})
  cy.get('button[type="submit"]').contains('Buscar').click({force:true})
  cy.url().should('include','/jobs?categories=qa')
  cy.get('button[type="submit"]').contains('Limpar').click({force:true})
  cy.get('.col-lg-7 > .input-group > .form-control').type(`${nomeEmpresa}`)
  cy.get('button[type="submit"]').contains('Buscar').click({force:true})
  cy.get('.col-lg-7 > .input-group > .form-control').invoke('val').should('include',`${nomeEmpresa}`)
})


Cypress.Commands.add('completeOnboardingForms',(cell,city)=>{
  cy.url().should('eq','https://beta.coodesh.com/onboarding/developer/profile')
  cy.contains('h1','Onboarding').should('be.visible')
  cy.get("#career-frontend").should('have.attr','type','radio')
  cy.get("#career-backend").should('have.attr','type','radio')
  cy.get("#career-fullstack").should('have.attr','type','radio')
  cy.get("#career-mobile").should('have.attr','type','radio')
  cy.get("#career-devops").should('have.attr','type','radio')
  cy.get("#career-datascience").should('have.attr','type','radio')
  cy.get("#career-qa").should('have.attr','type','radio')
  cy.get("#career-db").should('have.attr','type','radio')
  cy.get("#career-cto").should('have.attr','type','radio')
  cy.get("#career-po").should('have.attr','type','radio')
  cy.get("#career-pm").should('have.attr','type','radio')
  cy.get("#career-design_ui").should('have.attr','type','radio')
  cy.get('#career-frontend').dblclick({force:true})
  cy.get('#career-backend').dblclick({force:true})
  cy.get("#career-qa").click({force:true})
  cy.get('#home-office-integral').click({force:true});
  cy.contains('Busco oportunidades para iniciar o trabalho imediatamente').should('be.visible')
  cy.contains('button','Próximo').click({force:true})
  cy.get('input[controlid="address.city"]').should('have.attr','class','form-control');
  cy.get('input[type="tel"]').type(`199 ${cell}`);
  cy.get('input[controlid="address.city"]').type(`${city}`);
  cy.contains('button','Próximo').click({force:true});
  cy.url().should('eq','https://beta.coodesh.com/onboarding/developer/personal');
  cy.get('.mt-3.col > .col-12 > .react-select > .css-yk16xz-control > .css-13tza3w').click({force:true}).wait(500);
  cy.contains('EBAC').click({force:true});
  cy.contains('span','Rocketseat').click({force:true});
  cy.get('#communities-0-relation').should('have.attr','placeholder','Selecione a relação com a comunidade');
  cy.contains('span','Trybe').click({force:true});
  cy.get('#communities-1-relation').should('have.attr','placeholder','Selecione a relação com a comunidade');
  cy.get('#communities-0-relation').select('enthusiast');
  cy.get('#communities-2-relation').should('have.attr','placeholder','Selecione a relação com a comunidade');
  cy.get('#communities-1-relation').select('former_student');
  cy.get('#communities-2-relation').select('studying');
  cy.get('.col-lg-12 > .react-select > .css-yk16xz-control > .css-13tza3w').click({force:true});
  cy.contains('Saúde').click({force:true});
  cy.get('#race').select('indigenous');
  cy.get('#gender').select('nobinary');
  cy.get('#sexual_orientation').select('heterosexual');
  cy.contains('button', 'Próximo').click({ force: true });
  cy.url().should('eq', 'https://beta.coodesh.com/onboarding/developer/scorecard-intro');
  cy.intercept('GET','https://api.beta.coodesh.com/lists/companies_dashboard').as('companiesRequest')
  cy.wait('@companiesRequest')
  cy.contains('Responder agora').should('be.visible').click({force:true})      
  //cy.url().should('include','/skills?origin=onboarding').wait(3000)
  cy.get(':nth-child(5) > td > .rc-slider > .rc-slider-step > [style="width: 4px; height: 18px; border-radius: 0px; transform: translateY(9px); left: 66.6667%;"]').click({force:true}).wait(500)
  cy.contains('button','Próximo').click({force:true}).wait(3000)
  cy.get(':nth-child(5) > td > .rc-slider > .rc-slider-step > [style="width: 4px; height: 18px; border-radius: 0px; transform: translateY(9px); left: 33.3333%;"]').click({force:true})
  cy.get(':nth-child(3) > td > .rc-slider > .rc-slider-step > [style="width: 4px; height: 18px; border-radius: 0px; transform: translateY(9px); left: 100%;"]').click({force:true})
  cy.intercept('GET','https://api.beta.coodesh.com/fields/users').as('curriculumLoad')
  cy.contains('Enviar').click({force:true}).wait('@curriculumLoad')
  cy.url().should('eq','https://beta.coodesh.com/onboarding/developer/curriculum')
});



Cypress.Commands.add('softSkillsForms', (softSkillsArray1, softSkillsArray2) => {
  cy.get('.u-hamburger').click({ force: true }).wait(500);
  cy.contains('span', 'Minha conta').click({ force: true });
  cy.url().should('eq', 'https://beta.coodesh.com/account');
  cy.contains('span', 'Soft Skills').should('be.visible').click({ force: true });
  cy.url().should('eq', 'https://beta.coodesh.com/dashboard/soft-skills').wait(500);
  cy.contains('a','Responder agora').click({force:true});
  cy.url().should('include','https://beta.coodesh.com/disc');
  cy.contains('button','Iniciar').click({force:true})
  cy.url().should('include','/self');

  // Percorre o primeiro array de soft skills e clica em cada um
  softSkillsArray1.forEach((softSkill) => {
    cy.contains('button', softSkill).should('be.visible').click({ force: true });
    // Aqui você pode adicionar as verificações ou ações adicionais para cada soft skill
  });
  cy.contains('button','Próximo').should('be.visible').click({force:true});
  cy.url().should('include','/others');
  // Percorre o segundo array de soft skills e clica em cada um
  softSkillsArray2.forEach((softSkill) => {
    cy.contains('button', softSkill).should('be.visible').click({ force: true });
    // Aqui você pode adicionar as verificações ou ações adicionais para cada soft skill
  });


  cy.contains('button','Enviar').should('be.visible').click({force:true});
  cy.url().should('include','/thank-you')
  cy.contains('a','Fechar').should('be.visible').click({force:true})
});
