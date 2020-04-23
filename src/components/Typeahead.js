import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Typeahead.scss";

class Typeahead extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
  };

  static defaultProps = {
    suggestions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      // index of active suggestion
      activeSuggestion: 0,
      // list of matched suggestions
      filteredSuggestions: [],
      // show suggestions based on filtered suggestions
      showSuggestions: false,
      // user input from Typeahead input field
      userInput: "",
    };
  }

  handleUserInput = (e) => {
    const { suggestions } = this.props;
    // need to define here so that filteredSugggestions can have this in scope
    // and doesn't compare to the state
    const userInput = e.currentTarget.value;

    // If shouldShowSuggestion is true, then return the suggestion
    // const filteredSuggestions = suggestions.filter((suggestion) => {
    //   // compare userInput to suggestion

    //   const shouldShowSuggestion =
    //     suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1;

    //   if (shouldShowSuggestion) {
    //     return suggestion;
    //   }
    // });

    // This can be written like this...
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    const shouldShowSuggestions =
      userInput.length > 0 && filteredSuggestions.length > 0;

    this.setState({
      userInput: e.currentTarget.value,
      filteredSuggestions,
      showSuggestions: shouldShowSuggestions,
    });
  };

  handleKeyDown = (e) => {
    const { filteredSuggestions, activeSuggestion } = this.state;
    // console.log(filteredSuggestions);

    if (e.keyCode === 13) {
      console.log("enter");
    } else if (e.keyCode === 40) {
      if (activeSuggestion > filteredSuggestions.length - 1) {
        return;
      }

      this.setState({
        activeSuggestion: activeSuggestion + 1,
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === -1) {
        return;
      }

      this.setState({
        activeSuggestion: activeSuggestion - 1,
      });
    }
  };

  render() {
    const { filteredSuggestions, showSuggestions, userInput } = this.state;
    const suggestedItems = filteredSuggestions.map((suggestion) => {
      return (
        <li className="typeahead__item" key={suggestion}>
          <a className="typeahead__item-link">{suggestion}</a>
        </li>
      );
    });

    const suggestedItemsComponent = (
      <ul className="typeahead__items">{suggestedItems}</ul>
    );

    return (
      <div className="typeahead__container">
        <input
          type="text"
          name="typeahead"
          className="typeahead__input"
          onChange={this.handleUserInput.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          value={userInput}
        />
        {showSuggestions && suggestedItemsComponent}
      </div>
    );
  }
}

export default Typeahead;
