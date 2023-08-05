import '../support/commands'



describe('login Forms', () => {
  it('invalid_login', () => {

    cy.visit('https://beta.coodesh.com/')
    cy.contains('Faça login').should('be.visible')
    cy.cookiesClosed()
    //verificando o cabeçalho
    cy.get('#menu-button-5').should('be.visible')
    cy.get('img[title="Coodesh: Avalie habilidades de programação com desafios do mundo real"]').should('be.visible')
    cy.get('.css-ho5z4q > .chakra-stack > .chakra-button').should('be.visible')
    cy.get('#menu-button-5').click().wait(250)
    cy.get('#menu-list-5').should('be.visible')
    cy.contains('p','Idiomas').should('be.visible')
    cy.get('button[value="pt"]').should('have.focus')
    cy.get('button[value="pt"]').should('have.attr', 'aria-checked','true')
    cy.get('button[value="en"]').should('be.visible')
    cy.get('button[value="es"]').should('be.visible')
    
    //verificando o formulário
    cy.get('#field-6').should('be.visible')
    cy.get('#field-6').should('have.attr','aria-required','true')
    cy.get('#field-6').click()
    cy.get('#field-7').should('be.visible')
    cy.get('#field-7').should('have.attr','aria-required','true')
    cy.get('#field-7').click()
    cy.get('#field-6').should('have.attr','aria-invalid','true')
    cy.get('#field-6-feedback').contains('Este campo é obrigatório').should('be.visible')
    cy.get('#field-6').type('toLegalNão')
    cy.get('#field-7').should('have.attr','aria-invalid','true')
    cy.get('#field-7-feedback').contains('Este campo é obrigatório').should('be.visible')
    cy.get('#field-7').type('SisoDoKrai')
    cy.get('#field-6-feedback').contains('Deve ser um email válido').should('be.visible')
    cy.get('button[aria-label="showPasswordIcon"]').should('be.visible')
    cy.get('button[aria-label="showPasswordIcon"]').click()
    cy.get('button[type="submit"]').contains('Entrar').click()
    cy.get('#field-6').type('forestGump@a.com')
    cy.get('#field-7').should('have.attr','type','text')
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      
      return false
    })
    cy.intercept('POST', 'https://api.beta.coodesh.com/auth/signin', {
      statusCode: 400,
      body: {
        type: 'SIGNIN_USER_ERROR',
        payload: {
          message: 'Usuário não encontrado',
          status: 400,
        },
      },
    }).as('signinRequest');
    cy.get('button[type="submit"]').contains('Entrar').click().wait('@signinRequest')
    cy.contains('Esqueceu sua senha?').should('be.visible')    
  }),


  it('signup_onboardingForms_Successfull',()=>{
    cy.visit('https://beta.coodesh.com/auth/signup/users')
    cy.signUpNewUser();
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
    cy.get('#react-select-4-input').should('have.attr','aria-autocomplete','list')
    cy.get('#react-select-4-input').type('Python',{force:true}).wait(500).type('{downarrow} {enter}',{force:true})
    cy.contains('Busco oportunidades para iniciar o trabalho imediatamente').should('be.visible')
    //cy.get('#preferences.job_search').should('have.attr','mode','single')
    cy.contains('button','Próximo').click({force:true})
    cy.get('input[controlid="address.city"]').should('have.attr','class','form-control');

    cy.getUserList().then((userList)=>{
      var firstUser = userList[0]
      cy.get("#displayName").should('have.attr','value',`@#! ${firstUser.name}`)
      cy.get('#displayName').clear().type(`${firstUser.name}`);
      cy.get('input[type="tel"]').should('have.attr','class','is-invalid form-control');
      cy.get('input[controlid="address.city"]').click({force:true});
      cy.get('input[type="tel"]').type(`199 ${firstUser.phone}`);
      cy.get('input[controlid="address.city"]').should('have.attr','class','form-control is-invalid'); // campo sem validação nenhuma e não muda de classe quando tentamos enviar o form com esse input vazio, só quando clicamos nela e em outro campo e o input se encontra vazio
      cy.get('input[controlid="address.city"]').type(`${firstUser.country}`);
      cy.get('[id="notifications.whatsapp_notification.update_applicant"]').should('have.attr','value','0');
      cy.get('[id="notifications.whatsapp_notification.update_applicant"]').click({force:true})
      cy.get('[id="preferences.other_cities"]').should('have.attr','value','0')// valores desse input não são alterados mesmo depois de clicar
      cy.get('[id="notifications.whatsapp_notification.update_applicant"]').should('have.attr','value','0');
      cy.get('#home-office-integral').click({force:true});
      cy.contains('button','Próximo').click({force:true});
      cy.url().should('eq','https://beta.coodesh.com/onboarding/developer/personal')
      cy.get('.mt-3.col > .col-12 > .react-select > .css-yk16xz-control > .css-13tza3w').click({force:true}).wait(500)
      cy.contains('EBAC').click({force:true})
      cy.contains('span','Rocketseat').click({force:true})
      cy.get('#communities-0-relation').should('have.attr','placeholder','Selecione a relação com a comunidade')
      cy.contains('span','Trybe').click({force:true})
      cy.get('#communities-1-relation').should('have.attr','placeholder','Selecione a relação com a comunidade')
      cy.get('#communities-0-relation').select('enthusiast')
      cy.get('#communities-2-relation').should('have.attr','placeholder','Selecione a relação com a comunidade')
      cy.get('#communities-1-relation').select('former_student')
      cy.get('#communities-2-relation').select('studying')
      cy.get('.col-lg-12 > .react-select > .css-yk16xz-control > .css-13tza3w').click({force:true})
      cy.contains('Saúde').click({force:true})
      cy.get('#race').select('indigenous')
      cy.get('#gender').select('nobinary')
      cy.get('#sexual_orientation').select('heterosexual')
      cy.get('[id="disabilities.type"]').select('Intelectual')
      cy.get('[id="disabilities.description"]').type('<h1>só pra testar uma paradinha aqui</h1>')
      cy.get('[id="disabilities.cid"]').type('<button style="background-color: red;">danger?</button>')
      cy.contains('button', 'Próximo').click({ force: true });

      cy.url().should('eq', 'https://beta.coodesh.com/onboarding/developer/scorecard-intro');
      cy.intercept('GET','https://api.beta.coodesh.com/lists/companies_dashboard').as('companiesRequest')
      cy.wait('@companiesRequest')      
      cy.contains('Responder agora').click({force:true})
      cy.url().should('include','/skills?origin=onboarding').wait(5000)

      cy.get(':nth-child(5) > td > .rc-slider > .rc-slider-step > [style="width: 4px; height: 18px; border-radius: 0px; transform: translateY(9px); left: 66.6667%;"]').click({force:true}).wait(5000)
      cy.contains('button','Próximo').click({force:true}).wait(5000)
      cy.get(':nth-child(5) > td > .rc-slider > .rc-slider-step > [style="width: 4px; height: 18px; border-radius: 0px; transform: translateY(9px); left: 33.3333%;"]').click({force:true})
      cy.get(':nth-child(3) > td > .rc-slider > .rc-slider-step > [style="width: 4px; height: 18px; border-radius: 0px; transform: translateY(9px); left: 100%;"]').click({force:true})
      cy.contains('Enviar').click({force:true}).wait(5000)
      cy.url().should('eq','https://beta.coodesh.com/onboarding/developer/curriculum').wait(5000)
      cy.intercept('GET','https://api.beta.coodesh.com/fields/users').as('curriculumLoad')
      cy.get('.space-bottom-2 > :nth-child(1) > .col-lg-3').contains('QA / Testes').should('be.visible')
      cy.get('.styles_skillsPrint___oa3j > :nth-child(2)').contains('p','GIT').should('be.visible')
      cy.get('.styles_skillsPrint___oa3j > :nth-child(2)').contains('small','Praticante')
      cy.get('.space-bottom-2 > :nth-child(1) > .col-lg-3').contains(`55199${firstUser.phone}`.slice(0,-2).replace(/\D/g,''))
      cy.get('.space-bottom-2 > :nth-child(1) > .col-lg-3').contains(`${firstUser.email}`)
      cy.get('.styles_skillsPrint___oa3j > :nth-child(1)').contains('p','Unit Tests').should('be.visible')
      cy.get('.styles_skillsPrint___oa3j > :nth-child(1)').contains('small','Avançado')
      cy.get('.styles_skillsPrint___oa3j > :nth-child(3)').contains('p','Automação de Testes')
      cy.get('.styles_skillsPrint___oa3j > :nth-child(3)').contains('small','Básico')

      cy.contains('Concluir').click({force:true}).wait(1000)
      cy.get('.u-hamburger').click({force:true}).wait(1000)
      cy.contains('span','Meu Painel').click({force:true})
      cy.url().should('eq','https://beta.coodesh.com/dashboard')
      cy.contains('button','Responder agora').click({force:true}).wait(2000)
      cy.url().should('include','https://beta.coodesh.com/disc/').wait(1000)
      cy.contains('button', 'Iniciar').click({force:true})
      cy.get('button[class="btn-wide btn btn-secondary"]').should('be.visible').click({multiple:true})
      cy.contains('button','Próximo').click({force:true})
      cy.get('button[class="btn-wide btn btn-secondary"]').should('be.visible').click({multiple:true})
      cy.contains('button','Enviar').click({force:true}).wait(10000)
      cy.contains('Fechar').click({multiple:true})
      cy.get('.u-hamburger').click({force:true}).wait(1000)
      cy.contains('span','Minha conta').click({force:true})
      cy.contains('span','Meu Painel').click({force:true}).wait(10000)



      
    })
  }),


  it('user_signup', ()=>{
    cy.visit('https://beta.coodesh.com/auth/signup/users')
    cy.cookiesClosed()
    // verificando componentes e comportamento dos respectivos
    cy.get('#tabs-12--tab-0').should('have.attr','aria-selected','true');
    cy.contains('p','Google').should('be.visible');
    cy.contains('h1','Cadastre-se').should('be.visible');
    cy.get('#field-6').should('have.attr','aria-required','true').click();
    cy.get('#field-6-label').within(()=>{
      cy.get('span[role="presentation"]').should('have.text','*')
    });
    cy.get('#field-7').should('have.attr','aria-required','true').click();
    cy.get('#field-6').should('have.attr','aria-invalid','true');
    cy.get('#field-6-feedback').should('have.text','Este campo é obrigatório');
    cy.get('#field-8').should('have.attr','aria-required','true').click();
    cy.get('#field-7').should('have.attr','aria-invalid','true');
    cy.get('#field-7-feedback').should('have.text','Este campo é obrigatório');
    cy.contains('button','Inscreva-se').click();
    cy.get('#field-8').should('have.attr','aria-invalid','true');
    cy.get('#field-8-feedback').should('have.text','Este campo é obrigatório');
    cy.get('label[for="privacy-gpdr"]').each($div=>{
      cy.wrap($div).within(()=>{
          cy.contains('a','Política de Privacidade').should('have.attr','href','/privacy');
          cy.contains('a','Termos e Condições de uso').should('have.attr','href','/terms');
  
      })
    });
    cy.contains('button','Inscreva-se').click();
    cy.get("#privacy-gpdr").should('have.attr','value','false');
    cy.get("#privacy-gpdr").click({force:true});
    cy.get("#privacy-gpdr").should('have.attr','value','true');
    cy.get('#field-6').type(`@#! lima maria`,);
    cy.get('#field-7').type(`liminhamariaAbraba`);
    cy.get('#field-7-feedback').should('have.text','Deve ser um email válido');
    cy.get('#field-8').type(`blablabla`);
    cy.contains('Inscreva-se').click({force:true});
    cy.get('#field-8-feedback').should('have.text','Deve conter no mínimo 8 caracteres, 1 número, 1 maiúscula e 1 caractere especial');
    //cy.get('#field-6').clear();
    cy.getUserList().then((userList)=>{
      const firstUser = userList[0]
      cy.get('#field-7').clear().type(`${firstUser.email}`)
      cy.get('#field-8').clear().type('Infinity$7')
      cy.contains('Inscreva-se').click({force:true});

    })
    cy.getRandomUserData().then((userData)=>{
      const user = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        country: userData.country,
        phone: userData.phone,
      };
      cy.addUserToList(user);
      cy.get('#field-6').clear().type(`@#! ${user.name}`,); // só pra mostrar que não tem velidação no input de Nome completo
      cy.get('#field-7').clear().type(`${user.email}`);
      cy.get('#field-8').clear().type(`${user.password}`,{ parseSpecialCharSequences: false });
      cy.intercept('GET','https://api.beta.coodesh.com/lists/companies_dashboard').as('signupRequest')
      cy.contains('Inscreva-se').click({force:true}).wait('@signupRequest');
      cy.url().should('eq','https://beta.coodesh.com/onboarding/developer/profile');
    })
  })

