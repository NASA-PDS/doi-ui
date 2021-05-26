# pds-doi-ui
Front-end interface for pds-doi-service

An example for the reservation excel input file can be found at https://pds-engineering.jpl.nasa.gov/user/login?destination=node/691

## Pre-requisites

Install the pds-doi-service:

```
pip install pds-doi-service
pds-doi-api
```

See https://nasa-pds.github.io/pds-doi-service/ for details

## To Run And Build Locally

### Run `npm install` 

This will install all necessary dependencies.

### Change API Locations In The Config File

The config file is located at: `src/Config.js` It contains a list of necessary HTTP request URLs for the application to function correctly. These must be changed to point to your deployed backend server.

### Run `npm start`

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run `npm build`

Builds the app into deployable files in the `/build` directory.
These files can be put into any server to run the app.

## For Administrator

### Deploying A Stable Release

#### Clone Build Files

```
git clone https://github.com/NASA-PDS/pds-doi-ui.git
git checkout <TAG VERSION>
```

#### Run Serve

```
cd pds-doi-ui
npm install -g serve
serve -s build
```



