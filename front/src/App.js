import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';

const Cryptos = () => <h1>Cryptocurrencies</h1>;
const Exchanges = () => <h1>Exchanges</h1>;
class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Route path="(/|/cryptocurrencies)" exact component={Cryptos} />
        <Route path="/exchanges" component={Exchanges} />
      </div>
    );
  }
}

export default App;
