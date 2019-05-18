import React, {Component} from "react";



import {connect} from "react-redux";
import PropTypes from "prop-types";

import {logoutUser} from "../../actions/authActions";
import logo from "./../assets/images/bet.png"

//Importing dependencies for proper use of Material UI
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
     border: {
          border: '1px solid black'
     },
     logo: {
          width: 100,
     },
     navBar: {
          background: 'white'
     },
     rightAlign: {
          flex: 1,
          textAlign: 'right'
     },
     // root: {
     //   flexGrow: 1,
     // },
     grow: {
     flex: 1,

     },
     menuButton: {
     marginLeft: -12,
     marginRight: 20,
     },
     justify: {
          justifyContent: "space-between"
     },
     testing: {
          background: 'black'
     }
};

class Navbar extends Component {

     state = {
          anchorEl: null,
     };

     handleClick = event => {
          this.setState({anchorEl: event.currentTarget});
     };

     handleClose = () => {
          this.setState({ anchorEl: null });
     };

     onLogoutClick = e => {
          e.preventDefault();
          this.props.logoutUser();
     };

     render() {

          const {anchorEl} = this.state;
          const {classes} = this.props

          if (this.props.auth.isAuthenticated) {
               console.log('this is authenticated nav')
               console.log(this.props);
          return (
               <AppBar position="static" className={classes.navBar}>

                    <Toolbar className={classes.justify}>
                         
                         <div className={classes.grow}>
                              <Typography  variant="h6" className={classes.grow}>Welcome, {this.props.auth.user.name}</Typography>
                         </div>
                         <div className={classes.grow}>
                              <Typography color="inherit" align="center" className={classes.grow}>
                              <img src={logo} className={classes.logo} alt="logo"/>
                              </Typography>
                         </div>
                         <div className={classes.rightAlign}>
                              <IconButton onClick={this.handleClick} >
                                   <MenuIcon aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" className={classes.grow}/>
                              </IconButton>
                         </div>
                         <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                              <MenuItem onClick={this.handleClose}>Link Account</MenuItem>
                              <MenuItem onClick={this.onLogoutClick}>Logout</MenuItem>
                         </Menu>    
                         
                    </Toolbar>

               </AppBar>
          );
          } else {
          return (
          <div className={classes.root}>
               <AppBar position="static" className={classes.navBar}>
                    <Toolbar>
                         <Typography align="center" color="inherit" className={classes.grow}>
                              <img src={logo} className={classes.logo} alt="logo" />
                         </Typography>
                    </Toolbar>
               </AppBar>
          </div>
          );
          }
     }
}

Navbar.propTypes = {
     classes: PropTypes.object.isRequired,
     logoutUser: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
     auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withStyles(styles)(Navbar)) 
