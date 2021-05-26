import React from 'react';
import Typography from "@material-ui/core/Typography";

const PageHeader = (props) => {
  return (
      <div className="align-left">
        <Typography variant="h4" component="h1">{props.header}</Typography>
        {props.text && <Typography variant="subtitle1" gutterBottom>{props.text}</Typography>}
      </div>
  );
};
 
export default PageHeader;
