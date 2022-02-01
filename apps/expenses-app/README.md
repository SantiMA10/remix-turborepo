# 💿 expenses-app

This is a [remix](https://remix.run/) project bootstrapped with `create-remix`.

Since it depends on other packages in this repo, if you want to know more read the main: `README.md`.

# Deploying to vercel

Due to this bug with [vercel and monorepos](https://github.com/remix-run/remix/issues/1398), this project disables dependency hoisting by adding the configuration in the `package.json`, otherwise, it does not run on vercel platform.