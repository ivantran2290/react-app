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
    this.startedPoint = null;
    this.startedDraw = false;
    this.groupElements = null;
  }

  componentDidMount() {
    var self = this;    
    var svg = d3.select(".main").append("svg");
    svg.style("border", "0.1rem solid #03A9F4")
    .attr("height", "35rem")
    .attr("width", "90rem")
    .on("mousedown", function() {
      if(d3.event.defaultPrevented) return;
      switch(self.state.functionType){
        case GeometryServices.FunctionType.DRAW_POINT:
          let point = self.getCurrentPonit(this);   
          GeometryServices.drawPoint(svg, point);
          break;
        case GeometryServices.FunctionType.DRAW_LINE:
          if(!self.startedDraw){
            self.startedDraw = true;
            self.groupElements = svg.append("g").attr("id", Date.now());
            self.startedPoint = self.getCurrentPonit(this);   
          }
          else{
            let endPoint = self.getCurrentPonit(this);
            GeometryServices.drawLine(self.groupElements, self.startedPoint, endPoint);
            self.startedDraw = false;
          }
          break;
        case GeometryServices.FunctionType.MOVE:
          break;
      }            
    })
    .on("mousemove", function() {
      if(d3.event.defaultPrevented) return;
      if(!self.startedDraw) return;
      let endPoint = self.getCurrentPonit(this);
      self.groupElements.selectAll("*").remove();
      GeometryServices.drawLine(self.groupElements, self.startedPoint, endPoint);
    });
  }

  getCurrentPonit($this){
    let currentMouse = d3.mouse($this);
    return new Point(currentMouse[0], currentMouse[1]);
  }

  changeFunction(functionType) {
    this.setState({functionType: functionType});
    if(functionType === GeometryServices.FunctionType.ERASER){
      d3.select("svg").selectAll("*").remove();
    }
  }
  
  render() {
    return (
      <div>
        <div className="main"></div>
        <div>
          <GeometryFunction className="fa-circle" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.DRAW_POINT} />
          <GeometryFunction className="fa-arrows-h" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.DRAW_LINE} />
          <GeometryFunction className="fa-arrows" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.MOVE} />
          <GeometryFunction className="fa-trash" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.ERASER} />
        </div>
      </div>
    );
  }  
}

export default D3App;
