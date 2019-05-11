import React from "react";
import PropTypes from "prop-types";
import AppBar from "./AppBar/AppBar.js";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';



//// Styles
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 500,
    width: 500,
    margin: 10,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


//// Spacing
class Main extends React.Component {
  state = {
    spacing: '24',
  };


//// Render
render() {
  const { classes } = this.props;
  const { spacing } = this.state;

  return (
    <React.Fragment>
{/* App Bar*/}
      <AppBar />
{/* Header*/}
      <Header />
      <main>
{/* Grid Row-1 */}
      <Grid container className={classes.root} spacing={24}>
        <Grid item xs={12}>
{/* CardCar */}
          <Grid container className={classes} justify="center" spacing={Number(spacing)}>
            {[0].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
{/* CardEnt */}
          <Grid container className={classes} justify="center" spacing={Number(spacing)}>
            {[1].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
{/* CardFood */}
          <Grid container className={classes} justify="center" spacing={Number(spacing)}>
            {[2].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
{/* Grid Row-2 */}
      <Grid container className={classes.root} spacing={24}>
        <Grid item xs={12}>
{/* CardMisc */}
          <Grid container className={classes} justify="center" spacing={Number(spacing)}>
            {[3].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        </Grid>
{/* CardShop */}
          <Grid container className={classes} justify="center" spacing={Number(spacing)}>
            {[4].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
{/* CardUtil */}
          <Grid container className={classes} justify="center" spacing={Number(spacing)}>
            {[5].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
      </Grid>

      </main>
{/* Footer */}
    <Footer />
    </React.Fragment>
  );
};
};


//// name.propTypes
Main.propTypes = {
  classes: PropTypes.object.isRequired
};


//// Export Default
export default withStyles(styles)(Main);