import React from 'react';
import GeometryServices from '../services/geometry';

class GeometryFunction extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);   
    this.state = {functionType: GeometryServices.FunctionType.DRAW_POINT};
  }

  handleClick(e) {   
    e.preventDefault();    
    this.props.changeFunction(this.props.functionType);
  }

  render() {
    return (
      <div className="function">
          <i onClick={this.handleClick} className={"fa fa-3x " + this.props.className} style={this.props.style} aria-hidden="true"></i>      
      </div>
    );
  }
}

export default GeometryFunction;
