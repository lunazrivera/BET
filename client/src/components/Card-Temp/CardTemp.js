import React, {Component} from 'react';
import TableStr from './../TableTemp/TableTemp'
import {withStyles,Typography, Modal, LinearProgress, Button, CardHeader, Paper, Input, InputLabel,InputAdornment, FormControl} from "@material-ui/core";
// import TextField from '@material-ui/core/TextField';
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
               cardTotal: 0,
               totalBudget: 0,
               toggle: false,
               open: false,
               budget: "",
               expenses: [],
               errors: {},
          };
          this.handleToggle = this.handleToggle.bind(this);
          this.handleOpen = this.handleOpen.bind(this);
          this.handleClose = this.handleClose.bind(this);
          this.handleSubmitBudget = this.handleSubmitBudget.bind(this);
          this.onChange = this.onChange.bind(this);
          this.getTotalBudget = this.getTotalBudget.bind(this);
          this.getExpenses = this.getExpenses.bind(this);
     };

     //This are our lifecycle functions
     componentDidMount() {
          this.getTotalBudget();
          this.getExpenses("Running component DID MOUNT")
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
               value: parseFloat(this.state.budget)
          };
          this.saveBudget(newBudget);
          this.setState({ budget: '' });
          
     };

     //This is our functions to retrieve, saved budget and  saved expenses
     getTotalBudget = () =>  {
          axios.get(`/api/budgets/get-budget/${this.props.userIn.id}/${this.props.name}`).then((response) => {
               if (response.data) {
                    this.setState({totalBudget: response.data.value})
               }
               
          }).catch(err => console.log(err));
     };
     getExpenses = (message) => {
          this.setState({expenses: []});
          axios.get(`/api/expenses/get-expenses/${this.props.userIn.id}/${this.props.name}`).then((response) => {
               if(response.data) {
                    const expenses = this.state.expenses.concat(response.data);
                    this.setState({
                         expenses,
                    })
                    console.log(this.state.expenses)
               }
          })
     };


     saveBudget =(object) => {
          axios.post("/api/budgets/set-budget", object).then((response) => {
               console.log(response);
               this.setState({totalBudget: response.data.value});
               this.handleClose();
          })
     };

     //This is our expenses functions
     createExpenses = (expenseObject) => {
          axios.post("/api/expenses/create-expense", expenseObject).then(
               (response) => {
                    const total = this.state.expenses.concat(response.data).reduce((prior, ex) => ex.value + prior, 0);
                    const expenses = this.state.expenses.concat(response.data);
                    console.log(total);
                    this.setState({
                         expenses,
                         total
                    });
               });
     }

     render() {

          const {classes} = this.props;

          if (this.state.toggle) {
               return(
                    <Paper className={this.props.st}>
                         <div className={classes.container2}>
                              <div className={classes.imgContainer}>
                                   <img onClick={this.handleToggle} src={this.props.cardImg}   className={classes.media2} alt="card-logo" />
                              </div>
                         </div>
                              <TableStr categoryName={this.props.name} userIn={this.props.userIn} expensesArray={this.state.expenses} getExpenses={this.getExpenses} createExpenses={this.createExpenses}  />
                    </Paper>
               );
          } else {
               return(
                    <Paper className={this.props.st}>
                         <CardHeader  action={<Button variant='outlined' onClick={this.handleOpen} color='secondary'>Set Budget</Button>}>
                         
                         </CardHeader>

                         <div className={classes.container}>
                              <div className={classes.imgContainer}>
                                   <img onClick={this.handleToggle} src={this.props.cardImg} alt='' className={classes.media}/>
                              </div>

                              <div style={{display: 'flex', justifyContent: 'center'}}>
                                   <div>
                                        <span>{this.state.totalBudget > 0 ? <Typography style={{color: 'rgba(0,0,0,0.4)'}}> Budget amount: {this.state.totalBudget} </Typography> : ''}</span>
                                   </div>
                              </div>
                         </div>

                         <div className={classes.imgContainer}>
                              <LinearProgress 
                                   color='secondary'
                                   style={ this.state.totalBudget ? {background: 'green', transform: 'scaleY(2)', transformOrigin: 'bottom', } : {display: 'hidden'} } 
                                   variant='determinate'  value={0} 
                              />
                         </div>
                         
                         <Modal open={this.state.open} onClose={this.handleClose}>
                              <div style={getModalStyle()} className={classes.paper}>
                                   <div className={classes.container} style={{marginBottom: '6px'}}>
                                        <div className={classes.imgContainer}>
                                             <img onClick={this.handleToggle} src={this.props.cardImg} alt='' className={classes.media}/>
                                        </div>
                                   </div>
                                   <form onSubmit={this.handleSubmitBudget} style={{display: 'flex', justifyContent: 'center'}}>
                                        <FormControl fullWidth>
                                             <InputLabel htmlFor='budget'>Set A Budget Amount For {this.props.name}</InputLabel>
                                             <Input
                                                  id="budget"
                                                  className={classes.textField}
                                                  onChange={this.onChange}
                                                  value={this.state.budget}
                                                  startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                                                  style={{marginBottom: '6px'}}
                                             />

                                             <Button variant="contained" type="submit" color='secondary'   className={classes.button}>
                                                  Submit
                                             </Button>
                                        </FormControl>
                                   </form>
                              </div>
                         </Modal>
                         
                    </Paper>
               );
          }
     }
}

export default withStyles(styles)(CardStructure);