toRad = function(degrees){
    return degrees * (Math.PI/180);
}
toDeg = function(radians){
    return radians * (180/Math.PI);
}
sin = function(num){
    return Math.sin(toRad(num));
}
cos = function(num){
    return Math.cos(toRad(num));
}
atan = function(num){
    return toDeg(Math.atan(num));
}
atan2 = function(num1, num2){
    return toDeg(Math.atan2(num1, num2));
}
dist = function(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}
hex = function(value){
    let a = value.toString(16);
    if(a.length === 1){
        a = "0" + a;
    }
    return a;
}
color = function(r, g, b, a = 255){
    return {rgb: "0x" + hex(r) + hex(g) + hex(b), a: a};
}
lineS = function(x1,y1,x2,y2,x3,y3,x4,y4){
    var a = y2 - y1;
    var b = x2 - x1;
    var h = x1;
    var k = y1;
    var c = y4 - y3;
    var d = x4 - x3;
    var j = x3;
    var l = y3;
    //this.noFill();
    var x = ((-c*j*b)+(d*l*b)+(a*d*h)-(d*k*b))/((a*d)-(c*b));
    //this.fill(0, 0, 0);
    //this.noFill();
    //this.rect(x1 - this.X,y1 - this.Y,5,5);
    return {x:x,y:(c/d)*(x-j)+l,t:((Math.round(dist(x1,y1,x,(c/d)*(x-j)+l) + dist(x2,y2,x,(c/d)*(x-j)+l)) === Math.round(dist(x1,y1,x2,y2))) && (Math.round(dist(x3,y3,x,(c/d)*(x-j)+l) + dist(x4,y4,x,(c/d)*(x-j)+l)) === Math.round(dist(x3,y3,x4,y4))))};
    //ellipse(x2,y2,5,5);
  };
//converts a this.line into an angle
  angLine = function(x1,y1,x2,y2){
    return atan2(y2-y1, x2-x1);
    //var t = 0;
    //if(x2 >= x1){
    //  t = this.atan((y2 - y1)/(x2 - x1)) + 90;
    //}
    //else{
    //  t = this.atan((y2 - y1)/(x2 - x1)) + 180 + 90;
    //}
    //return t - 90;
  };
