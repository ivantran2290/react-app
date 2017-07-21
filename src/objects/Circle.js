class Circle {
  constructor(svg, center, radius, color) {
    this.svg = svg;
    this.startedDraw = false;
    this.center = center;
    this.radius = radius;
    this.color = color;
  }

  draw(){
    //Draw start point
    this.center.draw();    

    //Draw circle
   this.svg.append("circle")
      .attr("transform", "translate(" + this.center.x + "," + this.center.y + ")")
      .attr("r", this.radius)
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke", this.color);
  }
}
export default Circle;