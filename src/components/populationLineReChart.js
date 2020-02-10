import React, { Component,Fragment } from 'react';
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

    lineHelper = (key,axis) => {
        switch (this.props.dataTypeToggle) {
            case "population": 
            return <Line yAxisId={axis} type="monotone" dataKey={key} stroke={axis=="left" ? "Black" : "Blue"}  />
            
            case "gdp":
            return <Line yAxisId={axis} type="monotone" dataKey={key} stroke={axis=="left" ? "Black" : "Blue"} />
            
            case "emmissions":
            return <Line yAxisId={axis} type="monotone" dataKey={key} stroke={axis=="left" ? "Black" : "Blue"} />
           
            default:
            return <Line yAxisId={axis} type="monotone" dataKey={key} stroke="Green"  />
        }
    }

    numberHelper = () => {
        switch (this.props.dataTypeToggle) {
            case "population": 
            return "in millions"
            case "gdp":
            return "in billions"
            case "emmissions":
            return ""
            default:
            return "in millions"
        }
    }


  dataAvailableHelper = () => {
      if (this.props.currentCountry2) {
        let newData = this.props.currentCountry.map((mainCountry,index) => {
            return {...mainCountry,[this.props.countryName2]:this.props.currentCountry2.find(country=>{
                return mainCountry.name===country.name
            }) ? 
            this.props.currentCountry2.find(country=>{
                return mainCountry.name===country.name
            })[`${this.props.countryName2}`]: null}}) 
        
          
        return (
            <div className="row">
                <h2>{this.props.name} {`${this.numberHelper()} || ${this.props.countryName}, `}<span className="country2-update-text">{this.props.countryName2}</span></h2>
                <h4>(ReChart Library)</h4>
            <ResponsiveContainer width='96%' height={400}>
              <LineChart
                data={newData}
                margin={{
                  top: 5, right: 20, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                {this.lineHelper(this.props.countryName,"left")}
                {this.lineHelper(this.props.countryName2,"right")}
                
                
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
