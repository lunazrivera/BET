import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import GridContainer from "./../layout/GridContainer"

class Dashboard extends Component {
     render() {
          console.log(this.props.auth);
          const {user} = this.props.auth;
          console.log("coming from dashboard");
          console.log(user);
          return(
               <div>
                    <GridContainer />
               </div>
          );
     }
}

Dashboard.propTypes = {
     auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
     auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);