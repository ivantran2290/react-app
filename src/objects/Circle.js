import * as d3 from "d3";
class Circle {
  constructor(svg, center, radius, color) {
    this.svg = svg;
    this.startedDraw = false;
    this.center = center;
    this.radius = radius;
    this.color = color;
    this.endP = null;
    this.ID = Date.now();
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
      .attr("stroke", this.color)
      .attr("id", this.ID);

    //Draw end point
    this.endP.draw();
    this.drawTemp();
  }

  drawTemp(){
    var that = this;
    var selected = false;
    this.svg.append("circle")
      .attr("transform", "translate(" + this.center.x + "," + this.center.y + ")")
      .attr("r", this.radius)
      .attr("fill", "none")
      .attr("stroke-width", 16)
      .attr("opacity", 0)
      .attr("stroke", this.color)
      .attr("pointer-events", "stroke")
      .on("mouseover", function (){
        document.getElementById(that.ID).setAttribute("stroke-width", 4);
      })
      .on("mouseout", function (){
        if(!selected){
          document.getElementById(that.ID).setAttribute("stroke-width", 2);
        }        
      })
      .on("mousedown", function (){
        if(selected){
          selected = false;
          document.getElementById(that.ID).setAttribute("stroke-width", 2);
        }
        else{
          selected = true;
          document.getElementById(that.ID).setAttribute("stroke-width", 4);
        }
      });
  }

  remove(){
    this.svg.selectAll("*").remove();
  }
}
export default Circle;