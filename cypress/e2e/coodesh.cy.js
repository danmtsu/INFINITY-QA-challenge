describe('template spec', () => {
  it('login', () => {

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
    cy.contains('Esqueceu sua senha?').should('be.visible').wait(5000)    
  })
})