import React, { Component, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import rootActions from "../actions/rootActions";

const useStyles = (theme) => ({
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
    },
});

const ConnectionCheck = (props) => {
    const { classes } = props;
    const dispatch = useDispatch();

    const apiTestResult = useSelector(state => {
        return state.appReducer.apiTest;
    });

    useEffect(() => {
        dispatch(rootActions.appAction.sendApiTest());
    }, []);

    return (
        <div>
            {apiTestResult ? 
                <></>
                :
                <AppBar position='static' className={classes.pdsBanner}>
                    <Toolbar className={classes.pdsBannerText}>
                        <Typography
                            variant="p"
                        >
                            The doi api is currently unreachable. Please check your internet connection. If you are connected and the problem persists please contact the <a href="https://pds-gamma.jpl.nasa.gov/tools/doi/?feedback=true">PDS Operator</a> for assistance.
                        </Typography>
                    </Toolbar>
                </AppBar>
            }
        </div>
    );
}

export default withStyles(useStyles)(ConnectionCheck);