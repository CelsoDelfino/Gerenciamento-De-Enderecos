Gerenciamento de Endereços

* A aplicação permite que o usuário faça:
  - listagem de usuarios cadastrados
  - adicionar usuários de acordo com o CEP inserido (caso seja válido)
  - remover usuários
  - editar usuários acordo com o CEP inserido (caso seja válido)
 
Tecnologias utilizadas

* Backend
  - Linguagem Java 17
  - SpringBoot 3.3.6
  - JPA
  - MySQL

* Frontend
  - React JS
  - Bootstrap
  - Axios
  - React Router

 
Instruções para rodar o projeto

1. Clonar o projeto
2. Utilizando algum client MySQL rodar o script abaixo para criação do database
---------------------------------------
CREATE DATABASE GerenciamentoEnderecoDB;
----------------------------------------
*BACKEND
3. Startar o projeto backend (Java)
  - essa ação irá ligar o servidor
  - construir as tabelas necessárias do projeto
  - construir nossas colunas que serão utilizadas no projeto

*FRONTEND
4. rodar os scripts abaixo para instalação das dependências necessárias
  - npm i react-router-dom
  - npm i bootstrap
  - npm i axios
  - npm i webpack-dev-server webpack -g
  - npm i

5. Por fim, executar o script abaixo para startar a aplicação frontend
  - npm start




