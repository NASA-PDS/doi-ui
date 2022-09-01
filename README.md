# pds-doi-ui
Front-end interface for pds-doi-service

An example for the reservation excel input file can be found at https://pds-engineering.jpl.nasa.gov/user/login?destination=node/691

## Pre-requisites

Install the pds-doi-service:

```
pip install pds-doi-service
pds-doi-api
```

See https://nasa-pds.github.io/doi-service/ for details

## To Run And Build Locally

### Run `npm install` 

This will install all necessary dependencies.

### Change API Locations In The Config File

The config file is located at: `public/config.js` It contains the necessary HTTP request URLs for the application to function correctly. These must be changed to point to your deployed backend server.

### Update the Authentication Related Configurations 

You can set these configurations also in the `public/config.js`. Make sure to use correct URL paths to match with your environment. You may check with the system admins to get the Amazon Cognito related values.

```js
window['getGlobalConfig'] = {
    api: 'http://localhost:8080/PDS_APIs/pds_doi_api/0.2/',
    oauth_client_id: '<CLIENT ID OF COGNITO APP CLIENT>',
    oauth_redirect_uri: 'http://localhost:3000',
    oauth_logout_endpoint: 'https://<COGNITO DOMAIN NAME>.auth.us-west-2.amazoncognito.com/logout',
    oauth_provider_url: 'https://<COGNITO DOMAIN NAME>.auth.us-west-2.amazoncognito.com/oauth2',
    app_viewer_group_name: 'PDS_Viewer',
    app_admin_group_name: 'PDS_Admin',
}
```

### Run `npm start`

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run `npm run build`

Builds the app into deployable files in the `/build` directory.
These files can be put into any server to run the app.

#### Create a release

    git tag <version>
    git push --tags
    npm run build
    mv build pds-doi-ui-<version>
    zip -r pds-doi-ui.zip pds-doi-ui-<version>

Upload the zip file in the release of the tag in github

    

## For Administrator

### Deploying A Stable Release

#### Clone Build Files

```
git clone https://github.com/NASA-PDS/pds-doi-ui.git
cd pds-doi-ui
git checkout <TAG VERSION>
npm install -g serve
serve -s build
```

#### Run from build archive

From the github release page https://github.com/NASA-PDS/pds-doi-ui/releases/

Select the latest version and download the zip file in assets `pds-doi-ui.zip`

Unzip and start a standalone server

```
serve -s pds-doi-ui
```

The unzipped directory can also be configured to be published by an **apache** or **ngynx** server.

**Troubleshooting:** a serve command is also available in anaconda, be careful not to use it instead of the npm serve.

### SSH Tunnel to DOI Service

```
ssh -L 8085:localhost:8080 <machine>
```
