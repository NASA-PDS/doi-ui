import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  helpText: {
    fontSize: theme.typography.pxToRem(14)
  },
  helpLink: {
    color: '#0000EE'
  },
  keywordHelp: {
    display: 'flex',
    position: 'relative',
    left: 58,
    top: 23,
    zIndex: 1,
    '& .MuiIconButton-label': {
      backgroundColor: 'white'
    }
  },
  keywordHelpWidth: {
    maxWidth: 500
  },
  generalHelpWidth: {
    maxWidth: 360
  }
}));

const HelpInfo = (props) => {
  const classes = useStyles();
  
  return (
      <>
        {(() => {
          switch (props.type) {
            case 'keyword':
              return (
                  <Tooltip
                      arrow
                      interactive
                      placement='right-end'
                      classes={{ tooltip: classes.keywordHelpWidth }}
                      className={classes.keywordHelp}
                      title={
                        <React.Fragment>
                          <Typography className={classes.helpText}>
                            These keywords may be used to enable future discovery of these datasets. The auto-complete values are populated by the <a href="https://astrothesaurus.org/" className={classes.helpLink}>Unified Astronomy Thesaurus</a><OpenInNewIcon fontSize={'small'}/>.
                            Additional custom keywords may also be entered.
                          </Typography>
                        </React.Fragment>
                      }
                  >
                    <IconButton aria-label="Help">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
              )
            case 'general':
              return (
                  <Tooltip
                      arrow
                      interactive
                      placement='top-start'
                      classes={{ tooltip: classes.generalHelpWidth }}
                      title={
                        <React.Fragment>
                          <Typography className={classes.helpText}>
                            Questions about the process or information requested?
                            <br/>See <Link to="/faq">FAQs <OpenInNewIcon fontSize={'small'}/></Link>  or contact the <a href="mailto:pds-operator@jpl.nasa.gov">PDS Operator</a> for assistance.
                          </Typography>
                        </React.Fragment>
                      }
                  >
                    <IconButton aria-label="Help">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
              )
          }
        })()}
      </>
  );
};
 
export default HelpInfo;
