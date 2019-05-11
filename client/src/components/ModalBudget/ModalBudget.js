import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextBoxBudget from '/Users/damia/Desktop/BET/client/src/components/ModalBudget/TextBox/TextBoxBudget.js';
import SubmitButton from '/Users/damia/Desktop/BET/client/src/components/Buttons/SubmitButton.js';



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>BUDGET</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Set Your Budget!
            </Typography>
{/* Import TextBoxBudget <TextBoxBudget /> */}
            <Typography variant="subtitle1" id="simple-modal-description">
            <TextBoxBudget />
            </Typography>
{/* Import SubmitButton <SubmitButton /> */}
            <SubmitButton />
          </div>
        </Modal>
      </div>
    );
  }
}


SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const ModalBudget = withStyles(styles)(SimpleModal);

export default ModalBudget;