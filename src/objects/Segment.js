class Segment {
  constructor(svg, startP, endP, color) {
    this.svg = svg;
    this.startedDraw = false;
    this.startP = startP;
    this.endP = endP;
    this.color = color;
  }

  draw(){
    //Draw start point
    this.startP.draw();    

    //Draw line
    this.svg.append("line")
      .attr("x1", this.startP.x)
      .attr("y1", this.startP.y)
      .attr("x2", this.endP.x)
      .attr("y2", this.endP.y)
      .attr("stroke-width", 2)
      .attr("stroke", this.color);
      //.call(this.drag);

    //Draw end line
    this.endP.draw();    
  }
}
export default Segment;