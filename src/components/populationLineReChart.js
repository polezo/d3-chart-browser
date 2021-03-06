import React, { Component,Fragment } from 'react';
import {
  LineChart, BarChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar} from 'recharts';


export default class PopulationRechart extends Component {
  

    lineHelper = (key,axis) => {
        switch (this.props.chartTypeToggle) {
            case "line":
                    return <Line yAxisId={axis} type="monotone" dataKey={key} stroke={axis=="left"? "#8884d8" : "#82ca9d"} />

            case "bar":
                return <Bar type="monotone" dataKey={key} fill={axis=="left" ? "#8884d8" : "#82ca9d"} />
                    
        }
    }

    numberHelper = () => {
        switch (this.props.dataTypeToggle) {
            case "population": 
            return "in millions"
            default:
            return ""
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
                <h2>{this.props.name} {`${this.numberHelper()} || `}<b className="country1-update-text">{this.props.countryName}</b>, <b className="country2-update-text">{this.props.countryName2}</b></h2>
                <h4>(ReChart Library)</h4>
            <ResponsiveContainer width='98%' height={400}>
              {this.props.chartTypeToggle === "line" ? <LineChart
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
              </LineChart> : <BarChart
                data={newData}
                margin={{
                  top: 5, right: 20, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis  />
                
                <Tooltip />
                <Legend />
                {this.lineHelper(this.props.countryName,"left")}
                {this.lineHelper(this.props.countryName2,"right")}
              </BarChart>}
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
