import React, {Component} from "react";
import {Link} from "react-router-dom";
import betbg from './../assets/images/betbg.png'


class Landing extends Component {
     render() {
          return(
               
               <div style={{height: "87vh",display: 'flex', flexDirection: 'column', justifyContent:'center', border: '1px solid black'}}>
               <div  className="container valign-wrapper">
                    <div className="row">
                         <div className="col s12 center-align">
                              
                              
                              <h4>
                                   <b>Track</b> your daily expenses and set your budgets. Bet on us to make the smarter move.
                              </h4>
                              
                              {/* <p className="flow-text grey-text text-darken-1">Create a (minimal) full-stack app with user authentication via passport and JWTs</p> */}
                              
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