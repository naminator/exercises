import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Typeahead.scss';

class Typeahead2 extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array),
    };

    static defaultProps = {
        suggestions: [],
    };

    constructor(props) {
        super(props);

        this.state = {
            userInput: '',
            activeSuggestion: 0,
            userSuggestions: [],
            showSuggestions: false,
        };
    }

    handleUserInput = (e) => {
        const { suggestions } = this.props;
        const currentTarget = e.currentTarget.value;
        this.setState({
            userInput: currentTarget,
            showSuggestions: true,
        });

        const userSuggestions = suggestions.filter((suggestion) => {
            return suggestion.toLowerCase().includes(currentTarget);
        });

        this.setState({
            userSuggestions,
        });

        if (!e.currentTarget.value) {
            this.setState({
                showSuggestions: false,
            });
        }
    };

    handleKeyDown = (e) => {
        const { activeSuggestion, userSuggestions } = this.state;

        if (e.keyCode === 38) {
            if (activeSuggestion === -1) {
                return;
            }
            this.setState({
                activeSuggestion: activeSuggestion - 1,
            });
        } else if (e.keycode === 40) {
            if (activeSuggestion > userSuggestions.length - 1) {
                return;
            }
            this.setState({
                activeSuggestion: activeSuggestion + 1,
            });
        } else if (e.keycode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
            });
        }
    };

    render() {
        const {
            userSuggestions,
            showSuggestions,
            activeSuggestion,
        } = this.state;
        const suggestionListItem = userSuggestions.map((suggestion, i) => {
            const itemClasses = classNames('typeahead__item-link', {
                'typeahead__item-link--active': activeSuggestion === i,
            });
            return (
                <li key={i} className="typeahead__item">
                    <a className={itemClasses}>{suggestion}</a>
                </li>
            );
        });
        const suggestionList = (
            <ul className="typeahead__items">{suggestionListItem}</ul>
        );

        return (
            <div className="typeahead__container">
                <input
                    type="text"
                    name="typeahead"
                    className="typeahead__input"
                    onChange={this.handleUserInput.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                />
                {showSuggestions && suggestionList}
            </div>
        );
    }
}

export default Typeahead2;
