import React, { Component } from 'react';
import MathMethod from '../components/MathMethod';

class MathApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MathMethod methodName="abs"/>
        <MathMethod methodName="acos"/>
        <MathMethod methodName="acosh"/>
        <MathMethod methodName="asin"/>
        <MathMethod methodName="asinh"/>
        <MathMethod methodName="atan"/>
        <MathMethod methodName="atan2"/>
        <MathMethod methodName="cbrt"/>
        <MathMethod methodName="ceil"/>
        <MathMethod methodName="clz32"/>
        <MathMethod methodName="cos"/>
        <MathMethod methodName="cosh"/>
        <MathMethod methodName="exp"/>
        <MathMethod methodName="expm1"/>
        <MathMethod methodName="floor"/>
        <MathMethod methodName="fround"/>
        <MathMethod methodName="hypot"/>
        <MathMethod methodName="imul"/>
        <MathMethod methodName="log10"/>
        <MathMethod methodName="log1p"/>
        <MathMethod methodName="log2"/>
        <MathMethod methodName="max"/>
        <MathMethod methodName="min"/>
        <MathMethod methodName="pow"/>
        <MathMethod methodName="random"/>
        <MathMethod methodName="round"/>
        <MathMethod methodName="sign"/>
        <MathMethod methodName="sin"/>
        <MathMethod methodName="sinh"/>
        <MathMethod methodName="sqrt"/>   
        <MathMethod methodName="tan"/>
        <MathMethod methodName="tanh"/>
        <MathMethod methodName="trunc"/>             
      </div>
    );
  }
}

export default MathApp;
