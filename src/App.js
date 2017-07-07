import React, { Component } from 'react';
import HelloMessage from './components/HelloMessage';
import Timer from './components/Timer';
import MarkdownEditor from './components/MarkdownEditor';
import TodoApp from './containers/TodoApp';
import MathApp from './containers/MathApp';
import logo from './resources/svg/logo.svg';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Javascript Math</h2>
        </div>        
        {/*<p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
        <div className="App-content">
          <MathApp/>
        </div> 
        
        {/*<Timer/>
        <TodoApp />
        <MarkdownEditor />*/}
      </div>
    );
  }
}

export default App;
