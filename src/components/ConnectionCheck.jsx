import React, { Component, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import rootActions from "../actions/rootActions";

const useStyles = makeStyles((theme) => ({
    pdsBanner: {
        background: '#FF0000',
        height: '32px'
    },
    pdsBannerText:{
        color: '#ffffff',
        minHeight: '0',
        padding: '5px',
        fontSize: '14px',
        justifyContent: 'center'
    }
}));

const ConnectionCheck = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const apiTestResult = useSelector(state => {
        if (state.appReducer.apiTest) {
            return state.appReducer.apiTest;
        }
    });

    const connectionStatusMessage = useSelector(state => {
        if(state.appReducer.responseStatusCode) {
            switch (state.appReducer.responseStatusCode) {
                case 401:
                    return "You are not authorized to use this service. Please try to login again. " +
                        "If the problem persists please contact the <a href=\"https://pds-gamma.jpl.nasa.gov/tools/doi/?feedback=true\">PDS Operator</a> for assistance.";
                default:
                    return "The doi api is currently unreachable. Please check your internet connection. " +
                        "If you are connected and the problem persists please contact the <a href=\"https://pds-gamma.jpl.nasa.gov/tools/doi/?feedback=true\">PDS Operator</a> for assistance.";
            };
        } else {
            return "";
        }
    });

    useEffect(() => {
        dispatch(rootActions.appAction.sendApiTest());
    }, []);

    return (
        <div>
            {(apiTestResult || connectionStatusMessage.length == 0)?
                ""
                :
                <AppBar position='static' className={classes.pdsBanner}>
                    <Toolbar className={classes.pdsBannerText}>
                        <Typography
                            variant="p"
                        >
                            {connectionStatusMessage}
                        </Typography>
                    </Toolbar>
                </AppBar>
            }
        </div>
    );
}

export default ConnectionCheck;