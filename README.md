[![Build Status](https://travis-ci.com/Moise1/MyDiary.svg?branch=develop)](https://travis-ci.com/Moise1/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/Moise1/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/Moise1/MyDiary?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/3ac9c5c692eb1267158b/maintainability)](https://codeclimate.com/github/Moise1/MyDiary/maintainability)

# MyDiary 

[My Diary](https://moise1.github.io/MyDiary/UI/) is an online journal where users can pen down their thoughts and feelings. 


## UX/UI Required Features 

1. Users can create an account.
2. User can sign in.
3. Users can view all entries to their diary.
4. Users can view the contents of a diary entry.
5. Users can add entry.
6. Users can modify an entry.
7. Users can delete an entry 

## Used Technologies 

HTML, CSS, & JavaScript



### Prerequisites 
You must have the following tools installed in order to run this project: <br/>

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git): A distributed version control tool 
* [NodeJS](https://nodejs.org/en/): A  JavaScript runtime environment<br/>
* [Express](https://expressjs.com/): A web application framework for NodeJS <br/>
* [ESLint](https://eslint.org/): A JavaScript linting library <br/>
* [Airbnb](https://github.com/airbnb/javascript): A populr style guide<br/>
* [Mocha](https://mochajs.org/) or [Jasmine](https://jasmine.github.io/): Testing frameworks

### A glance at API-endpoints 

#### Required API Endpoints.


| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| POST  | /api/v1/auth/signup  |    User sign up             | User
| POST  | /api/v1/auth/signin  |  User login             | User
| POST  | /api/v1/entries  |  Add a new entry             | User
| GET  | /api/v1/entries  |  Get all entries             | User
| GET  | /api/v1/entries/:entry_id  |  Get a single entry             | User
| PATCH  | /api/v1/entries/:entry_id  |  Update a single entry             | User
| DELETE  | /api/v1/entries/entry_id  |  Delete a single entry             | User



To get the code in this repo and customize it to suit your needs, do the following:<br/> 

```
git clone https://github.com/Moise1/MyDiary.git
cd MyDiary
npm install

```
### Important scripts 

Start developer server 

`npm start`

Run tests 

`npm test`



## Author 

[Moise1](https://github.com/Moise1)