import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PageHeader from './PageHeader';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '25px',
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  faqItem: {
    width: '100%',
    '& .MuiAccordionDetails-root': {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left', 
      alignSelf: 'flex-start'
    }
  },
  answerSection: {
    marginBottom: '1em',
    '&:last-child': {
      marginBottom: '0'
    }
  },
  subheader: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: '0.5em'
  },
  faqText: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
  }
}));

const FAQ = () => {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <PageHeader header={'Frequently Asked Questions'}/>
        <br/><br/>
        
        <Accordion className={classes.faqItem}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-intro"
              id="faq-intro"
          >
            <Typography>What is a DOI?</Typography>
          </AccordionSummary>
          <Divider variant="middle"/>
          <AccordionDetails>
            <div className={classes.answerSection}>
              <Typography className={classes.faqText}>
                Digital Object Identifiers (DOI) are permanent identifiers allocated to datasets or documents. They are used for the citation of these resources in scientific papers.
                <br/>
                The DOI are resolved through stable URL re-directing the user to a landing page describing the identified resource (dataset or document).
                <br/>
                The DOIs are maintained by external partners: PDS DOIs are created through
                  <a href="https://www.osti.gov/data-services" target="_blank" rel="noopener noreferrer"> OSTI</a> service and registered at <a href="https://datacite.org/" target="_blank" rel="noopener noreferrer">DataCite</a>.
              </Typography>
            </div>
            <div className={classes.answerSection}>
              <Typography className={classes.subheader}>Example:</Typography>
              <Typography className={classes.faqText}>
                DOI: 10.17189/1510489
                <br/>
                DOI URL: <a href="https://doi.org/10.17189/1510489">https://doi.org/10.17189/1510489</a>
                <br/>
                Landing page: <a href="https://pds.nasa.gov/ds-view/pds/viewCollection.jsp?identifier=urn:nasa:pds:insight_cameras:miscellaneous&version=1.0">https://pds.nasa.gov/ds-view/pds/viewCollection.jsp?identifier=urn:nasa:pds:insight_cameras:miscellaneous&version=1.0</a>
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
        
        <Accordion className={classes.faqItem}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-reserve-or-release"
              id="faq-reserve-or-release"
          >
            <Typography>How do I know whether I should reserve or release a DOI?</Typography>
          </AccordionSummary>
          <Divider variant="middle"/>
          <AccordionDetails>
            <div className={classes.answerSection}>
              <Typography className={classes.subheader}>The short answer:</Typography>
              <Typography className={classes.faqText}>
                <ul>
                  <li>
                    If the data is not yet publicly available --> Reserve
                  </li>
                  <li>
                    If the data is publicly available --> Release
                  </li>
                </ul>
              </Typography>
            </div>
            <div className={classes.answerSection}>
              <Typography className={classes.subheader}>The longer answer:</Typography>
              <Typography className={classes.faqText}>
                <ol>
                  <li>
                    To "reserve" a DOI is to get a DOI from our DOI Provider associated with a data set for a future release.
                    This is the ideal start for getting DOIs so you can get the DOI, and then add it to the PDS4 label metadata prior to release.
                  </li>
                  <li>
                    To "release" a DOI is to make the <a href="https://doi.org/my_doi">https://doi.org/my_doi</a> URL live.
                    This requires that the data is registered at EN, available online, and the landing pages are live (automated by EN Registry).
                  </li>
                </ol>
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
        
        <Accordion className={classes.faqItem}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-reserve-with-multiple-authors"
              id="faq-reserve-with-multiple-authors"
          >
            <Typography>How can I specify multiple authors in the DOI reserve spreadsheet?</Typography>
          </AccordionSummary>
          <Divider variant="middle"/>
          <AccordionDetails>
            <div className={classes.answerSection}>
              <Typography className={classes.faqText}>
                You can just put 1 author in the spreadsheet for now.
                The only part of that spreadsheet that really matters is the LIDVID.
                That is what ties to the DOI to the product.
                You will have a chance to update the DOI metadata with as many authors as you'd like at the "Release DOI" step.
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
  
        <Accordion className={classes.faqItem}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-reserve-spreadsheet"
              id="faq-reserve-spreadsheet"
          >
            <Typography >The DOI reserve spreadsheet seems very terse; can I provide more information?</Typography>
          </AccordionSummary>
          <Divider variant="middle"/>
          <AccordionDetails>
            <div className={classes.answerSection}>
              <Typography className={classes.faqText}>
                The "Reserve DOI" step is really just a placeholder to request a DOI from our DOI Provider.
                The only information that is really critical at this step is the LIDVID.
                Everything else will be updated when you submit a request to "release" the DOI using the PDS4 label.
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
  
        <Accordion className={classes.faqItem}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-which-pds4-products"
              id="faq-which-pds4-products"
          >
            <Typography>What PDS4 products should we be assigning DOIs to?</Typography>
          </AccordionSummary>
          <Divider variant="middle"/>
          <AccordionDetails>
            <div className={classes.answerSection}>
              <Typography className={classes.faqText}>
                Per the <a href="https://pds.nasa.gov/datastandards/documents/policy/PolicyOnDOI10142020.pdf" target="_blank" rel="noopener noreferrer">PDS DOI Policy</a>, bundles are the "default" product to receive a DOI, but it is up to the Discipline Node if you would like DOIs for collections or documents.
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
  )
};

export default FAQ;