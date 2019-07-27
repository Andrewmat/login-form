# Login form

Simple login form that validates using mocked values, and presents a list of things

## How to run

First of all, setup the project

```text
git clone git@github.com:Andrewmat/login-form.git
yarn install
```

To use it in development mode, run `yarn start`

To use it in production mode, run:

```text
yarn build
npx serve -s build
```

## Under the hood

This project was bootstraped from [create-react-app](https://github.com/facebook/create-react-app) and ejected.

It uses mostly React hooks

It uses Prettier to ease code styling

I opted to not use Redux, since it is a simple application that did not need for a global state management library

**TODO**
