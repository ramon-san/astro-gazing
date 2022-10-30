# Astro Gazing

> Astro Gazing is a website for lovers of the starts to connect and give out site recommendations, this is the final assignment for a web development course I'm taking.


## Technical details

To run this code first run the following command while on this directory level:

``` Shell
npm install
```

This will download all required packages based on the package.json file contained in this repository. To run npm commands you have to download [NodeJS](https://nodejs.org/en/).

If MongoDB is not yet installed in your computer [please do so](https://www.mongodb.com/docs/manual/installation/) and [start a server](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition), this is required for the app to function correctly.

Once you've got the project in your computer run the program as follows and open 'localhost:7070' in your browser.

``` Shell
nodemon index.js
```

For this command to work the Nodemon package must be installed, it's recommended to install this as a global package. The installation command goes as follows:

``` Shell
npm install -g nodemon
```

## Using seed data

Seed files have been created for you to have access to a quick and realistic user interaction, they appear in the seeds directory and to use them run the following command from the repos main directory:

``` Shell
node ./seeds/index.js
```

## Version control

Npm packages used for this project and their versions are mentioned in the package.json file, some important versions to consider are:
- Node      v16.15.0
- Npm       v8.12.1

## Project structure

At root (`./`) this project contains the following directories beside basic boilerplate:
- `models/` this directory contains "schemas" for our Mongo databases.
- `public/` this directory contains source code for the Bootstrap version we're using, this is used to avoid making additional calls to the CDN.
- `seeds/` this directory contains basic scripts to create our databases with random values.
- `views/` this directory contains the actual code for our website. Here we have a file called `home.ejs` which holds code for the website's landing page and a deeper directory structure:
    - `camps/` this directory contains the code for each page.
    - `layouts/` this contains basic boilerplate we connect with all our pages.
    - `partials/` this contains basic structure elements we connect to our boilerplate.

At root (`./`) this project contains the following files besides basic boilerplate:
- `index.js` this file has all the Express connections our website uses.