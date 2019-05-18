import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {TextField, Button, InputAdornment, Input, InputLabel} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'



/// Sort and Selecting 
// let counter = 0;
// function createData(date, description, amount) {
//   counter += 1;
//   return { id: counter, date, description, amount };
// }

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'date', numeric: true, disablePadding: true, label: 'Date(MM/DD/YY)', align: 'center'},
  { id: 'description', numeric: false, disablePadding: false, label: 'Description', align: 'center'},
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount($)', align: 'right'},
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={true}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={'right'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = (props) => {
  const { numSelected, 
          categoryName, 
          classes, 
          onOpen, 
          paper, 
          modalState, 
          onClose, 
          onInputs, 
          description, 
          date,
          submit,
          amount,
          onDelete} = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {categoryName} Expenses
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={onDelete}>
              <DeleteIcon  />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add Transaction">
            <IconButton aria-label="Add Transaction" onClick={onOpen}>
              <Icon className={classes.icon}  style={{fontSize: 30}}color="secondary">
                      add_circle
              </Icon>
            </IconButton>
          </Tooltip>
        )}
      </div>

      <Modal open={modalState} onClose={onClose}>
        <div style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`, borderRadius: '10px' }} className={paper}>
            <Typography variant="h6" id="modal-title" align="center">
              Create expense for {categoryName}!
            </Typography>

            <form onSubmit={submit}>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{display:'flex', flexDirection: 'column', border: 'solid 1px rgba(0,0,0,0.1', borderRadius: '7px', padding: '10px', width: '100%'}}>
                  <TextField
                    style={{marginBottom: '30px', marginTop: '0px'}}
                    id="description"
                    label="Description"
                    value={description}
                    className={classes.textField}
                    onChange={onInputs}
                    helperText="Add some description"
                    margin="normal"
                    />
                  <TextField
                    style={{marginBottom: '30px', marginTop: '0px'}}
                    id="date"
                    label="Date"
                    type="date"
                    value={date}
                    onChange={onInputs}
                    helperText="Add date of expense"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  
                  <InputLabel htmlFor="amount">Amount</InputLabel>
                  <Input
                    style={{marginBottom: '30px', marginTop: '0px'}}
                    id="amount"
                    label="Amount"
                    value={amount}
                    onChange={onInputs}
                    startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                    />
                    
                    <Button variant="contained" type="submit" color='secondary' >
                    Submit
                    </Button>
                </div>
              </div>
                
            </form>
        </div>
      </Modal>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 'auto',
    minHeight: 'auto',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
},
});

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      order: 'asc',
      orderBy: 'date',
      selected: [],
      data: this.props.expensesArray,
      page: 0,
      rowsPerPage: 5,
      open: false,
      description: '',
      date: '',
      amount: 0,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.handleExpenseSubmit = this.handleExpenseSubmit.bind(this);
    this.handleExpenseDeletion = this.handleExpenseDeletion.bind(this);
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleOpen() {
    this.setState({open: true});
  };
  handleClose() {
    this.setState({open: false});
  };

  handleExpenseDeletion() {
    let selected = this.state.selected;
    
    axios.post("/api/expenses/delete-expenses", selected).then((response) => {
      this.props.getExpenses()
    }).catch(err => {console.log(err)})
  }

  handleExpenseSubmit(event) {
    event.preventDefault()
    let newExpense = {
      userId: this.props.userIn.id,
      category: this.props.categoryName,
      value: this.state.amount,
      date: this.state.date,
      description:this.state.description
    }

    this.props.createExpenses(newExpense)
    this.setState({amount: 0, description: '', date: ''})
    this.handleClose()
  }

  handleInputs(event) {
    this.setState({[event.target.id]: event.target.value});
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, expensesArray: data} = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          categoryName={this.props.categoryName} 
          onClose={this.handleClose}  
          modalState={this.state.open} 
          onOpen={this.handleOpen} 
          paper={classes.paper}
          description={this.state.description}
          date={this.state.date}
          amount={this.state.amount}
          onInputs={this.handleInputs}
          submit={this.handleExpenseSubmit}
          onDelete={this.handleExpenseDeletion} 
          />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={this.state.selected.length}
              order={this.state.order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n._id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n._id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n._id}
                      selected={isSelected}
                    >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell align="center" component="th" scope="row" padding="none">
                        {moment(n.date).format("MMMM DD YYYY")}
                        </TableCell>
                        <TableCell align="right">{n.description}</TableCell>
                        <TableCell align="right">{n.value}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}


ExpenseTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpenseTable);