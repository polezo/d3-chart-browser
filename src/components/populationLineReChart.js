import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


export default class PopulationRechart extends Component {
  

    componentDidMount = () => {
        
        // if (this.state.currentCountry) {
        // let countryArray = this.state.currentCountry.map(currentCountry=>{
        //     if (currentCountry.value) {
        //     return { name:currentCountry.date, population: currentCountry.value }
        //     }
        //     console.log(countryArray)
        //     this.setState({data:countryArray})
        // })}
    }




  render() {
    return (
    <div className="row">
        <h1>{this.props.name}</h1>
    <ResponsiveContainer width='100%' height={300}>
      <LineChart
        data={this.props.currentCountry}
        margin={{
          top: 5, right: 20, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="population" stroke="#8884d8" activeDot={{ r: 8 }} />
        
      </LineChart>
      </ResponsiveContainer>
      </div>
    );
  }
}
