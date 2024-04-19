import React from 'react';
import './App.css';
import Form from './Form'; // Make sure to create this component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* You can keep or remove the logo as per your design preference */}
        <h1>Sound Recording Form</h1>
      </header>
      <main>
        <Form />
        {/* The Form component will handle the user inputs and submission */}
      </main>
      {/* You can add a footer if needed */}
    </div>
  );
}

export default App;
