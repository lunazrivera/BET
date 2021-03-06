import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "./../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
     constructor() {
          super();
          this.state = {
               email: "",
               password: "",
               errors: {}
          };
     }

     componentDidMount() {
          //If logged in and user navigates to Register page, should redirect  them to dashboard
          if (this.props.auth.isAuthenticated) {
               this.props.history.push("/dashboard");
          }
     }

     componentWillReceiveProps(nextProps) {
          if (nextProps.auth.isAuthenticated) {
               this.props.history.push("/dashboard"); //Push user to dashboard when they login
          }
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

          const userData = {
               email: this.state.email,
               password: this.state.password
          };

          this.props.loginUser(userData); //since we handle the redirect within our component, we dont need to pass in this.props.history as a parameter.
     };

     render() {
          const {errors} = this.state;

          return(
               <div style={{height: "87vh",display: 'flex', flexDirection: 'column', justifyContent:'center', border: '1px solid black'}}>
               <div className="container" style={{border: '1px solid rgba(0,0,0,0.3)', background: 'white', borderRadius: '5px', width: '60%' }}>
                    <div className="row">
                         <div className="col s8 offset-s2 center">
                              <Link to="/" className="btn-flat waves-effect">
                                   <i className="material-icons left">keyboard_backspace</i>
                                   Back to home
                              </Link>
                              <div className="col s12" style={{paddingLeft: "11.250px"}}>
                                   <h4>
                                        <b>Log in</b> below
                                   </h4>

                                   <p className="grey-text text-darken-1">Don't have an account? <Link to="/register">Register</Link></p>

                              </div>

                              <form noValidate onSubmit={this.onSubmit}>
                                   <div className="input-field col s12">
                                        <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" type="email" className={classnames("", {invalid: errors.email || errors.emailnotfound})} />
                                        <label htmlFor="email">Email</label>
                                        <span className="red-text">{errors.email} {errors.emailnotfound}</span>
                                   </div>

                                   <div className="input-field col s12">
                                        <input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" className={classnames("", {invalid: errors.password || errors.passwordincorrect})} />
                                        <label htmlFor="password">Password</label>
                                        <span className="red-text">{errors.password} {errors.passwordincorrect}</span>
                                   </div>

                                   <div className="col s12" style={{paddingLeft: "11.250"}}>
                                        <button style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem"}} type="submit" className="btn btn-large waves-effect waves-light hoverable red accent-3">Log in</button>
                                   </div>
                              </form>

                         </div>
                    </div>
               </div>
               </div>
          );
     }
}

Login.propTypes = {
     loginUser: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired,
     errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
     auth: state.auth,
     errors: state.errors
});



export default connect(mapStateToProps, {loginUser})(Login);