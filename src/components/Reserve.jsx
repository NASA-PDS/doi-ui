import React from 'react';
import { Button, Typography } from '@material-ui/core';
import ImportData from '../utils/ImportData.js';
import ReserveExcelContent from './ReserveExcelContent';

const Reserve = () => {
  return <div>
    <Typography>Reserve</Typography>
    <br/>
    <ImportData/>
    <ReserveExcelContent></ReserveExcelContent>
    <br/>
    <Button variant="contained" color="primary">Reserve</Button>

  </div>;
};
 
export default Reserve;