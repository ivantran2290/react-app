import * as d3 from "d3";

var GeometryServices = {
  FunctionType: {
    POINT: 0,
    LINE: 1,
    CIRCLE: 2,
    ERASER: 3
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