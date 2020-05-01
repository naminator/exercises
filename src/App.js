import React, { Component } from 'react';
import Typeahead from './components/Typeahead';
import DragDrop from './components/DragDrop/DragDrop';
import './App.css';

const MOCK_DATA = [
    'Alligator',
    'Bask',
    'Crocodilian',
    'Death Roll',
    'Eggs',
    'Jaws',
    'Reptile',
    'Solitary',
    'Tail',
    'Wetlands',
];
const API_URL = 'https://jsonplaceholder.typicode.com/users';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
        };
    }

    componentDidMount() {
        fetch(API_URL)
            .then((response) => response.json())
            .then((json) => {
                const names = json.map((e) => e.name);

                this.setState({
                    suggestions: names,
                });
            });
    }

    render() {
        return (
            <div className="App">
                <h2>Typeahead</h2>
                <Typeahead suggestions={this.state.suggestions} />

                {/* <h2>Drag and Drop</h2>
                <DragDrop items={MOCK_DATA} /> */}
            </div>
        );
    }
}

export default App;
