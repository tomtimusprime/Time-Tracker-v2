[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](CHANGELOG.md)
[![Build Status](https://travis-ci.com/sdanyalk/auth-project-two.svg?branch=master)](https://travis-ci.com/sdanyalk/auth-project-two)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](license)

# Time Tracker Overview
This is an easy to use time tracker system to allow freelancers or independent contractors to manage their time and  earnings based on their hourly wage. Included in this project is secure login authentication, a page to track clocking in and clocking out and then finally a dashboard that allows the user to see their total hours worked and total earnings. 
---

### Concept/User Story
User Story - 
AS A USER that wants to track their billable hours worked
I WANT TO be able to have a program track all that information for me and allow me to see it at a glance.
SO THAT I can manage my the amount of time I work all in one place.

## Usage

You are more than welcome to use this project as long as you have the permission of the authors: Tom Black, Dee Ann Scanniello, and Joseph Favorito.

---

## Installation

1. Clone this repository.
    ```
    git clone https://github.com/tomtimusprime/Time-Tracker-v2
    ```
1. Navigate into the cloned directory.
    ```
    cd auth-project-two
    ```
1. Install Nodejs dependencies.
    ```
    npm install
    ```
1. Create mysql database using the `schema.sql` file, located below.
    ```
    /db/schema.sql
    ```
1. Update database username and password configuration in `config.json` file, located below.
    ```
    /config/config.json
    ```
1. In the root directory of the project, start the server.
    ```
    node server.js
    ```
1. In your browser navigate to the following page.
    ```
    http://localhost:8080
    ```
---

## NPM Packages

| Package | Documentation |
| ----------- | ----------- |
| `express` | [Express](https://www.npmjs.com/package/express) |
| `express-handlebars` | [Express Handlebars](https://www.npmjs.com/package/express-handlebars) |
| `mysql2` | [Node MySql 2](https://www.npmjs.com/package/mysql2) |
| `sequelize` | [Sequelize](https://www.npmjs.com/package/sequelize) |
| `passport` | [Passport](https://www.npmjs.com/package/passport) |
| `passport-local` | [Passport Local Strategy](https://www.npmjs.com/package/passport-local) |
| `bcrypt` | [BCrypt](https://www.npmjs.com/package/bcrypt) |
| `connect-flash` | [Connect Flash for Express](https://www.npmjs.com/package/connect-flash) |
| `dotenv` | [Dotenv](https://www.npmjs.com/package/dotenv) |

---

## Heroku Deployment

This project is deployed on Heroku. The link to web app is:

[https://time-tracker-v-2.herokuapp.com/](https://time-tracker-v-2.herokuapp.com/)


## Troubleshooting

| Issue | Resolution
| ----------- | ----------- |
| `bcrypt` node package failing to install on Windows 7/10 machines. | From the `bcrypt` documentation, there are extra installations required on Windows OS to make `bcrypt` work. This is listed under the [Dependencies](https://www.npmjs.com/package/bcrypt#dependencies) section. To complete the required Windows dependencies install the tools as mentioned [here](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#microsoft-windows). Complete the previous step in GitBash (run as administrator).|

---

## Issues/Bugs

Please report any bugs [here](https://github.com/tomtimusprime/Time-Tracker-v2/issues).

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
