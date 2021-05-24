# pds-doi-ui
Front-end interface for pds-doi-service

An example for the reservation excel input file can be found at https://pds-engineering.jpl.nasa.gov/user/login?destination=node/691

## Pre-requisites

Install the pds-doi-service:

    pip install pds-doi-service
    pds-doi-api

See https://nasa-pds.github.io/pds-doi-service/ for details


## For administrator

Deploy a stable release

    git clone https://github.com/NASA-PDS/pds-doi-ui.git
    git checkout v0.1.0


Then follow instruction for "build locally". no binary packages are available yet for this application.


## To Build Locally

### Run `npm install` 

This will install all necessary dependencies.

### Change API Locations In The Config File

The config file is located at: `src/Config.js` It contains a list of necessary HTTP request URLs for the application to function correctly. These must be changed to point to your deployed server.

### Run `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

