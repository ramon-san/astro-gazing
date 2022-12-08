# Astro Gazing

> Astro Gazing is a website for lovers of the starts to connect and give out site recommendations, this is the final assignment for a web development course I'm taking.

## Technical details

To run this code first run the following command while on this directory level:

```Shell
npm install
```

This will download all required packages based on the package.json file contained in this repository. To run npm commands you have to download [NodeJS](https://nodejs.org/en/).

If MongoDB is not yet installed in your computer [please do so](https://www.mongodb.com/docs/manual/installation/) and [start a server](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition), this is required for the app to function correctly.

Once you've got the project in your computer run the program as follows and open 'localhost:7070' in your browser.

```Shell
nodemon index.js
```

For this command to work the Nodemon package must be installed, it's recommended to install this as a global package. The installation command goes as follows:

```Shell
npm install -g nodemon
```

If you want to contribute to the code you need to install [pre-commit](https://pre-commit.com/); in MacOS you can do this with [brew](https://formulae.brew.sh/formula/pre-commit). This tool runs [Prettier](https://prettier.io/) to check code formatting and [ESLint](https://eslint.org/) to check code integrity. Once you've installed this tool run the following command in this directory level.

```Shell
pre-commit install
```

With this a basic CI process is added to your local pipeline and you're ready to contribute.

## Using seed data

Seed files have been created for you to have access to a quick and realistic user interaction, they appear in the seeds directory and to use them run the following command from the repos main directory:

```Shell
node ./seeds/index.js
```

## Version control

Npm packages used for this project and their versions are mentioned in the package.json file, some important versions to consider are:

- Node v16.15.0
- Npm v8.12.1

## Project structure

At root (`./`) this project contains the following directories beside basic boilerplate:

- [`models/`](./models/) this directory contains "schemas" for our Mongo databases.
- [`public/`](./public/) this directory contains source code for the Bootstrap version we're using, this is used to avoid making additional calls to the CDN.
- [`seeds/`](./seeds/) this directory contains basic scripts to create our databases with random values.
- [`utils/`](./utils/) this directory contains basic error handling procedures (`catchAsync.js`) and a generic class for errors (`ExpressErrors.js`).
- [`views/`](./views/) this directory contains the actual code for our website. Here we have a file called `home.ejs` which holds code for the website's landing page, another file called `error.ejs` which works as a page for error handling, and a deeper directory structure:
  - [`camps/`](./camps/) this directory contains the code for each page.
  - [`layouts/`](./camps/) this contains basic boilerplate we connect with all our pages.
  - [`partials/`](./partials/) this contains basic structure elements we connect to our boilerplate (navbar and footer).

At root (`./`) this project contains the following files besides basic boilerplate:

- `app.js` this file has all the Express connections our website uses.
- `schemas.js` this file uses the joi library to check JSON structures.
