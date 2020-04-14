# Node Express Starter App

Node express app starter with TypeScript support.

# Pre-reqs

To build and run this app locally you will need a few things:

-   Install [Node.js](https://nodejs.org/en/)
-   Install [MongoDB](https://docs.mongodb.com/manual/installation/)
-   Install [VS Code](https://code.visualstudio.com/)

# Getting started

-   Clone the repository

```
git clone https://github.com/lacour-vincent/node-express-starter.git
```

-   Install dependencies

```
cd node-express-starter
yarn
```

-   Start your mongoDB service

```
sudo systemctl start mongod
sudo systemctl status mongod
```

-   Create your `.env` file and set env-variables

```
# Application Port
PORT=3000

# MongoDB URI
MONGODB_URI_PROD=mongodb://<mlab_user>:<mlab_password>@<mlab_connection_url>
MONGODB_URI_DEV=mongodb://127.0.0.1:27017/<database-dev>
MONGODB_URI_TEST=mongodb://127.0.0.1:27017/<database-test>

# Secret JWT
SECRET_JWT=i-am-very-secret-key
```

-   Build and run the project

```
yarn build
yarn start
```

# Scripts

Below is a list of all the scripts available:

| Script     | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| `dev`      | Start the dev server.                                        |
| `build`    | Runs build.                                                  |
| `start`    | Runs node on `dist/server.js` which is the apps entry point. |
| `test`     | Runs unit tests.                                             |
| `prettier` | Runs code formatter.                                         |
| `lint`     | Runs code linter.                                            |
| `validate` | Runs static tests.                                           |

# Dependencies

Dependencies are managed through `package.json`.
In that file you'll find two sections:

## `dependencies`

| Package           | Description                                           |
| ----------------- | ----------------------------------------------------- |
| bcrypt            | Library for hashing and salting user passwords.       |
| body-parser       | Express 4 middleware.                                 |
| compression       | Express 4 middleware.                                 |
| cors              | Express 4 middleware.                                 |
| dotenv            | Loads environment variables from .env file.           |
| express           | Node.js web framework.                                |
| express-validator | Easy form validation for Express.                     |
| helmet            | Express 4 middleware.                                 |
| jsonwebtoken      | Simple library to generate JWT.                       |
| mongoose          | MongoDB ODM.                                          |
| passport          | Simple and elegant authentication library for node.js |
| passport-kwt      | Sign-in with JWT.                                     |

## `devDependencies`

| Package    | Description                                                             |
| ---------- | ----------------------------------------------------------------------- |
| @types     | Dependencies in this folder are `.d.ts` files used to provide types.    |
| eslint     | Linter for JavaScript and TypeScript files.                             |
| jest       | Testing library for JavaScript.                                         |
| nodemon    | Utility that automatically restarts node process when it crashes.       |
| prettier   | Formatter for JavaScript and TypeScript files .                         |
| supertest  | HTTP assertion library.                                                 |
| ts-jest    | A preprocessor with sourcemap support to help use TypeScript with Jest. |
| ts-node    | Enables directly running TS files.                                      |
| typescript | JavaScript compiler/type checker that boosts JavaScript productivity.   |

# References

Inspired by [TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter) and [Hackathon Starter project](https://github.com/sahat/hackathon-starter)

## License

Licensed under the [MIT](LICENSE.txt) License.
