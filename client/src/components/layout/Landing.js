import React, { Component } from "react";
import { Link } from "react-router-dom";
import Background from "/Users/damia/Desktop/BET/client/src/components/assets/images/finance_bg.jpg";


class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-container"
                         style={{"background-image": `url(${Background})`, 
                                 width: "100%",                 
                                 backgroundSize: "cover",                 
                                 overflow: "hidden",
                                }}
                                 >
          <div className="container">
          <div className="page-container"
                         style={{"background-color": "white",
                                 "opacity": "0.9",
                                 width: "100%",                            
                                }}
                                 ></div>
            <div className="row">
              <div className="col s12 center-align">
{/* Align Center Start */}                
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                >
{/* Align Center End */} 
                  <h4>
                    <b>Track</b> your daily expenses and set your budgets. Bet on
                    us to make the smarter move.
                  </h4>
{/* <p className="flow-text grey-text text-darken-1">Create a (minimal) full-stack app with user authentication via passport and JWTs</p> */}
                  <br />
                  
                <Link
                  to="/register"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable red accent-3"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  style={{
                    marginLeft: "2rem",
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large waves-effect white hoverable black-text"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      
      </React.Fragment>
    );
  }
}

export default Landing;
