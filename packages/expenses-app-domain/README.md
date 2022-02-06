# 🧠 expenses-app-domain

## Project structure

- `src` contains all the source code.
  - `src/entities` contains all the domain entities: Expense, ExpenseGroup...
  - `src/repositories` contains all the needed interfaces to access the data.
  - `src/use-cases` contains actions that can be performance in the domain.
  - `src/utils` a few types to define a common error interface.
- `tests` contains all the test for this project
  - `tests/builders` contains a few helpers to build entities with fake data.
  - `tests/mocks` contains a fake implementation for all the needed repositories.
  - `tests/unit` this folder uses the same structure as `src` and contains all the unit tests.
