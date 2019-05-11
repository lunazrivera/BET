import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ModalBudget from "/Users/damia/Desktop/BET/client/src/components/ModalBudget/ModalBudget.js";



const styles = {
  card: {
    maxWidth: 500,
    maxHeight: 500,
  },
  media: {
    maxHeight: 500,
    maxWidth: 500,
  },
};

function CardCar(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
{/* Set Your Budget Button */}
      <CardActions>
        <Button size="small" color="primary">
          <ModalBudget />
        </Button>
      </CardActions>
{/* Set Your Budget Button End*/}     

      <CardActionArea>
{/* Image */}
        <CardMedia
          className={classes.media}
          image="assets/images/car.jpg"
          title="Transportation"
        />

{/* Expense Type */}        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Transportation
          </Typography>
          <Typography component="p">
            Manage your transportation expenses with BET.
          </Typography>
        </CardContent>  
      </CardActionArea>
    </Card>
  );
}

CardCar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardCar);