import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";


const styles = theme => ({
    heroUnit: {
      backgroundColor: theme.palette.background.paper
    },
    heroContent: {
      maxWidth: 600,
      margin: "0 auto",
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
    },
    heroButtons: {
      marginTop: theme.spacing.unit * 4
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
  });




function Header(props) {
    const { classes } = props;

return (
<React.Fragment>
<main>
<div className={classes.heroUnit}>
<div className={classes.heroContent}>
  <Typography
    component="h1"
    variant="h2"
    align="center"
    color="textPrimary"
    gutterBottom
  >
    BET
  </Typography>
  <Typography
    variant="h6"
    align="center"
    color="textSecondary"
    paragraph
  >
    Welcome to BET, the Bill Expense Tracker!
  </Typography>
</div>
</div>
<div className={classNames(classes.layout, classes.cardGrid)}>
</div>
</main>
</React.Fragment>
  );
};


Header.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  
  export default withStyles(styles)(Header);
