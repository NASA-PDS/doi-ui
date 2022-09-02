window['getGlobalConfig'] = {
    api: 'http://localhost:8080/PDS_APIs/pds_doi_api/0.2/',
    oauth_client_id: '<CLIENT ID OF COGNITO APP CLIENT>',
    oauth_redirect_uri: 'http://localhost:3000',
    oauth_logout_endpoint: 'https://<COGNITO DOMAIN NAME>.auth.us-west-2.amazoncognito.com/logout',
    oauth_provider_url: 'https://<COGNITO DOMAIN NAME>.auth.us-west-2.amazoncognito.com/oauth2',
    app_viewer_group_name: 'PDS_Viewer',
    app_admin_group_name: 'PDS_Admin',
}
