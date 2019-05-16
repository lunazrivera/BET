import React, {Component} from 'react';
import TableStr from './../TableTemp/TableTemp'
import {withStyles, Typography, Modal, LinearProgress, Button, CardHeader, Paper} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
// import PropTypes from 'prop-types';

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
          textAlign: 'center',

     },
     paper: {
          position: 'absolute',
          width: theme.spacing.unit * 50,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing.unit * 4,
          outline: 'none',
     },
     textField: {
          marginLeft: theme.spacing.unit,
          marginRight: theme.spacing.unit,
        },
})

function getModalStyle() {
     const top = 50;
     const left = 50;

     return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
          borderRadius: '10px'
     };
}

class CardStructure extends Component {
     constructor(props) {
          super(props);
          this.state = {
               totalBudget: 0,
               toggle: false,
               open: false,
               budget: 0,
               expenses: [
                    {id:1, date: '2/5/2019', description: 'Water', amount: 700}
               ],
               errors: {},
          };
          this.handleToggle = this.handleToggle.bind(this);
          this.handleOpen = this.handleOpen.bind(this);
          this.handleClose = this.handleClose.bind(this);
          this.handleSubmitBudget = this.handleSubmitBudget.bind(this);
          this.onChange = this.onChange.bind(this);
          this.getTotalBudget = this.getTotalBudget.bind(this);
     };

     //This are our lifecycle functions
     componentDidMount() {
          this.getTotalBudget();
     };

     //This is the function that toggles which side of the card to render.
     handleToggle() {
          this.setState({toggle: !this.state.toggle});
     };
     

     //This are the function that open and closes our modals.
     handleOpen() {
          this.setState({open: true});
     };
     handleClose() {
          this.setState({open: false});
     };

     //this is our input handling function
     onChange = e => {
          this.setState({ 
               [e.target.id]: e.target.value
          })
     };

     //This function handles the submit in the modal of budget
     handleSubmitBudget(event) {
          event.preventDefault();
          let newBudget = {
               userId: this.props.userIn.id,
               category: this.props.name,
               value: this.state.budget
          };
          this.saveBudget(newBudget);
          this.setState({ budget: "" })
          
     };

     //This is our functions to retrieve, save budget
     getTotalBudget = () =>  {
          axios.get(`/api/budgets/get-budget/${this.props.userIn.id}/${this.props.name}`).then((response) => {
               console.log(response);
               if (response.data) {
                    this.setState({totalBudget: response.data.value})
               }
               
          }).catch(err => console.log(err));
     };
     saveBudget =(object) => {
          axios.post("/api/budgets/set-budget", object).then((response) => {
               console.log(response)
               this.setState({totalBudget: response.data.value})
               this.handleClose();
          })
     };

     //This is our expenses functions
     createExpenses = (userId, category, value, date, description) => {
          let newExpense = {
               userId,
               category,
               value,
               date,
               description
          }

          axios.post("/api/expenses/create-expense", newExpense).then(
               (response) => {
                    console.log(response);
                    
               });
     }

     render() {

          const {classes} = this.props;

          if (this.state.toggle) {
               return(
                    <Paper className={this.props.st}>
                         <div className={classes.container2}>
                              <div className={classes.imgContainer}>
                                   <img onClick={this.handleToggle} src={this.props.cardImg}   className={classes.media2} createExpenses={this.createExpenses} alt="card-logo" />
                              </div>
                         </div>
                              <TableStr categoryName={this.props.name} userIn={this.props.userIn} expensesArray={this.state.expenses} />
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
                              <LinearProgress 
                                   color='secondary'
                                   style={ +this.state.totalBudget ? {background: 'green', transform: 'scaleY(6)', transformOrigin: 'bottom', } : {display: 'hidden'} } 
                                   variant='determinate'  value={0} 
                              />
                         </div>
                         
                         <Modal open={this.state.open} onClose={this.handleClose}>
                              <div style={getModalStyle()} className={classes.paper}>
                                   <Typography variant="h6" id="modal-title" justify='center' align='center'>
                                        Set Your Budget for {this.props.name}!
                                   </Typography>
                                   
                                   <form bgt="budget" onSubmit={this.handleSubmit}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                             <div>
                                                  <TextField
                                                       id="budget"
                                                       label="$"
                                                       className={classes.textField}
                                                       onChange={this.onChange}
                                                       value={this.state.budget}
                                                       margin="normal"
                                                       variant="outlined"
                                                  />
                                             </div>
                                        </div>
                                   
                                   <div align='center'>
                                   <Button variant="contained" type="submit" color='secondary' className={classes.button}>
                                   Submit
                                   </Button>
                                   </div>
                                   <form onSubmit={this.handleSubmitBudget}>
                                        <TextField
                                             id="budget"
                                             label="$"
                                             className={classes.textField}
                                             onChange={this.onChange}
                                             value={this.state.budget}
                                             margin="normal"
                                             variant="outlined"
                                        />
                                        <div>
                                             <Button variant="contained" type="submit" color='secondary'  className={classes.button}>
                                                  Submit
                                             </Button>
                                        </div>
                                   </form>
                              </div>
                         </Modal>
                         
                    </Paper>
               );
          }
     }
}

export default withStyles(styles)(CardStructure);