import React, { Component } from 'react';
import TodoList from '../components/TodoList';
import * as d3 from "d3";
import GeometryServices from '../services/geometry';

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class D3App extends React.Component {
  constructor(props) {
    super(props);    
  }

  showCharts(){
    var self = this;
    var data = [30, 86, 168, 281, 303, 365];
    var svg = d3.select(".App-content").append("svg");
    svg.style("border", "1px solid #03A9F4")
    .attr("height", "400px")
    .attr("width", "400px")
    .on("click", function() {

      if (d3.event.defaultPrevented) return;
      
      var point = d3.mouse(this)
      
      //Get mouse cordirnates
      var p = new Point(point[0], point[1]);

      // Append a new point
      self.drawPoint(svg, p);
    });

    d3.select(".chart")
      .selectAll("div")
      .data(data)
        .enter()
        .append("div")
        .style("width", (d) => { return d + "px"; })
        .text((d) => { return d + "$"; });

    svg.selectAll("circle")
    .data(GeometryServices.getCircleList())
    .enter().append("circle")
      .attr("cx", (d) => { return d.x; })
      .attr("cy", (d) => { return d.y; })
      .attr("r",  (d) => { return d.r; })
      .attr("stroke", "#F06292")
      .attr("fill", "none");

    let pointA = new Point(0, 0);
    let pointB = new Point(400, 400);

    svg.append("line")
      .attr("x1", pointA.x)
      .attr("y1", pointA.y)
      .attr("x2", pointB.x)
      .attr("y2", pointB.y)
      .attr("stroke", "#F06292");

    let pointC = new Point(400, 0);
    let pointD = new Point(0, 400);

    svg.append("line")
      .attr("x1", pointC.x)
      .attr("y1", pointC.y)
      .attr("x2", pointD.x)
      .attr("y2", pointD.y)
      .attr("stroke", "#F06292");

    this.drawPoint(svg, new Point(30, 30))
  }

  drawPoint(svg, coordinates){
    svg.append("circle")
      .attr("cx",coordinates.x)
      .attr("cy",coordinates.y)
      .attr("r", 5)
      .attr("fill", "#FF5722");
  }

  componentDidMount() {
    this.showCharts();
  }

  render() {
    return (
     <div className="chart"/>    
    );
  }  
}

export default D3App;
