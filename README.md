# Tegara
## Description

This is a E-commerce platform called `Tegara`.

## Dependencies

- Node v14.15.1 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 6.14.8 (LTS) or more recent, Yarn can work but was not tested for this project

## Installation

### Database setup

Open postgres terminal with: `psql postgres`

1- `CREATE DATABASE tegara;`

2- `CREATE USER admin WITH PASSWORD 'admin123';`

3- `GRANT ALL PRIVILEGES ON DATABASE tegara TO admin;`

### Create Environment

1. From the root of the repo, navigate backend folder `cd backend` First create file called `.env` and enter the following code:

```
ENV=dev
HOST=localhost
PORT=8000
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tegara
DB_USERNAME=admin
DB_PASSWORD=admin123
# Secret Keys
SECRET_TOKEN=adham123!
SALT_ROUNDS=10
SECRET_PEPER=adham123!
```

2. Second to install the node_modules run `npm install` or `yarn`. After installation is done start the api in dev mode with `npm run dev` or `yarn dev`.

3. Third without closing the terminal in step 2, navigate to the frontend `cd frontend` to intall the node_modules `npm install` or `yarn`. After installation is done start the frontend server with `npm run start` or `yarn start`.

Note: open `Linker/frontend/src/utils/api-urls.js`

## Unit Tests:

No Unit test available now.

## Built With

- [React](https://reactjs.org/) - Single Page Application Library
- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework
- [PostgreSQL](https://www.postgresql.org/) - Open Source Relational Database
