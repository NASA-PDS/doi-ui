import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import rootActions from "../actions/rootActions";

const useStyles = makeStyles((theme) => ({
    center: {
        alignSelf: 'center',
    },
    margin: {
        margin: '20px 0'
    },
    subsectionHeader: {
        textAlign: 'left',
        marginBottom: 0
    },
    alert: {
        '& .MuiAlert-message':{
            marginLeft: "auto",
            marginRight: "auto"
        },
        marginLeft: '25px'
    },
    inline: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    exactMatch: {
        '& td': {
            borderBottom: 'none'
        },
        marginTop: '20px',
        backgroundColor: '#f0f0f0'
    },
    columnDoi: {
        minWidth: 125
    },
    columnLidvid: {
        minWidth: 325
    },
    columnStatus: {
        width: 100
    },
    buttonLink: {
        textTransform: 'initial',
        padding: 0
    }
}));

const ViewDataExact = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [exactData, setExactData] = useState(props.data);

    const handleReleaseClick = (event, lidvid) => {
        dispatch(rootActions.appAction.exactViewToRelease({"page": "True", "identifier": lidvid}));
    };

    const massageStatus = (string) => {
        if (string.toLowerCase() === "review")    {
            return "In " + capitalizeWord(string);
        } else {
            return capitalizeWord(string);
        }
    };

    const capitalizeWord = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const formatDate = (string) => {
        const idx = string.indexOf('T');
        const date = string.substr(0, idx);
        const time = string.substr(idx + 1, 'hh:mm:ss'.length);
        return date + ' ' + time;
    };

    useEffect(() => {
        setExactData(props.data);
    }, [props.data]);


    if (exactData.errors || exactData.status === "404" || exactData.title === "Not Found") {
        return (
            <div className={`${classes.margin} ${classes.inline}`}>
                <h4>Searched Product:</h4>
                <Alert icon={false} severity="error" className={`${classes.alert} ${classes.center} ${classes.margin}`}>
                    No exact match.
                </Alert>
            </div>
        )
    } else {
        // also has exactData.status, i.e. "review",
        return (
            <div className={classes.margin}>
                <h4 className={classes.subsectionHeader}>Searched Product:</h4>
                <TableContainer className={classes.exactMatch}>
                    <Table size="small">
                        <TableBody>
                            <TableRow key={exactData.lidvid}>
                                <TableCell className={classes.columnDoi}>{exactData.doi ? exactData.doi : '-'}</TableCell>
                                <TableCell className={classes.columnLidvid}>{exactData.lidvid}</TableCell>
                                <TableCell className={classes.columnStatus}>{massageStatus(exactData.status)}</TableCell>
                                <TableCell>{(() => {
                                    switch (exactData.status.toLowerCase()) {
                                        case 'draft':
                                        case 'reserved':
                                            return (
                                                <Button color="primary"
                                                        className={classes.buttonLink}
                                                        onClick={(event) => handleReleaseClick(event, exactData.lidvid)}
                                                >
                                                    Release
                                                </Button>
                                            );
                                        case 'released':
                                            return (
                                                <Button color="primary"
                                                        className={classes.buttonLink}
                                                        onClick={(event) => handleReleaseClick(event, exactData.lidvid)}
                                                >
                                                    Update
                                                </Button>
                                            );
                                        case 'review':
                                            return (
                                                <Button disabled
                                                        className={classes.buttonLink}
                                                >
                                                    <em>Pending</em>
                                                </Button>
                                            );
                                        default:
                                            return '-';
                                    }
                                })()}</TableCell>
                                <TableCell>{exactData.update_date ? formatDate(exactData.update_date) : formatDate(exactData.creation_date)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
};

export default ViewDataExact;