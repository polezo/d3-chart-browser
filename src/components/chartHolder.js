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
          suggestions: []
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
        return filteredArray.map(country => { return {name:country.date, population: country.value}     }
            ).reverse()  
        }
        }  
    

    onSuggestionSelected = (event,{suggestion}) => {
        const country = suggestion.id

        fetch(`http://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json`)
        .then((res) => res.json())
        .then((json) => {
        this.setState({currentCountry:json[1]});
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
          <PopulationRechart name={this.nameHelper()} currentCountry={this.dataHelper()}/>  
        </div>
        </div>
   </main>
    )
    }

}

export default ChartHolder