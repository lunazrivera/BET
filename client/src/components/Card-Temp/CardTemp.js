import React, {Component} from 'react';
import TableStr from './../TableTemp/TableTemp'
import {withStyles, Typography, Modal, LinearProgress, Button, CardHeader, Paper} from "@material-ui/core";

const styles = theme => ({
     card: {
          maxWidth: 400,
     },
     media: {
          width: 100,
     },

     media2: {
          width: 100,
     },

     action: {
          border: 'solid 1px black',
          
     },
     container: {
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
     },
     container2: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
     },
     imgContainer: {
          textAlign: 'center'
     },
     paper: {
          position: 'absolute',
          width: theme.spacing.unit * 50,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing.unit * 4,
          outline: 'none',
     }
})

function getModalStyle() {
     const top = 50;
     const left = 50;

     return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
     };
}

class CardStructure extends Component {
     constructor(props) {
          super(props);
          this.state = {
               toggle: false,
               open: false,
               budget: null,
               expenses: null,
          };
          this.handleToggle = this.handleToggle.bind(this);
          this.handleOpen = this.handleOpen.bind(this);
          this.handleClose = this.handleClose.bind(this);
     };
     //This is the function that toggles which side of the card to render.
     handleToggle() {
          this.setState({toggle: !this.state.toggle});
     }
     //This are the function that open and closes our modals.
     handleOpen() {
          this.setState({open: true});
     }

     handleClose() {
          this.setState({open: false});
     }

     render() {

          const {classes} = this.props;

          if (this.state.toggle) {
               return(
                    <Paper className={this.props.st}>
                         <div className={classes.container2}>
                              <div className={classes.imgContainer}>
                                   <img onClick={this.handleToggle} src={this.props.cardImg}   className={classes.media2} alt=''/>
                              </div>
                         </div>
                              <TableStr name={this.props.name} />
                    </Paper>
               );
          } else {
               return(
                    <Paper className={this.props.st}>
                         <CardHeader  action={<Button variant='outlined' onClick={this.handleOpen} color='secondary'>Set Budget</Button>} />

                         <div className={classes.container}>
                              <div className={classes.imgContainer}>
                                   <img onClick={this.handleToggle} src={this.props.cardImg} alt='' className={classes.media}/>
                              </div>
                         </div>

                         <div className={classes.imgContainer}>
                              <LinearProgress color='secondary' style={{background: 'green'}} variant='determinate'  value={30} />
                         </div>
                         
                         <Modal open={this.state.open} onClose={this.handleClose}>
                              <div style={getModalStyle()} className={classes.paper}>
                                   <Typography variant="h6" id="modal-title">
                                        Set Your Budget for {this.props.name}!
                                   </Typography>
                              {/* Import TextBoxBudget <TextBoxBudget /> */}
                                   <Typography variant="subtitle1" id="simple-modal-description">
                                        {/* <TextBoxBudget /> */}
                                   </Typography>
                              {/* Import SubmitButton <SubmitButton /> */}
                                   {/* <SubmitButton /> */}
                              </div>
                         </Modal>
                         
                    </Paper>
               );
          }
     }
}

export default withStyles(styles)(CardStructure);