# Login form

Simple login form that validates using mocked values, and presents a list of things

## How to run

First of all, setup the project

```text
git clone git@github.com:Andrewmat/login-form.git
yarn install
```

* Run `yarn start:prod` and access http://localhost:5000
* If you want to check development mode, run `yarn start` and access http://localhost:3000
* To run the test suite, run `yarn test`

You can use the following for login

```
Username: admin
Password: admin
```

For more options, you can access the [users.json](./src/data/users.json) file.

Each user can see a different set of the items list, declared in the [items.json](./src/data/items.json) file

## Contents

In this project, you will find a login form as the main route, and a home page with a list of items, and a query input to filter this list of items.

It uses simple cookies to save user session. No encryption was used to save the user data.

It implements some tests, specifically the `<HomeList />` component and the `useAsync` hook

## Under the hood

This project was bootstraped from [create-react-app](https://github.com/facebook/create-react-app) and ejected.

It uses [Prettier](https://prettier.io) to ease code styling.

It uses mostly [React hooks](https://reactjs.org/docs/hooks-intro.html). Because of it, I opted to not use [Redux](https://redux.js.org/), since it is a simple application that does not have the need for a global state management library.

It uses modulated [SASS](https://sass-lang.com/) files.

It uses [Jest](https://jestjs.io/) as test runner, and Testing Library's [React](https://testing-library.com/docs/react-testing-library/intro) and [React Hooks](https://github.com/testing-library/react-hooks-testing-library) modules as React test helpers.
