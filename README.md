# Project Description

**Full Stack application developed as a technical exercise.**

## Allows users to:

### Create, edit, and delete notes (tasks)
### Archive and unarchive notes (tasks)
### Categorize notes (tasks) and filter them by category

## The project is divided into two separate applications:

### Backend → REST API built with Express + Sequelize

**Technologies**
- Express 4.18.2
- Sequelize 6.37.7
- CORS 2.8.5
- Body-parser 2.2.0
- Cookie-parser 1.4.7
- Dotenv 17.2.1
- Morgan 1.10.1
- Pg 8.16.3
- Pg-hstore 2.3.4
- Pgtools 1.0.1
- Bcryptjs 3.0.2
- JSONwebtoken 9.0.2
- Nodemon 3.0.0 (dev)

### Frontend → SPA built with React

**Technologies**
- React 19.1.1
- React DOM 19.1.1
- React Scripts 5.0.1
- Axios 1.11.0
- Dotenv 17.2.1
- Nodemon 3.1.10 (dev)
- React-Redux 9.2.0
- @reduxjs/toolkit 2.8.2
- React-router-dom 7.8.2
- Redux-persist 6.0.0

### Prerequisites

**Technologies**
- Node.js v22.18.0
- Npm 10.9.3
- PostgreSQL 17
- Concurrently 9.2.1 (dev)

## Test

<span style="color:red; font-weight:bold">⚠️ MUST!</span>

You must rename and configure environment files before running the project:

### Backend
1. Rename `/backend/.env.example` to `/backend/.env`
2. Fill in the following constants:
   - `PORT`
   - `DB_HOST`
   - `DB_SCHEMA`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_DIALECT`
   - `DB_PORT`

### Frontend
1. Rename `/frontend/.env.example` to `/frontend/.env`
2. Fill in the following constant:
   - `REACT_APP_BACKEND_URL`  
     Example:
     ```
     http://192.168.1.22:3002
     ```
     where:
     - `http://192.168.1.22` → is the `DB_HOST` from `/backend/.env`
     - `3002` → is the `PORT` from `/backend/.env`

**Default User Name & Password**

```Username: TestUser```
```Password: qwerty123```

**Script**

```./start.sh```

#### This user already has Categories with Notes in different completion states.
#### The creation of new users is also available.

### Restrictions

```Some restrictions were set from the backend for testing purposes```

**User Model**
#### Username - Cannot be empty. Only alphanumeric values without accents, numbers, and underscores are allowed.
#### Name - Cannot be empty. Only letters (with or without accents) and spaces are allowed.
#### Lastname - Cannot be empty. Only letters (with or without accents) and spaces are allowed.
#### Password - Cannot be empty. Minimum length: 8 characters.
#### Email - Cannot be empty and must follow the proper format.

**TodoList Model**
#### Name - Cannot be empty.

**Task Model**
#### Name - Cannot be empty. Only letters (with or without accents), spaces, and numbers are allowed.

**Errors received from the backend are not displayed on the frontend.**
