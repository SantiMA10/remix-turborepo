# 💿 expenses-app

This is a [remix](https://remix.run/) project bootstrapped with `create-remix`.

Since it depends on other packages in this repo, if you want to know more read the main: `README.md`.

## Project structure

- `app` contains all the source code. [Remix Conventions]
  - `app/components` contains all components used in the app.
  - `app/data` contains a wrapper for accessing the data, we need this to tell Remix to not load the code in the browser.
  - `app/routes` contains the routes for app. [Remix Conventions]
  - `app/styles` contains all the css files.
- `public` contains all the static files. [Remix Conventions]
- `server` contains the express server, this server is used to serve the Remix App. [Remix Conventions]
- `tests` contains all the test for this project
  - `tests/unit` this folder uses the same structure as `src` and contains all the unit tests.
  - `jest.setup.ts` this file adds the testing library matchers.