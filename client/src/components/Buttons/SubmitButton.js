import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


/// SubmitButton Styles
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


/// SubmitButton Function 
function SubmitButton(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button}>
        SUBMIT
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
    </div>
  );
}


/// SubmitButton.propTypes
SubmitButton.propTypes = {
  classes: PropTypes.object.isRequired,
};


/// SubmitButton export default
export default withStyles(styles)(SubmitButton);