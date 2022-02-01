# 💿🚀 Remix + turborepo [![Deploy](https://github.com/SantiMA10/remix-turborepo/actions/workflows/deploy.yml/badge.svg)](https://github.com/SantiMA10/remix-turborepo/actions/workflows/deploy.yml)

This is a [remix](https://remix.run/) project bootstrapped with `create-remix`. This project is a monorepo managed with [turborepo](https://turborepo.org/). 

# Project structure

- `.github/workflows` contains the configuration to lint, test and build the repo on each merge with the main branch using GitHub Actions.
- `apps/expenses-app` contains the remix project.
- `packages` contains different packages with each of the architecture layers
  - `packages/entities` contains all the entities of application
  - `packages/use-cases` contains the application business rules
  - `packages/data` contains the implementations for accessing "real" data
  
# Getting Started

## Development

First, run the development server:

```bash
yarn install

yarn start:dev
```

## Testing

```bash
yarn install

yarn test
```

