import React from 'react';
import countryCodes from './countryCodeJson.js'
import Autosuggest from 'react-autosuggest'
import '../App.css';
import { debounce } from 'throttle-debounce'


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
          currentCountry: {},
          suggestions: []
        }
      }


    componentDidMount = () => {

    }

 

    onSuggestionsFetchRequested = ({value}) => {
        this.setState({suggestions:countryCodes().filter(country=>country.name.toLowerCase().includes(value.toLowerCase()))})
    }

    updateText = (e) => {
        this.setState({value:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };

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
   </main>
    )
    }

}

export default ChartHolder