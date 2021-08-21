# base-express-app-starter

![Release](https://github.com/1i2hs/base-express-app-starter/workflows/Release/badge.svg?branch=main)

A reference project structure for express based application.

## Table of contents

- [Installation](#installation)
- [Start development](#start-development)
- [How to test](#how-to-test)
  - [Unit test](#unit-test)
  - [Integration test](#integration-test)
  - [Load test](#load-test)
- [How to deploy](#how-to-deploy)
- [Linting and Code Formatting](#linting-and-code-formatting)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
  - [lint-staged + husky](#lint-staged-+-husky)
- [Code productivity tool configuration](#code-productivity-tool-configuration)
- [Application configuration](#application-configuration)
- [TBD](#tbd)
- [Dependencies](#dependencies)
- [Development dependencies](#development-dependencies)

## Installation

You can easily setup project with:

```
npx base-express-app-starter <project-name>
```

## Start development

```
cd <project-name>
npm start
```

You can check sample API by making a HTTP GET request with the following URL:

```
http://localhost:3000/api/sample/
```

## How to test

### Unit test

TBD

### Integration test

TBD

### Load test

## How to deploy

### CI/CD pipeline

TBD

### Manual deploy

**NOTE: if you are trying to push a container image to the private repository, please login to repository using docker login first.**

#### docker build

- FOR PRIVATE REPOSITORY:

```
docker build -t <my-private-registry-url>:<version> .
```

- FOR DOCKER HUB:

```
docker build -t <name-of-the-service>:<version> .
```

#### docker push

- FOR PRIVATE REPOSITORY:

```
docker push <my-private-registry-url>:<version>
```

- FOR DOCKER HUB:

```
docker push <name-of-the-service>:<version>
```

### semantic-release

TBD

## Linting and Code Formatting

### ESLint

A static code analysis tool for JavaScript codes. Linters basically have two categories of rules: formatting rules and code-quality rules. The formatting rule overlaps with the one and only feature of the `Prettier` but it is not as powerful as the `Prettier`. Therefore, this project only uses the code-quality rule of the `ESLint` and delegate the formatting rule to the `Prettier`(Technically the term 'delegation' is wrong. `eslint-config-prettier` module turns off all rules that are unnecessary or might conflict with `Prettier`; and `eslint-plugin-prettier` let the ESLint report any ESLint-specific issues, excluding issues conflict with `Prettier`).

You can run eslint with:

```
npm run lint
```

### Prettier

A code formatting tool that enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary. By using the tool, developers can have a common code format easily and what is more important is they do not to be stressed about formatting anymore. The `Prettier` can be powerful when it is bound in `Git`'s pre-commit stage. If it is triggered in the pre-commit stage, the code formatting can be done automatically before a commit is made, letting developers do not have to care about code format totally. In this project, pre-commit binding is done by `husky` + `lint-staged`(see right next section for details).

You can run prettier with:

```
npm run format
```

### lint-staged + husky

The `lint-staged` is a runner which runs linters against staged `Git` files. It has been commonly used for linting codes right before commit. In other words, it can be final stage for ensuring no errors(technically static code error) go into the repository. It can also enforce code style silently by running code formatter. This allows developers to keep & use their code style locally. You can check the example configuration of the tool in the [package.json](./package.json) file at the `lint-staged` section.

The `husky` is a `Git` commit hook tool which allows developers to easily run any scripts/commands on all `Git` hooks without manually write a `Git` hook script. For example, a code formatter can be executed in pre-commit stage of the `Git` by configuring the code formatter's command in the husky's config like the following(using `Prettier`):

```
// husky v4 config(v5 has different format for configuration)
"husky": {
  "hooks": {
    "pre-commit": "prettier --write"
  }
}
```

When those two tools are combined together, it becomes very powerful static code analysis pipeline. If the `lint-staged` with two jobs, linting and code formatting, is bound with a pre-commit hook through the `husky`, the jobs will be automatically triggered on every trial of a `Git` commit. Reducing the burden of the developer!😁

## Code productivity tool configuration

Tools like eslint, prettier, jest, husky, and more has their own configuration files(e.g. .eslintrc.js, .prettierrc, jest.config.json, husky.config.js, etc). It could be cumbersome for developers to handle these configuration files separately if the number of tools increases more and more. Therefore, it would be better to manage all those configurations within a single place, `package.json` file. That is why this project's [package.json](./package.json) file contains configuration of tools.

**TL;DR** All configuration of the tools are located in [package.json](./package.json) file.

## Application Configuration

### Environment variable management

You can set environment variables via `.env` file of the project root directory. Notice, `NODE_ENV` variable must be defined outside of .env file. In addition, developers of the `dotenv` project **strongly** recommend against having a "main" .env file and an "environment" .env file like .env.test, since config should vary between deploys, and you should not be sharing values between environments(refer to [The Twelve-Factor App's config statement](https://12factor.net/config)).

## Configuration constant management

All the configuration constants are managed in a central place. You can set the constants(e.g. logging level, database host & port) in the [index.js](./src/config/index.js) under the src/config directory.

## TBD

- [x] Create starter to make the project structure creator.
- [x] Setup semantic-release.
- [ ] Prepare base unit test code for base source code files.
- [ ] Replace moment-timezone module with one of the alternatives.
- [ ] Jest(unit test) & SuperTest(integration test).

## Dependencies

> Explanation below is cited from the official github pages.

- [express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework for node.
- [body-parser](https://github.com/expressjs/body-parser): Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
- [method-override](https://github.com/expressjs/method-override): Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
- [cors](https://github.com/expressjs/cors): CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [morgan](https://github.com/expressjs/morgan): HTTP request logger middleware for node.js
- [winston](https://github.com/winstonjs/winston): A logger for just about everything.
- [moment-timezone](https://github.com/moment/moment-timezone): IANA Time Zone Database + [Moment.js](https://github.com/moment/moment/).
- [dotenv](https://github.com/motdotla/dotenv): Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

> moment-timezone will be replaced by alternatives: [luxon](https://github.com/moment/luxon), [date-fns](https://github.com/date-fns/date-fns), [day.js](https://github.com/iamkun/dayjs). The `luxon` may be the one to be replaced, since it is maintained by the `moment` developers and the module borrows many ideas from the `moment` while offering improvements in some areas.

## Development dependencies

> Explanation below is cited from the official github pages.

- [eslint](https://github.com/eslint/eslint): ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier): Turns off all rules that are unnecessary or might conflict with Prettier.
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier): Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
- [prettier](https://github.com/prettier/prettier): Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.
- [jest](https://github.com/facebook/jest): Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [husky](https://github.com/typicode/husky/tree/master): Husky can prevent bad git commit, git push and more.
- [lint-staged](https://github.com/okonet/lint-staged): Run linters against staged git files.
