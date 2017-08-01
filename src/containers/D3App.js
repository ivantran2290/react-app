import React from 'react';
import * as d3 from "d3";
import GeometryServices from '../services/geometry';
import GeometryFunction from '../components/GeometryFunction';
import CommonUtils from '../utils/commonUtils';
import Point from '../objects/Point';
import Segment from '../objects/Segment';
import Circle from '../objects/Circle';
import Ellipse from '../objects/Ellipse';

class D3App extends React.Component {
  constructor(props) {
    super(props);
    this.changeFunction = this.changeFunction.bind(this);
    this.state = {functionType: GeometryServices.FunctionType.POINT};     
    this.svg = null;
    this.height = 760;
    this.width = 1880;
    this.currentObj = null;
    this.newObjID = null;
    this.point = new Point();
    this.segment = new Segment();
    this.circle = new Circle();
    this.ellipse = new Ellipse();
  }

  componentDidMount() {
    var self = this;    
    this.svg = d3.select(".main").append("svg");
    // var l = d3.scaleLinear().domain([0,1000]).range([0,1000]);
    // this.svg.append("g")
    //   .attr("transform", "translate(0," + (this.height/2) + ")")
    //   .call(d3.axisBottom(l).ticks(10));
    this.svg.style("border", "0.1rem solid #03A9F4")
    .attr("height", this.height + "px")
    .attr("width", this.width + "px")
    .on("mousedown", function() {
      if(d3.event.defaultPrevented) return;
      self.currentObj = this;
      self.newObjID = Date.now();
      switch(self.state.functionType){
        case GeometryServices.FunctionType.POINT:
          self.MD_drawPoint();
          break;
        case GeometryServices.FunctionType.SEGMENT:
          self.MD_drawSegment();
          break;
        case GeometryServices.FunctionType.CIRCLE:
          self.MD_drawCircle();
          break;
        case GeometryServices.FunctionType.ELLIPSE:
          self.MD_drawEllipse();
          break;
        case GeometryServices.FunctionType.MOVE:
          break;
        default:
          break;
      }            
    })
    .on("mousemove", function() {
      if(d3.event.defaultPrevented) return;
      self.currentObj = this;
      switch(self.state.functionType){
        case GeometryServices.FunctionType.SEGMENT:
          self.MM_drawSegment();
          break;
        case GeometryServices.FunctionType.CIRCLE:
          self.MM_drawCircle();
          break;
        case GeometryServices.FunctionType.ELLIPSE:
          self.MM_drawEllipse();
          break;
        default:
          break;
      }
    });
  }

  MD_drawPoint(){
    this.point.svg = this.appendSVGGroup();
    this.point.color = CommonUtils.randomColor();
    this.point = this.getCurrentPonit(this.point.svg, this.point.color);
    this.point.draw();
    this.bindEraserObjEvent(this.point.svg);
  }

  MD_drawSegment(){
    if(!this.segment.startedDraw){
      this.segment.startedDraw = true;
      this.segment.svg = this.appendSVGGroup();
      this.segment.color = CommonUtils.randomColor();
      this.segment.startP = this.getCurrentPonit(this.segment.svg, this.segment.color);
    }
    else{
      this.segment.endP = this.getCurrentPonit(this.segment.svg, this.segment.color);
      this.segment.draw();
      this.bindEraserObjEvent(this.segment.svg);
      this.segment.startedDraw = false;
    }
  }

  MD_drawCircle(){
    if(!this.circle.startedDraw){
      this.circle.startedDraw = true;
      this.circle.svg = this.appendSVGGroup();
      this.circle.color = CommonUtils.randomColor();
      this.circle.radius = 10;
      this.circle.center = this.getCurrentPonit(this.circle.svg, this.circle.color);
    }
    else{
      this.circle.endP = this.getCurrentPonit(this.circle.svg, this.circle.color);
      this.circle.radius = CommonUtils.calDistance2Point(this.circle.center, this.circle.endP);
      this.circle.draw();
      this.bindEraserObjEvent(this.circle.svg);
      this.circle.startedDraw = false;
    }
  }

  MD_drawEllipse(){
    this.ellipse.pointCount = this.ellipse.pointCount - 1;
    if(this.ellipse.pointCount === 2){      
      this.ellipse.svg = this.appendSVGGroup();
      this.ellipse.color = CommonUtils.randomColor();
      this.ellipse.point1 = this.getCurrentPonit(this.ellipse.svg, this.ellipse.color);
      this.ellipse.point1.draw();
    }
    else if (this.ellipse.pointCount === 1){
      this.ellipse.point2 = this.getCurrentPonit(this.ellipse.svg, this.ellipse.color);
      //this.ellipse.angle = Math.atan2(this.ellipse.point1.x, this.ellipse.point1.y);
      this.ellipse.point2.draw();
    }
    else{
      this.ellipse.point3 = this.getCurrentPonit(this.ellipse.svg, this.ellipse.color);
      this.ellipse.remove();
      //this.ellipse.center.draw();
      this.ellipse.point3.draw();
      this.ellipse.point3.draw();
      this.ellipse.draw();
      this.ellipse.pointCount = 3;
    }
  }

  MM_drawSegment(){
    if(!this.segment.startedDraw) return;
    this.segment.endP = this.getCurrentPonit(this.segment.svg, this.segment.color);
    this.segment.remove();
    this.segment.draw();
  }

  MM_drawCircle(){
    if(!this.circle.startedDraw) return;
    this.circle.endP = this.getCurrentPonit(this.circle.svg, this.circle.color);
    this.circle.radius = CommonUtils.calDistance2Point(this.circle.center, this.circle.endP);
    this.circle.remove();
    this.circle.draw();
  }

  MM_drawEllipse(){
    if(this.ellipse.pointCount !== 1) return;
    this.ellipse.point3 = this.getCurrentPonit(this.ellipse.svg, this.ellipse.color);
    this.ellipse.remove();
    this.ellipse.point1.draw();
    this.ellipse.point2.draw();
    this.ellipse.point3.draw();
    this.ellipse.draw();
  }

  getCurrentPonit(svg, color){
    let currentMouse = d3.mouse(this.currentObj);
    return new Point(svg, currentMouse[0], currentMouse[1], color);
  }

  appendSVGGroup(){
    return this.svg.append("g").attr("id", this.newObjID);
  }

  bindEraserObjEvent($object){
    let self = this;
    $object.on("mousedown", function() {
      if(self.state.functionType === GeometryServices.FunctionType.ERASER_OBJECT) this.remove();
      if(self.state.functionType === GeometryServices.FunctionType.MOVE){
        d3.select(this).raise().classed("active", true);
      }
    });
    $object.on("mouseup", function() {
      //TODO
    });
  }

  changeFunction(functionType) {
    this.setState({functionType: functionType});
    if(functionType === GeometryServices.FunctionType.ERASER_ALL){
      d3.select("svg").selectAll("*").remove();
    }
  }
  
  render() {
    return (
      <div>
        <div className="main"></div>
        <div>
          <GeometryFunction className="fa-circle" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.POINT} />
          <GeometryFunction className="fa-arrows-h" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.SEGMENT} />
          <GeometryFunction className="fa-circle-o" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.CIRCLE} />
          <GeometryFunction className="fa-eraser" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.ERASER_OBJECT} />
          <GeometryFunction className="fa-trash" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.ERASER_ALL} />
          <GeometryFunction className="fa-arrows" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.MOVE} />
          <GeometryFunction text="Ellipse" changeFunction={this.changeFunction} functionType={GeometryServices.FunctionType.ELLIPSE} />
        </div>
      </div>
    );
  }  
}

export default D3App;
