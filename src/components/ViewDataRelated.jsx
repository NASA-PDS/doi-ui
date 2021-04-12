import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core/styles";
import rootActions from "../actions/rootActions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    tableContainer: {
        maxHeight: 'calc(100vh - 400px)',
    },
    margin: {
        margin: '20px 0'
    },
    tableHeader: {
        '& th': {
            fontWeight: 'bold',
        },
    },
    tablePagination: {
        backgroundColor: '#fafafa'
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

const ViewDataRelated = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [relatedData, setRelatedData] = useState(props.data);

    const handleReleaseClick = (event, lidvid) => {
        dispatch(rootActions.appAction.relatedViewToRelease({"page": "True", "identifier": lidvid}));
    };

    const massageStatus = (string) => {
        if (string.toLowerCase() === "review") {
            return "In " + capitalizeWord(string);
        } else {
            return capitalizeWord(string);
        }
    };

    const capitalizeWord = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const formatDate = (string) => {
        // 2021-02-24T17:32:55.977736+08:00
        const idx = string.indexOf('T');
        const date = string.substr(0, idx);
        const time = string.substr(idx + 1, 'hh:mm:ss'.length);
        return date + ' ' + time;
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        setRelatedData(props.data);
    }, [props.data]);

    return (
        <Paper className={`${classes.root} ${classes.margin}`}>
            <TableContainer className={classes.tableContainer}>
                <Table size="small" aria-label="a dense, sticky, paginated table" stickyHeader>
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell className={classes.columnDoi}>DOI</TableCell>
                            <TableCell className={classes.columnLidvid}>LIDVID</TableCell>
                            <TableCell className={classes.columnStatus}>Status</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Last Updated</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? relatedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : relatedData
                        ).reverse().map((data) => {
                            return (
                                <TableRow hover key={data.lidvid}>
                                    <TableCell>{data.doi ? data.doi : '-'}</TableCell>
                                    <TableCell>{data.lidvid}</TableCell>
                                    <TableCell>{massageStatus(data.status)}</TableCell>
                                    <TableCell>{(() => {
                                        switch (data.status.toLowerCase()) {
                                            case 'draft':
                                            case 'reserved':
                                                return (
                                                    <Button color="primary"
                                                            className={classes.buttonLink}
                                                            onClick={(event) => handleReleaseClick(event, data.lidvid)}
                                                    >
                                                        Release
                                                    </Button>
                                                );
                                            case 'released':
                                                return (
                                                    <Button color="primary"
                                                            className={classes.buttonLink}
                                                            onClick={(event) => handleReleaseClick(event, data.lidvid)}
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
                                    <TableCell>{formatDate(data.update_date)}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination className={classes.tablePagination}
                             rowsPerPageOptions={[10, 20, 50, {label: 'All', value: -1}]}
                             component="div"
                             count={relatedData.length}
                             rowsPerPage={rowsPerPage}
                             page={page}
                             onChangePage={handleChangePage}
                             onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
};

export default ViewDataRelated;