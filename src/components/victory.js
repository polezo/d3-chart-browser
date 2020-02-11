import React, { Component,Fragment } from "react";

import { VictoryBar, VictoryChart, VictoryTheme, VictoryContainer, VictoryGroup, VictoryLegend,VictoryLine} from "victory";

class VictoryChartz extends Component {
  
  numberHelper = () => {
    switch (this.props.dataTypeToggle) {
        case "population": 
        return "in millions"
        case "gdp":
        return ""
        case "emmissions":
        return ""
        case "unemployment":
        return ""
        default:
        return ""
    }
}

  dataAvailableHelper = () => {
    
    if (this.props.currentCountry2) {
     let newData = this.props.currentCountry.map(mainCountry => {
          return {x:mainCountry.name, y:mainCountry[`${this.props.countryName}`]}
      })
      let newData2 = this.props.currentCountry2.map(secondaryCountry => {
        return {x:secondaryCountry.name, y:secondaryCountry[`${this.props.countryName2}`]}
    })
      
        
      return (
        <div className="row">
        <h2>{this.props.name} {`${this.numberHelper()} || `}<b className="country1-update-text">{this.props.countryName}</b>, <b className="country2-update-text">{this.props.countryName2}</b></h2>
        <h4>(Victory Library, Material Theme)</h4>
        
        
        
        <div style={{ display: "flex",}}>
    <VictoryChart height={400} width={1200} style={{ parent: { maxWidth: "100%" } }}>
   
        {this.props.chartTypeToggle === "line" ?
         <VictoryGroup offset={20} style={{ data: { width: 20 } }}>
         <VictoryLine
         style={{ data: { stroke: "#8884d8" } }}
         data={newData}/> 
         <VictoryLine
         style={{ data: { stroke: "#82ca9d" } }}
         data={newData2}
       /> 
       </VictoryGroup> : <VictoryGroup offset={20} style={{ data: { width: 20 } }}>
       <VictoryBar
       style={{ data: { fill: "#8884d8" } }}
       data={newData}/> 
       <VictoryBar
       style={{ data: { fill: "#82ca9d" } }}
       data={newData2}
     /> 
     
      </VictoryGroup>}
      <VictoryLegend x={70} y={0}
          title="Legend"
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: "black", fill:"white" }, title: {fontSize: 20 } }}
          data={[
      { name: `${this.props.countryName}`, symbol: { fill: "#8884d8" } },
      { name: `${this.props.countryName2}`, symbol: { fill: "#82ca9d" } },
      
         ]}
          />
      </VictoryChart>
     
      </div>
     
      </div>
      )
     }  
    return <h2>Sorry, no data available for this view</h2>
}
  
  render() {
    return this.dataAvailableHelper()
  }
}

export default VictoryChartz

