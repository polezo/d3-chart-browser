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
          "currentCountry": null,
          "currentSuggestion":{
            "id": "BRA",
            "iso2Code": "Br",
            "name": "Brazil",
          },
          "currentCountry2": null,
          "currentSuggestion2":{
            "id": "SYR",
            "iso2Code": "SY",
            "name": "Syrian Arab Republic",
          },
          suggestions: [],
          dataTypeToggle:"population",
          checked1:true,
          checked2:false
        }
      }
      
    componentDidMount = () => {
        fetch("https://api.worldbank.org/v2/country/bra/indicator/SP.POP.TOTL?format=json")
        .then((res) => res.json())
        .then((json) => {
        this.setState({"currentCountry":json[1]},this.fetchCountry2);
        });
    }

    fetchCountry2 = () => {
        fetch("https://api.worldbank.org/v2/country/syr/indicator/SP.POP.TOTL?format=json")
        .then((res2) => res2.json())
        .then((json2) => {
        this.setState({"currentCountry2":json2[1]});
        });
    }

    dataHelper = (aCountry = null,aNumber) => {
        let rangeAdjustment
        
        switch (this.state.dataTypeToggle) {
            case "population": 
                rangeAdjustment = 1000000
            break;
            case "gdp":
                rangeAdjustment = 1000000000
            break;
            case "emmissions":
                rangeAdjustment = 1
            break;
            default:
                rangeAdjustment = 1000000
            break;
        }

        let thisName
        let filteredArray

        if (aNumber == 1) {
            thisName = this.state["currentSuggestion2"].name
        } else {
            thisName = this.state["currentSuggestion"].name
        }

        if (aCountry) {
            let i = 0
              filteredArray = aCountry.filter(currentCountry=>{
            if (currentCountry.value && i < 20) {
                i++
                return currentCountry
            }
            })}
         if (filteredArray)  {
        return filteredArray.map(country => { return {name:country.date, [thisName]: ((country.value/rangeAdjustment))}     }
            ).reverse()  
        }
        }  
    

    onSuggestionSelected = (event,{suggestion},setCountry2=this.state.checked1,doubleSet=false) => {
        let suggestionToSet
        let countryToSet
        suggestionToSet = setCountry2 ? "currentSuggestion" : "currentSuggestion2"
        countryToSet = setCountry2 ? "currentCountry" : "currentCountry2"

        
        let country = suggestion.id
        
        let indicator
        switch (this.state.dataTypeToggle) {
            case "population": 
                indicator = "SP.POP.TOTL"
            break;
            case "gdp":
                indicator = "NY.GDP.MKTP.CD"
            break;
            case "emmissions":
                indicator = "EN.ATM.CO2E.PC"
            break;
            default:
                indicator = "SP.POP.TOTL"
            break;
        }
        
        fetch(`https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json`)
        .then((res) => res.json())
        .then((json) => {
        this.setState({[countryToSet]:json[1],[suggestionToSet]:suggestion});
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

      chartNameHelper = () => {
          if (this.state["currentCountry"]) {
            return `${this.state["currentCountry"][0].indicator.value} `
          }
          return null
      }

      setDataTypeToggle = (e) => {
        this.setState({dataTypeToggle:e.target.value})
        setTimeout(()=>this.onSuggestionSelected(e,{suggestion:this.state["currentSuggestion"]},this.state.checked1),10)
        setTimeout(()=>this.onSuggestionSelected(e,{suggestion:this.state["currentSuggestion2"]},this.state.checked2,true),11)
          
      }

      updateRadio = (event) => {
          this.setState({checked1:!this.state.checked1,checked2:!this.state.checked2})
      }

    render = () => {
      
        const { currentCountry, suggestions, value } = this.state

    const inputProps = {
        placeholder: `Begin typing a country name`,
        value,
        onChange: this.updateText,
        className: 'shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline mb-4'
        };
        
        
        return (
    <main>
        <div className="container">
        <div className="row push-down">
        
        </div>
        <div className="row push-up">
        
        <div className="col-md-4 data-dropdown">
            <label formFor="dataType">Choose data:</label>
            <select onChange={this.setDataTypeToggle} id="dataType">
            <option value="population">Population</option>
            <option value="gdp">GDP</option>
            <option value="emmissions">Emmissions</option>
            </select></div>
        <div className="col-md-4">
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
        <div className="col-md-4 country-radio">  <input checked={this.state.checked1} type='radio' name='country1' value='country1' onChange={this.updateRadio}></input><span className="country1-update-text"> Update Country 1 </span><br></br>
        <input checked={this.state.checked2} type='radio' name='country2' value='country2' onChange={this.updateRadio}></input> <span className="country2-update-text">Update Country 2</span></div>
      
        </div>
        
        <div className="row">
          <PopulationRechart dataTypeToggle={this.state.dataTypeToggle} name={this.chartNameHelper()} currentCountry={this.dataHelper(this.state["currentCountry"],0)} currentCountry2={this.dataHelper(this.state["currentCountry2"],1)} countryName={this.state.currentSuggestion.name} countryName2={this.state.currentSuggestion2.name}/>  
        </div>
        </div>
   </main>
    )
    }

}

export default ChartHolder