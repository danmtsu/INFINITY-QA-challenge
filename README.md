# Projeto de Testes "challange-infinity-base"

## Descrição
Este repositório contém testes automatizados, realizados no site (https://beta.coodesh.com/) ,para o processo seletivo da Infinity Base. Ele utiliza [Cypress](https://www.cypress.io/) como o framework de testes, junto com o plugin [start-server-and-test](https://www.npmjs.com/package/start-server-and-test) para iniciar o servidor e executar os testes.

## Pré-requisitos
Antes de executar os testes, certifique-se de ter o seguinte instalado no seu sistema:

- [Node.js](https://nodejs.org/) (versão recomendada)

## Configuração
1. Clone este repositório para a sua máquina local:

    git clone https://github.com/danmtsu/INFINITY-QA-challenge.git
    cd challange-infinity-base


2. Instale as dependências do projeto:
    npm install



## Como Testar
Para executar os testes, siga estes passos:

1. Execute os testes do Cypress em modo "headless" (sem abrir um navegador):
    npx cypress run

Isso irá executar todos os testes do Cypress em modo de linha de comando e gerar relatórios.

## Execução dos Testes com o Cypress Test Runner (Recomendado)
Se você deseja executar os testes usando o Cypress Test Runner e visualizá-los em um navegador, siga estes passos:

1. Abra o Cypress Test Runner:
    npx cypress open

O Cypress Test Runner será aberto, mostrando uma lista de arquivos de teste. Clique em qualquer arquivo de teste para executar o teste correspondente no navegador.

## Informações Adicionais
- Os testes estão definidos sob o diretório "cypress/e2e".

### Notas
Escolhi o Cypress por ser o único dos frameworks que conhecia para automatização de testes, onde nele já possuo o conhecimento de testar a interface por si só a integração de várias funcionalidades de um sistemas e suas rotas e requisições, além de possuir uma documentação bem completa e de fácil entendimento onde pude recorrer algumas vezes durante o desenvolvimento desses testes.


## Testes presentes:
Todos os testes realizados são voltados a parte de login e preenchimento do perfil, são automatizados e muitas partes são reutilizadas, tendo em vista que alguns dos testes são com base nos Bugs encontrados no sistemas, tendo neles todos os testes obrigatórios pedidos a maioria presente no "signup_and_create_perfil" que é o maior teste no arquivo coodesh.cy.js, que tem o objetivo da criação de um usuário até a o preenchimento completo de seu perfil.

###

