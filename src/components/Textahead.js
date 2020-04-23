import React, { Component } from "react";
import PropTypes from "prop-types";

class Textahead extends Component {
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
      // user input from textahead input field
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

  render() {
    const { filteredSuggestions, showSuggestions } = this.state;
    const suggestedItems = filteredSuggestions.map((suggestion) => {
      return (
        <li className="textahead__item" key={suggestion}>
          {suggestion}
        </li>
      );
    });

    const suggestedItemsComponent = <ul>{suggestedItems}</ul>;

    return (
      <div>
        Textahead
        <input
          type="text"
          name="textahead"
          onChange={this.handleUserInput.bind(this)}
        />
        {showSuggestions && suggestedItemsComponent}
      </div>
    );
  }
}

export default Textahead;
