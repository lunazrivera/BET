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
import ProgressBar from "/Users/damia/Desktop/BET/client/src/components/ProgressBar/ProgressBar.js";
import ModalTable from "/Users/damia/Desktop/BET/client/src/components/ModalBudget/ModalTable.js";


const styles = {
  card: {
    maxWidth: 500,
    maxHeight: 500,
  },
  media: {
    margin: 'auto',
    width: 250,
    height: 250,
  },
};

function CardEnt(props) {
  const { classes } = props;
  return (
    <Card className={(props.mancss)}>
{/* Set Your Budget Button */}
      <CardActions>
        <Button size="small" color="primary">
          <ModalBudget />
{/* ModalTable Practice Start */} 
          <ModalTable />
{/* ModalTable Practice End */}               
        </Button>
      </CardActions>
{/* Set Your Budget Button End*/}     
      <CardActionArea>
{/* Image */}
        <CardMedia
          className={classes.media}
          image="assets/images/entertainment.jpg"
          title="Entertainment"
        />
{/* Expense Type */}        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Entertainment
          </Typography>
          <Typography component="p">
            Manage your Entertainment expenses with BET.
          </Typography>
{/* ProgressBar */}        
          <ProgressBar /> 
        </CardContent>  
      </CardActionArea>
    </Card>
  );
}

CardEnt.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardEnt);