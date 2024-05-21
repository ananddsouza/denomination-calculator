# DenominationCalculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Project Description

The Denomination Calculator app provides user with a means to enter an amount and get respective Euro denominations.

## Details

The web interface allows user to enter certain amount and returns denominations. If a second amount is entered, the user will also be shown the difference between denominations of the current amount and previous amount.

These calculations can be done on the client side i.e., on browser and also on server side. The user can switch between these calculation modes using the switch provided in the web interface.

For the server side to be working, the Spring Boot application must be in running state. If the user calculates the denominations without the server running, it will simply fail and show an error to the user.

The client application is assumed to be running on `http://localhost:4200/`, and the server application on `http://localhost:8080/`.

## Installation

To run this project, node modules must be installed using the following command.

`npm install`

The subsequent steps are mentioned below.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
