import React, {Component} from "react";
import {Link} from "react-router-dom";



class Landing extends Component {
     render() {
          return(
               
               <div style={{height: "87vh",display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
               <div  className="container valign-wrapper" style={{border: '1px solid rgba(0,0,0,0.3)', background: 'white', borderRadius: '5px', width: '60%' }}>
                    <div className="row">
                         <div className="col s12 center-align">
                              
                              <h4>
                                   Bet on us to make the smarter move.
                              </h4>
                              
                              <br />

                              <Link to="/register" style={{width: "150px", borderRadius: "3px", letterSpacing: "1.5px"}} className="btn btn-large waves-effect waves-light hoverable red accent-3">Register</Link>
                              
                              <Link to="/login" style={{marginLeft: "2rem", width: "150px", borderRadius: "3px", letterSpacing: "1.5px"}} className="btn btn-large waves-effect white hoverable black-text">Log In</Link>

                         </div>
                    </div>
               </div>
               </div>
               
               
          );
     }
}

export default Landing;