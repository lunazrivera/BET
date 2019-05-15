import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import GridContainer from "./../layout/GridContainer"

class Dashboard extends Component {
     render() {

          const {user} = this.props.auth;

          return(
               <div>
                    <GridContainer userIn={user} />
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