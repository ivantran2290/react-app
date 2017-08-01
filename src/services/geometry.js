import * as d3 from "d3";

var GeometryServices = {
  FunctionType: {
    POINT: 11,
    SEGMENT: 12,
    CIRCLE: 13,
    ELLIPSE: 14,
    ERASER_OBJECT: 90,
    ERASER_ALL: 91,
    MOVE: 92
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
  }
};

export default GeometryServices;