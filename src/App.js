import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './App.css';
import Pizza from './Pizza';

const App = () => {
  return (
    <div className="app">
      <Router>
        <nav className="nav">
        <Link to="/">
          <h1>Lambda Eats</h1>
        </Link>
          <div>
            <Link to="/" className="nav-links">Home</Link>
            <Link to="/help" className="nav-links">Help</Link>
          </div>
        </nav>
        <header>
          <h1>Build Your Own Pizza</h1>
          <div>image of pizza</div>
          <Link to="/pizza" data-cy="pizza-time">Start</Link>
        </header>

        <Route path="/pizza" component={Pizza} />
      </Router>
    </div>
  );
};
export default App;
