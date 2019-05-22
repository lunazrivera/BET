import React, {Component} from 'react';

import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';
import {Line} from "react-chartjs-2";
import axios from 'axios';

const styles = {};

class Chart extends Component {

     constructor(props) {
          super(props);
          this.state = {
               chartData: {
                    labels: ['January', 'February', 'March','April','May','June','July','August','September','October','November','December'],
                    datasets: []
               }
          }
          this.getCarData = this.getCarData.bind(this);
     }

     getCarData = () => {
          
          console.log("running function")
          let category = "Car"
          let months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
          axios.get(`/api/expenses/get-data/${category}/${months}/${this.props.auth.user.id}`).then(function(response) {
               console.log(response);
          })
     }
     render() {
          return(
          <div style={{display: 'flex', flexDirection:'column', height:'90vh', justifyContent:'center'}}>
               <div className="chart" style={{background: 'white'}}>
                    <Line
                    width={100}
                    height={1000}
                    data={this.state.chartData}
                    options={{maintainAspectRatio: false,
                              title: {
                                   display: true,
                                   text: 'Monthly Expenses',
                                   fontSize: 25
                              }, 
                              legend: {
                                   position: 'bottom'
                              }}}
                    />
                    <button onClick={this.getCarData}>Car</button>
               </div>
          </div>
          )
     }
}

const mapStateToProps = state => ({
     auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(Chart)) 
