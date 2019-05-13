import React from "react";
import PropTypes from "prop-types";
import AppBar from "./AppBar/AppBar.js";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";
import { withStyles, Grid } from '@material-ui/core';
import CardCar from "./Cards/CardCar.js";
import CardEnt from "./Cards/CardEnt.js";
import CardFood from "./Cards/CardFood.js";
import CardMisc from "./Cards/CardMisc.js";
import CardShop from "./Cards/CardShop.js";
import CardUtil from "./Cards/CardUtil.js";



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
  classes.media = 'media'
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
          <Grid container className={classes} justify="center" spacing={Number(spacing)}>
{/* CardCar */} 
            {[0].map(value => (
              <Grid key={value} item>
                <CardCar mancss={classes.paper} />
              </Grid>
            ))}
{/* CardEnt */}
            {[1].map(value => (
              <Grid key={value} item>
                <CardEnt mancss={classes.paper} />
              </Grid>
            ))}
{/* CardFood */}
            {[2].map(value => (
              <Grid key={value} item>
                <CardFood mancss={classes.paper} />
              </Grid>
            ))} 
          </Grid>
        </Grid>
      </Grid>
{/* Grid Row-2 */}
      <Grid container className={classes.root} spacing={24}>
        <Grid item xs={12}>
          <Grid container className={classes} justify="center" spacing={Number(spacing)}>
{/* CardMisc */}
            {[3].map(value => (
              <Grid key={value} item>
                <CardMisc mancss={classes.paper} />    
              </Grid>
            ))}
{/* CardShop */}            
            {[4].map(value => (
              <Grid key={value} item>
                <CardShop mancss={classes.paper} />
              </Grid>
            ))}
{/* CardUtil */}
            {[5].map(value => (
              <Grid key={value} item>
                <CardUtil mancss={classes.paper} />
              </Grid>
            ))}
          </Grid>
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