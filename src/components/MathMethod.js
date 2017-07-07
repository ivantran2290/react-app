import React, { Component } from 'react';

class MathMethod extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: 0};
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  mathResult(){
    switch(this.props.methodName){
      case "abs":
        return Math.abs(this.state.value);
      case "acos":
        return Math.acos(this.state.value);
      case "acosh":
        return Math.acosh(this.state.value);
      case "asin":
        return Math.asin(this.state.value);
      case "asinh":
        return Math.asinh(this.state.value);
      case "atan":
        return Math.atan(this.state.value);
      case "atan2":
        return Math.atan2(this.state.value);
      case "cbrt":
        return Math.cbrt(this.state.value);
      case "ceil":
        return Math.ceil(this.state.value);
      case "clz32":
        return Math.clz32(this.state.value);
      case "cos":
        return Math.cos(this.state.value);
      case "cosh":
        return Math.cosh(this.state.value);
      case "exp":
        return Math.exp(this.state.value);
      case "expm1":
        return Math.expm1(this.state.value);
      case "floor":
        return Math.floor(this.state.value);
      case "fround":
        return Math.fround(this.state.value);
      case "hypot":
        return Math.hypot(this.state.value);
      case "imul":
        return Math.imul(this.state.value);
      case "log":
        return Math.log(this.state.value);
      case "log10":
        return Math.log10(this.state.value);
      case "log1p":
        return Math.log1p(this.state.value);
      case "log2":
        return Math.log2(this.state.value);
      case "min":
        return Math.min(this.state.value);
      case "pow":
        return Math.pow(this.state.value);
      case "random":
        return Math.random(this.state.value);
      case "round":
        return Math.round(this.state.value);
      case "sign":
        return Math.sign(this.state.value);
      case "sin":
        return Math.sin(this.state.value);
      case "sinh":
        return Math.sinh(this.state.value);
      case "sqrt":
        return Math.sqrt(this.state.value);     
      case "tan":
        return Math.tan(this.state.value);
      case "tanh":
        return Math.tanh(this.state.value);
      case "trunc":
        return Math.trunc(this.state.value);  
      default:
        return "Unknown";
    }
  }

  mathName(){
    switch(this.props.methodName){
      
      default:
        return "Math." + this.props.methodName + "(x)";
    }
  }
  
  render() {
    return (
      <div>
        <div className="App-column App-column-20">{this.mathName()}
          <a className="App-float-left">Info</a>
        </div>
        <div className="App-column App-column-20">
          <input onChange={this.handleChange} defaultValue={this.state.value} />
        </div>
        <div className="App-column App-column-50">{this.mathResult()}</div>
      </div>      
    );
  }
}

export default MathMethod;
