# Orders Backend

This repository contains the backend for the Orders Application

## Requirements

- Node / NPM
- MongoDB database API Key

## Build and run

To install the application's dependencies, run:

```bash
npm install 
```

Add a .env file to the root directory of the project named '.env' and insert the following:

```bash
DATABASE_URL=<MONGO_DB_API_KEY>
PORT=3003
```


Install Nodemon globally using the following command:

```bash
npm install -g nodemon
```

To launch the server in Dev mode with hot reloads, run the following command: 

```bash
nodemon start.js
```

To launch the application normally, run the following command:

 ```bash
npm start
```
