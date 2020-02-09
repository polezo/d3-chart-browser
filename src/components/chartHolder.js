import React from 'react';
import countryCodes from './countryCodeJson.js'
import Autosuggest from 'react-autosuggest'
import PopulationRechart from './populationLineReChart.js'
import '../App.css';



const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

class ChartHolder extends React.Component {

    constructor() {
        super();
        this.state = {
          value: '',
          currentCountry: null,
          currentSuggestion:{
            "id": "USA",
            "iso2Code": "US",
            "name": "United States",
            "region": {
              "id": "NAC",
              "iso2code": "XU",
              "value": "North America"
            },
            "adminregion": {
              "id": "",
              "iso2code": "",
              "value": ""
            },
            "incomeLevel": {
              "id": "HIC",
              "iso2code": "XD",
              "value": "High income"
            },
            "lendingType": {
              "id": "LNX",
              "iso2code": "XX",
              "value": "Not classified"
            },
            "capitalCity": "Washington D.C.",
            "longitude": "-77.032",
            "latitude": "38.8895"
          },
          suggestions: [],
          dataTypeToggle:"population"
        }
      }
      
    componentDidMount = () => {
        fetch("http://api.worldbank.org/v2/country/usa/indicator/SP.POP.TOTL?format=json")
        .then((res) => res.json())
        .then((json) => {
        this.setState({currentCountry:json[1]});
        });
    }

    dataHelper = () => {
        let rangeAdjustment
        let keyAdjustment
        switch (this.state.dataTypeToggle) {
            case "population": 
                rangeAdjustment = 1000000
                keyAdjustment = "Population in Millions"
            break;
            case "gdp":
                rangeAdjustment = 1000000000
                keyAdjustment = "GDP in Billions"
            break;
            default:
                rangeAdjustment = 1000000
                keyAdjustment = "Population in Millions"
            break;
        }

        let filteredArray = null
        if (this.state.currentCountry) {
            let i = 0
              filteredArray = this.state.currentCountry.filter(currentCountry=>{
            if (currentCountry.value && i < 20) {
                i++
                return currentCountry
            }
            })}
         if (filteredArray)  {
        return filteredArray.map(country => { return {name:country.date, [keyAdjustment]: (country.value/rangeAdjustment)}     }
            ).reverse()  
        }
        }  
    

    onSuggestionSelected = (event,{suggestion}) => {
        const country = suggestion.id
        
        let indicator
        switch (this.state.dataTypeToggle) {
            case "population": 
                indicator = "SP.POP.TOTL"
            break;
            case "gdp":
                indicator = "NY.GDP.MKTP.CD"
            break;
            default:
                indicator = "SP.POP.TOTL"
            break;
        }
        
        fetch(`http://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json`)
        .then((res) => res.json())
        .then((json) => {
        this.setState({currentCountry:json[1],currentSuggestion:suggestion});
        });
    }

    onSuggestionsFetchRequested = ({value}) => {
        this.setState({suggestions:countryCodes().filter(country=>country.name.toLowerCase().includes(value.toLowerCase()))})
    }

    updateText = (event, { newValue }) => {
        this.setState({ value: newValue })
      }

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };

      nameHelper = () => {
          if (this.state.currentCountry) {
            return `${this.state.currentCountry[0].country.value} ${this.state.currentCountry[0].indicator.value} `
          }
          return null
      }

      setDataTypeToggle = (e) => {
        this.setState({dataTypeToggle:e.target.value})
        setTimeout(()=>this.onSuggestionSelected(e,{suggestion:this.state.currentSuggestion}),10)
          
      }

    render = () => {
      
        const { currentCountry, suggestions, value } = this.state

    const inputProps = {
        placeholder: 'Type a country name',
        value,
        onChange: this.updateText,
        className: 'shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline mb-4'
        };
        
        
        return (
    <main>
        <div className="container">
        <div className="row">
        <label formFor="dataType">Choose data:</label>
            <select onChange={this.setDataTypeToggle} id="dataType">
            <option value="population">Population</option>
            <option value="gdp">GDP</option>
            </select>
        </div>
        <div className="row">
    <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />
        </div>
        <div className="row">
          <PopulationRechart dataTypeToggle={this.state.dataTypeToggle} name={this.nameHelper()} currentCountry={this.dataHelper()}/>  
        </div>
        </div>
   </main>
    )
    }

}

export default ChartHolder