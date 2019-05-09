import React from 'react';
import '../../App.css';
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});




function Footer(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          © BET 2019
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        />
      </footer>
  </React.Fragment>
  );
};



Footer.propTypes = {
  classes: PropTypes.object.isRequired
};



export default withStyles(styles)(Footer);