import React from "react";
import PropTypes from "prop-types";
import { withStyles, Grid} from '@material-ui/core';
import CardStr from './../Card-Temp/CardTemp';

//pngs for cards
import car from './../assets/icons/electric-car.png';
import entertainment from './../assets/icons/entertainment.png';
import misc from './../assets/icons/folder.png';
import food from './../assets/icons/restaurant.png';
import shopping from './../assets/icons/sale.png'
import utilities from './../assets/icons/real-estate.png'



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
  mainSpacing: {
      padding: 90,
      marginBottom: 100,
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
      <main className={classes.mainSpacing}>
    <Grid container className={classes.root} spacing={24}>
          <Grid item xs={12}>
              <Grid container className={classes} justify="center" spacing={Number(spacing)}>
                    <Grid key='0' item>
                              <CardStr userIn={this.props.userIn} name={'Car'} cardImg={car} st={classes.paper} /> 
                    </Grid>
                    <Grid key='1' item>
                              <CardStr userIn={this.props.userIn} name={'Entertainment'} cardImg={entertainment} st={classes.paper} />
                    </Grid>
                    <Grid key='2' item>
                              <CardStr userIn={this.props.userIn} name={'Food'} cardImg={food} st={classes.paper} />
                    </Grid>
              </Grid>

              <Grid container className={classes} justify="center" spacing={Number(spacing)}>
                    <Grid key='3' item>
                        <CardStr userIn={this.props.userIn} name={'Shopping'} cardImg={shopping} st={classes.paper} />
                    </Grid>
                    <Grid key='4' item>
                        <CardStr userIn={this.props.userIn} name={'Utilities'} cardImg={utilities} st={classes.paper} />
                    </Grid>
                    <Grid key='5' item>
                        <CardStr userIn={this.props.userIn} name={'Misc'} cardImg={misc} st={classes.paper} />
                    </Grid>
              </Grid>
          </Grid>
    </Grid>

      </main>
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
