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
  }

  drawPoint(svg, coordinates){
    var drag = d3.drag()
      .on("drag", function(d){
        var x = d3.event.x;
        var y = d3.event.y;
        d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
      })
      .on("start", function(d){
        d3.select(this).raise().classed("active", true);
      })
      .on("end", function(d){
        d3.select(this).classed("active", false);
      });
    
    var randomColor = (function(){
    var golden_ratio_conjugate = 0.618033988749895;
    var h = Math.random();

    var hslToRgb = function (h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
    };
    
    return function(){
      h += golden_ratio_conjugate;
      h %= 1;
      return hslToRgb(h, 0.5, 0.60);
    };
  })();

    svg.append("circle")
      .attr("transform", "translate(" + coordinates.x + "," + coordinates.y + ")")
      .attr("r", 20)
      .attr("fill", randomColor)
      .call(drag);    
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
