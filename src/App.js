import React from "react";
import Typeahead from "./components/Typeahead";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Typeahead
        suggestions={[
          "Alligator",
          "Bask",
          "Crocodilian",
          "Death Roll",
          "Eggs",
          "Jaws",
          "Reptile",
          "Solitary",
          "Tail",
          "Wetlands",
        ]}
      />
    </div>
  );
}

export default App;
