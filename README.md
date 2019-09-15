
## Description

A group of house owners and managers (intermediaries) came together raising funds to build a booking and house-renting 
web application. Such a system is currently lacking a backend application; a way to manage the houses that it displays, 
as well as the very same owners and manager who will, in fact, become the users of that missing app.

You have been hired to design and code said application, making sure that it complies with the following requirements:

1. The app must be secure; no access is allowed to unregistered users
2. The app must show a list of houses associated with the currently authenticated user, as the user represents an 
owner/manager
3. There must be an option to add new houses, which will be saved associated with the authenticated user
4. There must be an option to edit existing houses
5. There must be an option to delete existing houses
    * This option must request for confirmation before executing the operation

### Frontend

The frontend portion of this system is an [Angular](https://angular.io) application integrated with a free bootstrap
administration template called [CoreUI](https://coreui.io/angular). The bootstrap template enabled the use of several ui
components such as alerts, modals, tables and more. The logic and structure of it was, however, customized to meet
business related requirements.

The Angular's most used elements where:
* Guards
* Services
* Components
* Modules

### Backend
 
The backend is a Node application with interaction with a MySQL database (script is included), but coded from the 
[Nest](https://github.com/nestjs/nest) framework point of view. Nest is a Typescript based framework built on top of 
Node, that comes with the most commonly used tools in Node's world out of the box and configured in a way that is easy to
use and understand. The most interesting side of this framework is that it is based in Angular so it resembles a lot to 
it in structure and concepts.

The Nest's most used elements where:
* Guards
* Controllers
* Services
* Modules
* Express server to host the app
* Passport library to assemble the authentication and api querying strategies
* TypeORM to interact with the MySQL database from a POO perspective  

## Installation guide

1. Install NodeJS (version >= 6.9) from here `https://nodejs.org/en/download/` .
2. Install Angular CLI globally by typing `npm install -g @angular/cli` in the console.
3. Clone the project from `https://github.com/manytostao/standard-rent-system.git`
4. Navigate to the root of the client application directory. Open the console from there and type 
    `npm install` to install all needed dependencies.
5. Navigate to the root of the server application directory. Open the console from there and type 
    `npm install` to install all needed dependencies.
6. Run the provided database sql script called `standard-rent-system.sql` on your database.

## Running the app

1. Navigate to the root of the client application directory. Open the console from there and type 
    `npm run start` to bring up the Angular's development .
2. Navigate to the root of the server application directory. Open the console from there and type 
    `npm install` to install all needed dependencies.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
