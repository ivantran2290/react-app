import React from 'react';
import * as d3 from "d3";
import GeometryServices from '../services/geometry';
import GeometryFunction from '../components/GeometryFunction';

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class D3App extends React.Component {
  constructor(props) {
    super(props);
    this.changeFunction = this.changeFunction.bind(this);
    this.state = {functionType: GeometryServices.FunctionType.DRAW_POINT};     
  }

  componentDidMount() {
    var self = this;
    var p = null;
    var click = 0;
    var drawing = false;
    var svg = d3.select(".main").append("svg");
    svg.style("border", "1px solid #03A9F4")
    .attr("height", "35rem")
    .attr("width", "90rem")
    .on("mousedown", function() {      
      if (d3.event.defaultPrevented) return;
      drawing = true;
      var point = d3.mouse(this)
      
      //Get mouse cordirnates
      p = new Point(point[0], point[1]);   

      // Append a new point
      // if(self.state.functionType === GeometryServices.FunctionType.DRAW_POINT){
      //   GeometryServices.drawPoint(svg, p);        
      // }      
      console.log(click);
    })
    .on("mousemove", function() {
      if(!drawing){
        return;
      }

      // if (d3.event.defaultPrevented) return;
      
      var point = d3.mouse(this)
      
      //Get mouse cordirnates
      
      var p2 = new Point(point[0], point[1]);

      // // Append a new point
      if(self.state.functionType === GeometryServices.FunctionType.DRAW_LINE){        
        GeometryServices.drawLine(svg, p, p2);
      }           
    })
    .on("mouseup", function() {
      if(!drawing){
        return;
      }

      if (d3.event.defaultPrevented) return;
      
      var point = d3.mouse(this);
      
      //Get mouse cordirnates
      
      var p2 = new Point(point[0], point[1]);

      // Append a new point
      if(self.state.functionType === GeometryServices.FunctionType.DRAW_LINE){
        GeometryServices.drawLine(svg, p, p2);
      }
      console.log("mouseup");      
    });
  }

  changeFunction(functionType) {
    this.setState({functionType: functionType});
  }
  
  render() {
    return (
      <div>
        <div className="main"></div>
        <div className="function">
          <GeometryFunction className="fa-mouse-pointer" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.DRAW_POINT} />
          <GeometryFunction className="fa-mouse-pointer" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.DRAW_LINE} />
          <GeometryFunction className="fa-arrows" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.MOVE} />
        </div>
      </div>
    );
  }  
}

export default D3App;
