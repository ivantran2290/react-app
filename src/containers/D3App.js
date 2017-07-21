import React from 'react';
import * as d3 from "d3";
import GeometryServices from '../services/geometry';
import GeometryFunction from '../components/GeometryFunction';
import CommonUtils from '../utils/commonUtils';
import Point from '../objects/Point';
import Segment from '../objects/Segment';
import Circle from '../objects/Circle';

class D3App extends React.Component {
  constructor(props) {
    super(props);
    this.changeFunction = this.changeFunction.bind(this);
    this.state = {functionType: GeometryServices.FunctionType.POINT};     
    this.point = new Point();
    this.segment = new Segment();
    this.circle = new Circle();
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
        case GeometryServices.FunctionType.POINT:
        {
          let currentMouse = d3.mouse(this);
          self.point = new Point(
            svg,
            currentMouse[0], 
            currentMouse[1],
            CommonUtils.randomColor()
          );
          self.point.draw();
          break;
        }
        case GeometryServices.FunctionType.LINE:
          if(!self.segment.startedDraw){
            self.segment.startedDraw = true;
            self.segment.svg = svg.append("g").attr("id", Date.now());
            self.segment.color = CommonUtils.randomColor();
            let currentMouse = d3.mouse(this);
            self.segment.startP = new Point(
              self.segment.svg,
              currentMouse[0], 
              currentMouse[1],
              self.segment.color
            );
          }
          else{
            let currentMouse = d3.mouse(this);
            self.segment.endP = new Point(
              self.segment.svg,
              currentMouse[0], 
              currentMouse[1],
              self.segment.color
            );
            self.segment.draw();
            self.segment.startedDraw = false;
          }
          break;
        case GeometryServices.FunctionType.CIRCLE:
        if(!self.segment.startedDraw){
            self.circle.startedDraw = true;
            self.circle.svg = svg.append("g").attr("id", Date.now());
            self.circle.color = CommonUtils.randomColor();
            self.circle.radius = 10;
            let currentMouse = d3.mouse(this);
            self.circle.center = new Point(
              self.circle.svg,
              currentMouse[0], 
              currentMouse[1],
              self.circle.color
            );
          }
          else{
            let currentMouse = d3.mouse(this);
            self.circle.radius = CommonUtils.calDistance2Point(self.circle.center, new Point(
              self.circle.svg,
              currentMouse[0], 
              currentMouse[1],
              self.circle.color
            ));
            self.circle.draw();
            self.circle.startedDraw = false;
          }
          
          break;
        default:
          break;
      }            
    })
    .on("mousemove", function() {
      if(d3.event.defaultPrevented) return;
      switch(self.state.functionType){
        case GeometryServices.FunctionType.LINE:
          if(!self.segment.startedDraw) return;
          let currentMouse = d3.mouse(this);
          //alert(self.segment.color)
          self.segment.endP = new Point(
            self.segment.svg,
            currentMouse[0], 
            currentMouse[1],
            self.segment.color
          );
          self.segment.svg.selectAll("*").remove();
          self.segment.draw();
          break;
        case GeometryServices.FunctionType.CIRCLE:
        {
          if(!self.circle.startedDraw) return;
          let currentMouse = d3.mouse(this);
          self.circle.radius = CommonUtils.calDistance2Point(self.circle.center, new Point(
            self.circle.svg,
            currentMouse[0], 
            currentMouse[1],
            self.circle.color
          ));
          self.circle.svg.selectAll("*").remove();
          self.circle.draw();
        }
          break;
        default:
          break;
      }
      
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
          <GeometryFunction className="fa-circle" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.POINT} />
          <GeometryFunction className="fa-arrows-h" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.LINE} />
          <GeometryFunction className="fa-circle-o" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.CIRCLE} />
          <GeometryFunction className="fa-trash" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.ERASER} />
        </div>
      </div>
    );
  }  
}

export default D3App;
