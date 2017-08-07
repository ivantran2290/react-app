import CommonUtils from '../utils/commonUtils';
import Point from '../objects/Point';
class Ellipse {
  constructor(svg, center, point1, point2, point3, color) {
    this.svg = svg;
    this.pointCount = 3;
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.color = color;
    this.angle = 0;
  }

  draw(){
    var center = new Point();
    center.x = (this.point1.x + this.point2.x)/2;
    center.y = (this.point1.y + this.point2.y)/2;

    var d1 = CommonUtils.calDistance2Point(this.point1, this.point3);
    var d2 = CommonUtils.calDistance2Point(this.point2, this.point3);
    var a = (d1 + d2)/ 2;
    var c = CommonUtils.calDistance2Point(center, this.point1);
    var b = Math.sqrt(Math.pow((a+c), 2) - Math.pow(c, 2));
    var left = new Point;
    left.x = this.point1.x + a;
    left.y = this.point1.y + a;

    //Draw ellipse
    this.svg.append("ellipse")
      .attr("transform", "translate(" + center.x + "," + center.y + ") rotate("+ CommonUtils.convertPIToDegrees(this.angle) +")")
      .attr("rx", CommonUtils.calDistance2Point(center, left))
      .attr("ry", b)
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke", this.color);
  }

  remove(){
    this.svg.selectAll("*").remove();
  }
}
export default Ellipse;