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

    lineHelper = () => {
        switch (this.props.dataTypeToggle) {
            case "population": 
            return <Line type="monotone" dataKey="Population in Millions" stroke="#8884d8" activeDot={{ r: 8 }} />
            case "gdp":
            return <Line type="monotone" dataKey="GDP in Billions" stroke="Green" activeDot={{ r: 8 }} />
            case "emmissions":
            return <Line type="monotone" dataKey="CO2 in Metric Tons Per Capita" stroke="Red" activeDot={{ r: 8 }} />
            default:
            return <Line type="monotone" dataKey="Population in Millions" stroke="#8884d8" activeDot={{ r: 8 }} />
        }
    }


  dataAvailableHelper = () => {
      if (this.props.currentCountry) {
        return (
            <div className="row">
                <h2>{this.props.name}</h2>
                <h4>(ReChart Library)</h4>
            <ResponsiveContainer width='100%' height={400}>
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
                {this.lineHelper()}
                
                
              </LineChart>
              </ResponsiveContainer>
              </div>
        )
      }
      return <h2>Sorry, no data available for this view</h2>
  }


  render() {
    return this.dataAvailableHelper()
    ;
  }
}
