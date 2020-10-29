# Proffy-NLW-02

<p align="center">
    <img alt="Proffy" title="Proffy" src=".github/logo.svg" />
</p>

<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer_and_wrench-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#card_index_dividers-utilização">Utilização</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>


<p align="center">
  <img alt="Proffy" src=".github/design.png" width="100%">
</p>
<p align="center">
  <img alt="Classes" src=".github/classes.png" width="33%">
  <img alt="Form1" src=".github/form1.png" width="33%">
  <img alt="Form2" src=".github/form2.png" width="33%">
</p>

## 🚀 Projeto

O Proffy é uma plataforma de estudos online que ajuda pessoas a encontrarem professores online. 

Essa aplicação foi proposta e desenvolvida durante a **[Next Level Week](https://nextlevelweek.com/)** realizada pela **[@Rocketseat](https://github.com/Rocketseat)** entre os dias 3 e 7 de Agosto de 2020.

O projeto é dividido entre as seguintes partes:


- 📊  **API**
  - Backend da Aplicação. O servidor processa as requisições e retorna os dados em formato JSON.

- 💻  **Web**
  - Frontend. Versão do site para desktop.

- 📱  **Mobile**
  - Versão do site para dispositivos móveis.



## :hammer_and_wrench: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [SQLite](https://www.sqlite.org/index.html)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)



## :card_index_dividers: Utilização


### 📦	Clonando o App:

```bash
# Clonar o repositório
$ git clone https://github.com/Alessandro1918/Proffy-NLW-02
```


### ▶️ Rodando o App:

- 📊  API

```sh
  $ cd backend
  
  # Install dependencies
  $ yarn # or npm install
  
  # Create tables in the database file:
  # (run the "knex:migrate" script from package.json)
  $ yarn knex:migrate # ou npm run knex:migrate
  
  # Start API (run the "dev" script from package.json):
  $ yarn dev # or npm run dev

  # API endpoints
  # Total connections
  $ http://localhost:3333/connections
  # Classes of "Eng. Elétrica" on "Tuesdays" starting at "20:00"
  $ http://localhost:3333/classes?week_day=2&subject=Eng.%20El%C3%A9trica&time=20%3A00
```

- 💻   Web app

```sh
  $ cd web
  
  # Install dependencies
  $ yarn # or npm install
  
  # Running web app
  $ yarn start # or npm start

  # Adress
  $ http://localhost:3000
```

- 📱  Mobile app

```sh
  $ cd mobile
  
  # Install dependencies
  $ yarn # or npm install
  
  # Running mobile app
  $ yarn start # or npm start
```



## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
