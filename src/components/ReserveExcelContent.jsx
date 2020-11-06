import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
 
const ReserveExcelContent = () => {
    const excelContent = useSelector(state =>
        state.appReducer.reserveExcel
    );

    const generateExcelContent = () => {
        let content = '';

        if(excelContent && excelContent[0]){
            return (
                <div>
                    <br></br>
                    <Container>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Title</TableCell>
                                        <TableCell align="right">Publication Date</TableCell>
                                        <TableCell align="right">Product Type</TableCell>
                                        <TableCell align="right">Author Last Name</TableCell>
                                        <TableCell align="right">Author First Name</TableCell>
                                        <TableCell align="right">Author Related Resource</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {excelContent.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row["status"]}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row["title"]}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row['publication_date']}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row['product_type_specific']}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row["author_last_name"]}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row["author_first_name"]}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row['related_resource']}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </div>
            )
        }
        else{
            content = '';
        }

        return content;
    }

    return <div>
        {generateExcelContent()}
    </div>;
};

export default ReserveExcelContent;