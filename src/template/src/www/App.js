import React, { Component } from 'react'
import logoReact from './logo-react.svg'
import logoKube from './logo-kube.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div>

          <img src={logoReact} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
        <div>

          <img src={logoKube} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Express
          </a>
        </div>
          <p>
            Edit <code>src/www/App.js</code> and save to reload.
          </p>

        </header>
      </div>
    )
  }
}

export default App
