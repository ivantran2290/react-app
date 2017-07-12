import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

class MathMethod extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: 0, describ: this.getTooltip()};
  }

  handleChange(e) {
    this.setState({value: e.target.value});    
  }

  getTooltip() {
    switch(this.props.methodName){
      case "abs":
        return "The absolute value of the given number.";
      case "acos":
        return "The arccosine (in radians) of the given number if it's between -1 and 1; otherwise, NaN.";
      case "acosh":
        return "";
      case "asin":
        return "";
      case "asinh":
        return "";
      case "atan":
        return "";
      case "atan2":
        return "";
      case "cbrt":
        return "";
      case "ceil":
        return "";
      case "clz32":
        return "";
      case "cos":
        return "";
      case "cosh":
        return "";
      case "exp":
        return "";
      case "expm1":
        return "";
      case "floor":
        return "";
      case "fround":
        return "";
      case "hypot":
        return "";
      case "imul":
        return "";
      case "log":
        return "";
      case "log10":
        return "";
      case "log1p":
        return "";
      case "log2":
        return "";
      case "min":
        return "";
      case "pow":
        return "";
      case "random":
        return "";
      case "round":
        return "";
      case "sign":
        return "";
      case "sin":
        return "";
      case "sinh":
        return "";
      case "sqrt":
        return "";
      case "tan":
        return "";
      case "tanh":
        return "";
      case "trunc":
        return "";
      default:
        return "Unknown";
    }
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
          <a className="App-float-left" data-tip data-for='sadFace'>Info</a>
          <ReactTooltip id='sadFace' type='success' effect='solid'>
            <span>{this.state.describ}</span>
          </ReactTooltip>
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
