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
    //this.render.style("border", "1px solid");
    //this.style("border", "1px solid");
  }

  render() {
    return (
      <i onClick={this.handleClick} className={"fa fa-3x " + this.props.className} style={this.props.style} aria-hidden="true"></i>      
    );
  }
}

export default GeometryFunction;