/*
  it('login_404_successful',()=>{
    cy.visit('https://beta.coodesh.com/dashboard')
    cy.cookiesClosed()
    cy.getUserList().then((userList) => {
      const firstUser = userList[0];
      cy.get('#field-6').type(`${firstUser.email}`)
      cy.get('#field-7').type(`${firstUser.password}`)
      cy.intercept('GET','https://api.beta.coodesh.com/lists/companies_dashboard').as('loginRequest')
      cy.contains('Entrar').click({force:true}).wait('@loginRequest');
      cy.url().should('eq','https://beta.coodesh.com/auth/null');
      cy.get('.css-18bz5nv > .chakra-button').should('be.visible').click({force:true})
      cy.get('#nav-item').each($div=>{
        cy.wrap($div).within(()=>{
            cy.get('a[href="/dashboard"]').within(()=>{
              cy.contains('span','Meu Painel').should('be.visible')
            });
            cy.get('a[href="/account"]').within(()=>{
              cy.contains('span','Minha conta').should('be.visible')
            });
            cy.get('a[href="/dashboard/applicants"]').within(()=>{
              cy.contains('span','Candidaturas').should('be.visible')
            });
            cy.get('a[href="/assessments"]').within(()=>{
              cy.contains('span','Avaliações').should('be.visible')
            });
            cy.get('a[href="/dashboard/resources"]').within(()=>{
              cy.contains('span','Recursos').should('be.visible')
            });
            cy.get('a[href="/assessments/review"]').within(()=>{
              cy.contains('span','Solicitar Correção').should('be.visible')
            });
            

        })
      });

      
    })
  })*/
})