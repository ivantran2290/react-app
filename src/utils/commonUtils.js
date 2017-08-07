var CommonUtils = {
    randomColor: function(){
        //var golden_ratio_conjugate = 0.618033988749895;
        var h = Math.random();

        var hslToRgb = function (h, s, l){
            var r, g, b;

            if(s === 0){
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

        return hslToRgb(h, 0.5, 0.60);
    },
    calDistance2Point: function(startP, endP){
        return Math.sqrt(Math.pow((endP.x - startP.x),2) + Math.pow((endP.y - startP.y),2))
    },
    convertPIToDegrees: function(angle){
        return (angle > 0 ? angle : (2*Math.PI + angle)) * 360 / (2*Math.PI)
    },
    giaiPhuongTrinhBacHai: function(a, b, c){
        let nghiem = [];

        let delta = Math.pow(b, 2) - 4 * a * c;
        if (delta > 0)
        {
            nghiem[0] = (-b - Math.sqrt(delta)) / 2 * a;
            nghiem[1] = (-b + Math.sqrt(delta)) / 2 * a;
        }
        else if (delta == 0)
        {
            nghiem[0] = -b / 2 * a;
        }
        else if (delta < 0)
        {
            nghiem = [];
        }    
        return nghiem;    
    },
    jpDateFormat: function(year, month, day){
        let dayOfWeek = this.jpDayOfWeek(year, month, day);
        return year + "年" + (month+1) + "月" + day + "日（" + dayOfWeek + "）";
    },
    jpDayOfWeek: function(year, month, day){
    let date = new Date(year, month, day);
    switch(date.getDay()){
      case 0:
        return "日";
      case 1:
        return "月";
      case 2:
        return "火";
      case 3:
        return "水";
      case 4:
        return "木";
      case 5:
        return "金";
      case 6:
        return "土";
    }
  }
};

export default CommonUtils;