import '../support/commands'

describe('login Forms', () => {
  it('invalid_login', () => {

    cy.visit('https://beta.coodesh.com/')
    cy.contains('Faça login').should('be.visible').wait(5000)
    cy.window().then((win) => {
      // Encontrar o botão de aceitar cookies usando JavaScript nativo
      const btnAceitarCookies = win.document.querySelector('#onetrust-accept-btn-handler') // Substitua pelo seletor correto do botão

      // Verificar se o botão de aceitar cookies foi encontrado corretamente
      if (btnAceitarCookies) {
        btnAceitarCookies.click()

      } else {
       cy.log('O botão de aceitar cookies não foi encontrado.')
      }
    })
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
    cy.get('button[type="submit"]').contains('Entrar').click()
    cy.contains('Esqueceu sua senha?').should('be.visible')    
  }),
  it('user_signup', ()=>{
    cy.visit('https://beta.coodesh.com/auth/signup/users').wait(5000)
    cy.window().then((win) => {
      // Encontrar o botão de aceitar cookies usando JavaScript nativo
      const btnAceitarCookies = win.document.querySelector('#onetrust-accept-btn-handler') // Substitua pelo seletor correto do botão

      // Verificar se o botão de aceitar cookies foi encontrado corretamente
      if (btnAceitarCookies) {
        btnAceitarCookies.click()

      } else {
       cy.log('O botão de aceitar cookies não foi encontrado.')
      }
    })
    // verificando componentes e comportamento dos respectivos
    cy.get('#tabs-12--tab-0').should('have.attr','aria-selected','true')
    cy.contains('p','Google').should('be.visible')
    cy.contains('h1','Cadastre-se').should('be.visible')
    cy.get('#field-6').should('have.attr','aria-required','true').click()
    cy.get('#field-6-label').within(()=>{
      cy.get('span[role="presentation"]').should('have.text','*')
    })
    cy.get('#field-7').should('have.attr','aria-required','true').click()
    cy.get('#field-6').should('have.attr','aria-invalid','true')
    cy.get('#field-6-feedback').should('have.text','Este campo é obrigatório')
    cy.get('#field-8').should('have.attr','aria-required','true').click()
    cy.get('#field-7').should('have.attr','aria-invalid','true')
    cy.get('#field-7-feedback').should('have.text','Este campo é obrigatório')
    cy.contains('button','Inscreva-se').click()
    cy.get('#field-8').should('have.attr','aria-invalid','true')
    cy.get('#field-8-feedback').should('have.text','Este campo é obrigatório')
    cy.get('label[for="privacy-gpdr"]').each($div=>{
      cy.wrap($div).within(()=>{
          cy.contains('a','Política de Privacidade').should('have.attr','href','/privacy')
          cy.contains('a','Termos e Condições de uso').should('have.attr','href','/terms')
  
      })
    })
    cy.contains('button','Inscreva-se').click()
    cy.get("#privacy-gpdr").should('have.attr','value','false')
    cy.get("#privacy-gpdr").click({force:true})
    cy.get("#privacy-gpdr").should('have.attr','value','true')
    cy.get('#field-6').type(`@#! lima maria`,)
    cy.get('#field-7').type(`liminhamariaAbraba`)
    cy.get('#field-7-feedback').should('have.text','Deve ser um email válido')
    cy.get('#field-8').type(`blablabla`)
    cy.contains('Inscreva-se').click({force:true})
    cy.get('#field-8-feedback').should('have.text','Deve conter no mínimo 8 caracteres, 1 número, 1 maiúscula e 1 caractere especial')
    cy.get('#field-6').clear()
    cy.getRandomUserData().then((userData)=>{
      const user = {name: userData.name,
      email: userData.email,
      password: userData.password,
      country: userData.country,
      phone: userData.phone}
      cy.get('#field-6').clear().type(`@#! ${user.name}`,)
      cy.get('#field-7').clear().type(`${user.email}`)
      cy.get('#field-8').clear().type(`${user.password}`)
    })
    cy.contains('Inscreva-se').click({force:true})


    




  })
})