import * as d3 from "d3";
import CommonUtils from '../utils/commonUtils';

var GeometryServices = {
  FunctionType: {
    DRAW_POINT: 0,
    DRAW_LINE: 1,
    MOVE: 2
  },
  drag: d3.drag()
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
  }),
  getCircleList: function() {
    return [];
  },
  drawPoint: function(svg, coordinates){
    svg.append("circle")
      .attr("transform", "translate(" + coordinates.x + "," + coordinates.y + ")")
      .attr("r", 5)
      .attr("fill", CommonUtils.randomColor())
      .call(this.drag);    
  }, 
  drawLine: function(svg, coordinate1, coordinate2){
    svg.select('line').remove();
    this.drawPoint(svg, coordinate1);    
    svg.append("line")
      .attr("x1", coordinate1.x)
      .attr("y1", coordinate1.y)
      .attr("x2", coordinate2.x)
      .attr("y2", coordinate2.y)
      .attr("stroke-width", 2)
      .attr("stroke", CommonUtils.randomColor())
      .call(this.drag);
    this.drawPoint(svg, coordinate1);    
  }
};

export default GeometryServices;