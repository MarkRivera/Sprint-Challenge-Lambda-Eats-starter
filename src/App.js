import React from "react";
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <>
      <Router>
        <nav>
        <h1>Lambda Eats</h1>

        </nav>
        <header>
          <h1>Build your own pizza</h1>
          <div>image of pizza</div>
        </header>
      </Router>
      
    </>
  );
};
export default App;
