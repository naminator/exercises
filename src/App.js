import React from 'react';
import Typeahead from './components/Typeahead';
import DragDrop from './components/DragDrop';
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

function App() {
    return (
        <div className="App">
            <h2>Typeahead</h2>
            <Typeahead suggestions={MOCK_DATA} />

            <h2>Drag and Drop</h2>
            <DragDrop items={MOCK_DATA} />
        </div>
    );
}

export default App;
