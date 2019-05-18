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
               total: 0,
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
          this.saveCardTotal = this.saveCardTotal.bind(this);
          this.getDataFromDeletedExpense = this.getDataFromDeletedExpense.bind(this);
     };

     //This are our lifecycle functions
     componentDidMount() {
          this.getTotalBudget();
          this.getExpenses()
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
                    this.setState({totalBudget: response.data.value,
                         // total: response.data.cardTotal
                    })
               }
               
          }).catch(err => console.log(err));
     };
     getExpenses = () => {
          this.setState({expenses: []});
          axios.get(`/api/expenses/get-expenses/${this.props.userIn.id}/${this.props.name}`).then((response) => {
               if(response.data) {
                    const expenses = this.state.expenses.concat(response.data);
                    const total = this.state.expenses.concat(response.data).reduce((prior, ex) => ex.value + prior, 0);
                    this.setState({
                         expenses,
                         total
                    })
                    console.log();
                    console.log("Coming from getExpenses function from CardTemp");
                    console.log(this.state.expenses)
               }
          })
     };

     //Handling card total
     getDataFromDeletedExpense = (expenseId) => {
          axios.post("/api/expenses/get-value", expenseId).then((response) => {
               console.log();
               console.log("Coming from getDataFromDeletedExpense function");
               console.log(response);
               var deletedValue = response.data.reduce((total, current) => {
                    return total + current.value
               }, 0)
               // this.setState({total: this.state.total - deletedValue})
               console.log('total to delete', deletedValue)
               // forEach(response.data.value)
          }).catch(err => console.log(err))
     };
     saveCardTotal = () => {
          let total = {
               userId: this.props.userIn.id,
               category: this.props.name,
               cardTotal: this.state.total
          };
          axios.post('/api/budgets/save-cardtotal', total).then((response) => {
               console.log();
               console.log("Coming from saveCardTotal function in CardTemp");
               console.log(response);
               
          }).catch(err => console.log(err))
     }

     saveBudget =(object) => {
          axios.post("/api/budgets/set-budget", object).then((response) => {
               console.log()
               console.log("Coming from saveBudget function in CardTemp!")
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
                    console.log();
                    console.log("Coming from creatExpenses function in CardTemp!");
                    console.log('totalin create expenses', total);
                    this.setState({
                         expenses,
                         total
                    });
                    this.saveCardTotal();
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
                              <TableStr categoryName={this.props.name} userIn={this.props.userIn} expensesArray={this.state.expenses} getExpenses={this.getExpenses} createExpenses={this.createExpenses} deletedData={this.getDataFromDeletedExpense} />
                    </Paper>
               );
          } else {
               // debugger;
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
                                        <span>{this.state.totalBudget > 0 ? <Typography style={{color: 'rgba(0,0,0,0.4)'}}> Budget amount: ${this.state.totalBudget} </Typography> : ''}</span>
                                   </div>
                              </div>
                         </div>

                         <div className={classes.imgContainer}>
                              <LinearProgress 
                                   color='secondary'
                                   style={ this.state.totalBudget ? {background: 'rgb(199,234,70)', transform: 'scaleY(2)', transformOrigin: 'bottom', } : {display: 'hidden'} } 
                                   variant='determinate'  
                                   value={Math.min(Math.ceil((this.state.total/this.state.totalBudget) * 100), 100)} 
                                   
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