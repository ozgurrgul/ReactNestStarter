# ReactNestStarter

*Scroll down for images*

This starter includes a ReactJS application with Nest backend. Features:

- JWT user authentication with Nest/Passport js ⭐
- Prisma ORM ⭐
- Full Typescript ⭐
- Lerna monorepo ⭐
- Antd / RTK Query libraries used ⭐

#### A React js application for frontend
- React-router integrated
- Login/register user flows added
- Base layout, logged in layout logics added
- [Vitejs](https://vitejs.dev/) used for build
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) used for api calls
- [Antd](https://github.com/ant-design/ant-design) / [Antd Pro components](https://procomponents.ant.design/en-US/components/) used for UI
- Directory: - packages/webapp

#### A Nest js application for backend
- [Nestjs](https://nestjs.com/) for server used
- [Prisma](https://www.prisma.io/) for ORM used
- Sqlite for database used
- Login/register endpoints added with validations
- Directory: - packages/server

### How to use this starter kit?

First clone the repository, cd into it and install dependencies:

```
git clone https://github.com/ozgurrgul/ReactNestStarter.git
cd ReactNestStarter
yarn
lerna bootstrap # will install dependencies in each package
```

Then run using following commands:

In order to run frontend:

```
web:start
```

Go to [http://127.0.0.1:5173](http://127.0.0.1:5173)

In order to run server:

```
server:start
```

Server runs on http://127.0.0.1:3002 by default

⚠️ The `webapp` and `server` shared the `dtos` project in order to reduce code duplication. When you make a change to `dtos` package, you need to run:

```
yarn dto:compile
```

*Execute all commands from the main directory*

### Environment

/packages/server/.env:

```
RECAPTCHA_SECRET_KEY=xxx
WEBAPP_URL=http://localhost:5173

FEATURE_EMAIL_VERIFICATION_ENABLED=true
FEATURE_EMAIL_VERIFICATION_TOKEN_SECRET=xxx
```

/packages/webapp/.env

```
VITE_API_URL=http://localhost:3002 # url of running server
VITE_RECAPTCHA_SITE_KEY=
```

/packages/prisma/.env

```
DATABASE_URL="file:./dev.db"
```


### Images

- Login screen ![Login screen](https://github.com/ozgurrgul/ReactNestStarter/blob/main/images/1.png?raw=true)

- Dashboard screen ![Dashboard screen](https://github.com/ozgurrgul/ReactNestStarter/blob/main/images/2.png?raw=true)
