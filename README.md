# 💿🚀 Remix + turborepo [![Deploy](https://github.com/SantiMA10/remix-turborepo/actions/workflows/deploy.yml/badge.svg)](https://github.com/SantiMA10/remix-turborepo/actions/workflows/deploy.yml)

This is a [remix](https://remix.run/) project bootstrapped with `create-remix`. This project is a monorepo managed with [turborepo](https://turborepo.org/). 

## Project structure

- `.github/workflows` contains the configuration to lint, test and build the repo on each merge with the main branch using GitHub Actions.
- [`apps/expenses-app`](./apps/expenses-app/README.md) contains the remix project.
- `packages` contains different packages with each of the architecture layers
  - [`packages/expenses-app-domain`](./packages/expenses-app-domain/README.md) contains the business entities and rules
  - [`packages/expenses-app-data`](./packages/expenses-app-data/README.md) contains the implementations for accessing "real" data
  
# Getting Started

## 💻 Development

First, run the development server:

```bash
yarn install

yarn start:dev
```

## 🧪 Testing

```bash
yarn install

yarn test
```

## ⚠️ Production

```bash
yarn install

yarn start:prod
yarn start // alias for yarn start:prod
```

### 🐳 with docker

```bash
yarn docker:start // start the app using docker and docker-compose in http://localhost:3000
yarn docker:stop // stop the docker app
```

