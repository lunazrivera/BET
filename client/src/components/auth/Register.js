// requiring dependencies for the user of react, react-router-dom and so on
import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {registerUser} from "./../../actions/authActions"
import classnames from "classnames";

//Creating a class component that'll handle the register process
class Register extends Component {
     //setting up constructor for the use of state
     constructor() {
          super();
          this.state = {
               name: "",
               email: "",
               password: "",
               password2: "",
               errors: {}
          };
     }
     //Running lifecycle functions
     componentDidMount() {
          //If logged in and user navigates to Register page, should redirect the to dashboard
          if (this.props.auth.isAuthenticated) {
               this.props.history.push("/dashboard");
          }
     }

     componentWillReceiveProps(nextProps) {
          if (nextProps.errors) {
               this.setState({
                    errors: nextProps.errors
               });
          }
     }

     onChange = e => {
          this.setState({[e.target.id]: e.target.value});
     };

     onSubmit = e => {
          e.preventDefault();

          const newUser = {
               name: this.state.name,
               email: this.state.email,
               password: this.state.password,
               password2: this.state.password2
          };

          this.props.registerUser(newUser, this.props.history);
          // console.log(newUser);
     };

     render() {
          const {errors} = this.state;

          return (
               <div style={{height: "87vh",display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
               <div className="container" style={{border: '1px solid rgba(0,0,0,0.3)', background: 'white', borderRadius: '5px', width: '60%' }}>
                    <div className="row">
                         <div className="col s8 offset-s2 center">
                              <Link to="/" className="btn-flat waves-effect">
                                   <i className="material-icons left">keyboard_backspace</i>
                                   Back to home
                              </Link>

                              <div className="col s12" style={{paddingLeft:"11.250px"}}>
                                   <h4>
                                        <b>Register</b> below
                                   </h4>

                                   <p className="grey-text text-darken-1">Already have an account?
                                   <Link to="/login">Log In</Link></p>
                                   
                              </div>
                              <form noValidate onSubmit={this.onSubmit}>
                                   <div className="input-field col s12">
                                        <input onChange={this.onChange} value={this.state.name} error={errors.name} id="name" type="text" className={classnames("", {invalid: errors.name})} />
                                        <label htmlFor="name">Name</label>
                                        <span className="red-text">{errors.name}</span>
                                   </div>

                                   <div className="input-field col s12">
                                        <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" type="email" className={classnames("", {invalid: errors.email})} />
                                        <label htmlFor="email">Email</label>
                                        <span className="red-text">{errors.email}</span>
                                   </div>

                                   <div className="input-field col s12">
                                        <input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" className={classnames("", {invalid: errors.password})} />
                                        <label htmlFor="password">Password</label>
                                        <span className="red-text">{errors.password}</span>
                                   </div>
                                   <div className="input-field col s12">
                                        <input onChange={this.onChange} value={this.state.password2} error={errors.password2} id="password2" type="password" className={classnames("", {invalid: errors.password2})} />
                                        <label htmlFor="password2">Confirm Password</label>
                                        <span className="red-text">{errors.password2}</span>
                                   </div>

                                   <div className="col s12" style={{paddingLeft: "11.250px"}}>
                                        <button style={{width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem"}} type="submit" className="btn btn-large waves-effect waves-light hoverable red accent-3">Sign Up</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
               </div>
          );
     }
}

Register.propTypes = {
     registerUser: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired,
     errors: PropTypes.object.isRequired
};

//This will allow us to call this.props.auth or this.props.errors within this file. (Register.js)
const mapStateToProps = state => ({
     auth: state.auth,
     errors: state.errors
})

//Here connect is connecting our react component to our Redux Store provided by the Provider component
export default connect(
     mapStateToProps, {registerUser}
)(withRouter(Register));