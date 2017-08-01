class Point {
  constructor(svg, x, y, color) {
    this.svg = svg;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(){
    this.svg.append("circle")
      .attr("transform", "translate(" + this.x + "," + this.y + ")")
      .attr("r", 5)
      .attr("fill", this.color)
      //.call(this.drag);    
  }
}
export default Point;