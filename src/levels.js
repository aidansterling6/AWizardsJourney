let sw1 = 32*0.8;
let sh1 = 32*0.4
class Level{
    constructor(
        respawnX,
        respawnY,
        noMagic,
        checkPoint,
        gems,
        rects,
        mirror
    ){
        this.respawnX = respawnX;
        this.respawnY = respawnY;
        this.noMagic = noMagic;
        this.checkPoint = checkPoint;
        this.gems = gems;
        this.rects = rects;
        this.mirror = mirror;
    }
    //level data storage
    static Levels = 
        [
            {
                respawnX: -560,
                respawnY: -285,
                noMagic: [{x:700,y:-150,w:150,h:180}],
                checkPoint: [{x:-890, y:-90, bottom:-220, top:-80, end: false}, {x:400, y:20, bottom:-32*3, top:32*0.5, end: false}, {x:1250, y:0, bottom:-250, top:40, end: true}],
                texts: [
                    {x:557, y:53, message: "This is an anti-magic field", settings:{}},
                    {x:534, y:69, message: "You can't drag objects inside it", settings:{}},
                    {x:-510, y:-35, message: "Push the box", settings:{}},
                    {x:-525, y:-15, message: "onto the button", settings:{}},
                    {x:-640.42, y:-355.77, message: "use WASD to move", settings:{}},
                    {x:-632.42, y:-342, message: "use R to reset", settings:{}},
                    {x:-1037, y:248.43, message: "Click and drag the box to lift it", settings:{}}
                ],
                gems: [
                    {x:-246.7, y:-103.3, w:10, h:10},
                    {x:-450, y:-137.74, w:10, h:10},
                    {x:-580.21, y:81.86, w:10, h:10},
                    {x:-600.21, y:81.86, w:10, h:10},
                    {x:60, y:-120, w:10, h:10},
                    {x:80, y:-120, w:10, h:10},
                    {x:100, y:-120, w:10, h:10},
                ],
                rects: [
                    {level: 1, x:0,y:0,w:10,h:27,ax:0,ay:0,HitDown:false,type:"player",n1:-1,n2:0,mi:false},

                    {level: 1, x:-32*12,y:-32*10.5,w:32*2,h:32*5,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//1
                    {level: 1, x:-32*25,y:-32*6,w:32*2,h:32*7,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//2
                    {level: 1, x:-32*9,y:32*6,w:32*2,h:32*4,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//3
                    {level: 1, x:32*11,y:32*0,w:32*2,h:32*4,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//4
                    {level: 1, x:32*17,y:32*0,w:32*2,h:32*4,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//5
                    {level: 1, x:32*32,y:32*0,w:32*2,h:32*4,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//6


                    {level: 1, x:-32*14,y:-32*8.5,w:40,h:0,ax:0,ay:0,HitDown:false,type:"button",n1:1,n2:0,mi:false},//7
                    {level: 1, x:-32*14,y:-32*1.5,w:40,h:0,ax:0,ay:0,HitDown:false,type:"button",n1:2,n2:0,mi:false},//8
                    {level: 1, x:-32*15.5,y:32*5.5,w:40,h:0,ax:0,ay:0,HitDown:false,type:"button",n1:3,n2:0,mi:false},//9
                    {level: 1, x:-32*2,y:32*5.5,w:40,h:0,ax:0,ay:0,HitDown:false,type:"button",n1:4,n2:0,mi:false},//10
                    {level: 1, x:32*5,y:32*5.5,w:40,h:0,ax:0,ay:0,HitDown:false,type:"button",n1:4,n2:0,mi:false},//11
                    {level: 1, x:32*14.05,y:32*0.5,w:40,h:0,ax:0,ay:0,HitDown:false,type:"button",n1:5,n2:0,mi:false},//12
                    {level: 1, x:32*25,y:-32*0.5,w:40,h:0,ax:0,ay:0,HitDown:false,type:"button",n1:6,n2:0,mi:false},//13




                    {level: -1, x:-32*16,y:-32*7.5,w:32*12,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*19,y:-32*14.5,w:32*12,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*14,y:-32*16.5,w:32*2,h:32*8,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*10,y:-32*16.5,w:32*2,h:32*8,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*12,y:-32*18.5,w:32*2,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*23,y:-32*10.5,w:32*2,h:32*8,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*8,y:-32*14.5,w:32*2,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*6,y:-32*8.5,w:32*2,h:32*14,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*25,y:-32*13.5,w:32*2,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*27,y:-32*10.5,w:32*2,h:32*8,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*8,y:-32*1.5,w:32*6,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*14.5,y:-32*0.5,w:32*9,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*23,y:-32*1.5,w:32*12,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*30.5,y:-32*7.5,w:32*7,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*33,y:-32*0,w:32*2,h:32*17,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*27,y:32*7.5,w:32*12,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*6,y:32*6.5,w:32*34,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*10,y:32*3,w:32*2,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*7,y:32*1,w:32*2,h:32*3,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*11,y:32*1,w:32*2,h:32*3,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*5,y:-32*1,w:32*2,h:32*3,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*2.5,y:-32*3.5,w:32*5,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*2.5,y:-32*6.5,w:32*5,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:-32*1,y:-32*5.5,w:32*2,h:32*4,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*7.5,y:-32*5,w:32*5,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*14,y:-32*5,w:32*4,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*19,y:-32*5,w:32*2,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*14,y:-32*7.5,w:32*12,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*30,y:-32*6,w:32*2,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*34,y:-32*6,w:32*2,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*31,y:-32*8.5,w:32*26,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*18,y:32*1.5,w:32*16,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*34,y:32*0.5,w:32*20,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -1, x:32*43,y:-32*4,w:32*2,h:32*7,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},



                    {level: 1, x:32*7.5,y:32*3,w:32*2,h:32*0.25,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false, p:true},
                    {level: 1, x:32*4.5,y:32*0.5,w:32*2,h:32*0.25,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false, p:true},
                    {level: 1, x:32*1.5,y:-32*2,w:32*2,h:32*0.25,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false, p:true},




                    {level: 1, x:-32*10,y:-32*3,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"box",n1:-1,n2:0,mi:false},
                    {level: 1, x:-32*27.2,y:32*7,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"box",n1:-1,n2:0,mi:false},
                    {level: 1, x:-32*5,y:32*6,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"box",n1:-1,n2:0,mi:false},
                    {level: 1, x:32*17,y:32*0,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"box",n1:-1,n2:0,mi:false},
                ],
                cables: [


                    {x:32*25 + 13*0 + 10*0,y:-32*0.5 - 13/2 - 13*0 - 10*0, type:"cablev", index: 13},
                    {x:32*25 + 13*0 + 10*0,y:-32*0.5 - 13/2 - 13*1 - 10*0, type:"cablev", index: 13},
                    {x:32*25 + 13*0 + 10*0,y:-32*0.5 - 13/2 - 13*2 - 10*0, type:"cablev", index: 13},
                    {x:32*25 + 13*0 + 10*0,y:-32*0.5 - 13/2 - 13*3 - 10*0, type:"cablev", index: 13},
                    {x:32*25 + 13*0 + 10*0,y:-32*0.5 - 13/2 - 13*4 - 10*0, type:"cablev", index: 13},
                    {x:32*25 + 13*0 + 10*0,y:-32*0.5 - 13/2 - 13*5 - 10*0, type:"cablev", index: 13},
                    {x:32*25 + 13*0 + 10*0,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableNode", index: 13},
                    {x:32*25 + 13*0 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*1 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*2 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*3 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*4 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*5 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*6 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*7 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*8 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*9 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*10 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*11 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*12 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*13 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*14 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*15 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*16 + 10*1,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 13},
                    {x:32*25 + 13*16 + 10*2,y:-32*0.5 - 13/2 - 13*5 - 10*1, type:"cableNode", index: 13},
                    {x:32*25 + 13*16 + 10*2,y:-32*0.5 - 13/2 - 13*5 - 10*2, type:"cablev", index: 13},
                    {x:32*25 + 13*16 + 10*2,y:-32*0.5 - 13/2 - 13*6 - 10*2, type:"cablev", index: 13},



                    {x:32*14.05 + 13*0 + 10*0,y:32*0.5 - 13/2 - 13*0 - 10*0, type:"cablev", index: 12},
                    {x:32*14.05 + 13*0 + 10*0,y:32*0.5 - 13/2 - 13*1 - 10*0, type:"cablev", index: 12},
                    {x:32*14.05 + 13*0 + 10*0,y:32*0.5 - 13/2 - 13*1 - 10*0, type:"cablev", index: 12},
                    {x:32*14.05 + 13*0 + 10*0,y:32*0.5 - 13/2 - 13*2 - 10*0, type:"cablev", index: 12},
                    {x:32*14.05 + 13*0 + 10*0,y:32*0.5 - 13/2 - 13*3 - 10*0, type:"cablev", index: 12},
                    {x:32*14.05 + 13*0 + 10*0,y:32*0.5 - 13/2 - 13*4 - 10*0, type:"cablev", index: 12},
                    {x:32*14.05 + 13*0 + 10*0,y:32*0.5 - 13/2 - 13*5 - 10*0, type:"cablev", index: 12},
                    {x:32*14.05 + 13*0 + 10*0,y:32*0.5 - 13/2 - 13*5 - 10*1, type:"cableNode", index: 12},
                    {x:32*14.05 + 13*0 + 10*1,y:32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 12},
                    {x:32*14.05 + 13*1 + 10*1,y:32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 12},
                    {x:32*14.05 + 13*2 + 10*1,y:32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 12},
                    {x:32*14.05 + 13*3 + 10*1,y:32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 12},
                    {x:32*14.05 + 13*4 + 10*1,y:32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 12},
                    {x:32*14.05 + 13*5 + 10*1,y:32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 12},
                    {x:32*14.05 + 13*6 + 10*1,y:32*0.5 - 13/2 - 13*5 - 10*1, type:"cableh", index: 12},
                    {x:32*14.05 + 13*6 + 10*2,y:32*0.5 - 13/2 - 13*5 - 10*1, type:"cableNode", index: 12},
                    {x:32*14.05 + 13*6 + 10*2,y:32*0.5 - 13/2 - 13*5 - 10*2, type:"cablev", index: 12},
                    {x:32*14.05 + 13*6 + 10*2,y:32*0.5 - 13/2 - 13*6 - 10*2, type:"cablev", index: 12},


                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*0 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*1 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*2 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*3 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*4 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*5 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*6 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*7 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*8 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*9 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*10 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*11 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*12 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*13 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*14 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*15 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*16 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*17 + 10*0, type:"cablev", index: 11},
                    {x:32*5 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableNode", index: 11},
                    {x:32*5 + 13*0 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*1 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*2 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*3 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*4 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*5 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*6 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*7 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*8 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*9 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*10 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*11 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*12 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*13 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*14 + 10*1,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableh", index: 11},
                    {x:32*5 + 13*14 + 10*2,y:32*5.5 - 13/2 - 13*17 - 10*1, type:"cableNode", index: 11},
                    {x:32*5 + 13*14 + 10*2,y:32*5.5 - 13/2 - 13*17 - 10*2, type:"cablev", index: 11},
                    {x:32*5 + 13*14 + 10*2,y:32*5.5 - 13/2 - 13*18 - 10*2, type:"cablev", index: 11},





                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*0 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*1 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*2 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*3 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*4 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*5 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*6 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*7 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*8 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*9 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*10 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*11+ 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*12 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*13 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*14 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*15 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*16 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*17 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*18 + 10*0, type:"cablev", index: 10},
                    {x:-32*2 + 13*0 + 10*0,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableNode", index: 10},
                    {x:-32*2 + 13*0 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*1 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*2 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*3 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*4 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*5 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*6 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*7 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*8 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*9 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*10 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*11 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*12 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*13 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*14 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*15 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*16 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*17 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*18 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*19 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*20 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*21 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*22 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*23 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*24 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*25 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*26 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*27 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*28 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*29 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*30 + 10*1,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableh", index: 10},
                    {x:-32*2 + 13*30 + 10*2,y:32*5.5 - 13/2 - 13*18 - 10*1, type:"cableNode", index: 10},
                    {x:-32*2 + 13*30 + 10*2,y:32*5.5 - 13/2 - 13*18 - 10*2, type:"cablev", index: 10},
                    












                    {x:-32*14,y:-32*8.5 - 13/2, type:"cablev", index: 7}, 
                    {x:-32*14,y:-32*8.5 - 13/2 - 13, type:"cablev", index: 7},
                    {x:-32*14,y:-32*8.5 - 13/2 - 13-13, type:"cablev", index: 7},
                    {x:-32*14,y:-32*8.5 - 13/2 - 13-13-13, type:"cablev", index: 7},
                    {x:-32*14,y:-32*8.5 - 13/2 - 13-13-13-13, type:"cablev", index: 7},
                    {x:-32*14,y:-32*8.5 - 13/2 - 13-13-13-13-13, type:"cablev", index: 7},
                    {x:-32*14,y:-32*8.5 - 13/2 - 13-13-13-13-13-13, type:"cablev", index: 7},
                    {x:-32*14,y:-32*8.5 - 13/2 - 13-13-13-13-13-13-13, type:"cablev", index: 7},
                    {x:-32*14,y:-32*8.5 - 13/2 - 13-13-13-13-13-13-13-10, type:"cableNode", index: 7},
                    {x:-32*14+10,y:-32*8.5 - 13/2 - 13-13-13-13-13-13-13-10, type:"cableh", index: 7},
                    {x:-32*14+10+13,y:-32*8.5 - 13/2 - 13-13-13-13-13-13-13-10, type:"cableh", index: 7},
                    {x:-32*14+10+13+13,y:-32*8.5 - 13/2 - 13-13-13-13-13-13-13-10, type:"cableh", index: 7},
                    {x:-32*14+10+13+13,y:-32*8.5 - 13/2 - 13-13-13-13-13-13-13-10, type:"cableh", index: 7},
                    {x:-32*14+10+13+13+13,y:-32*8.5 - 13/2 - 13-13-13-13-13-13-13-10, type:"cableh", index: 7},
                    {x:-32*14+10+13+13+13+10,y:-32*8.5 - 13/2 - 13-13-13-13-13-13-13-10, type:"cableNode", index: 7},
                    {x:-32*14+10+13+13+13+10,y:-32*8.5 - 13/2 - 13-13-13-13-13-13-13-10-10, type:"cablev", index: 7},
                    {x:-32*14+10+13+13+13+10,y:-32*8.5 - 13/2 - 13-13-13-13-13-13-13-10-10-13, type:"cablev", index: 7},



                    //{x:-32*14,y:-32*8.5 - 13/2 - 23, type:"cableNode", index: 7},
                    //{x:-32*14 + 10,y:-32*8.5 - 13/2 - 23, type:"cableh", index: 7},
                    //{x:-32*14 + 23,y:-32*8.5 - 13/2 - 23, type:"cableh", index: 7},
                    //{x:-32*14 + 36,y:-32*8.5 - 13/2 - 23, type:"cableh", index: 7},
                    //{x:-32*14 + 36 + 13,y:-32*8.5 - 13/2 - 23, type:"cableNodeEnd", index: 7},


                    {x:-32*14,y:-32*1.5 - 13/2, type:"cablev", index: 8}, 
                    {x:-32*14,y:-32*1.5 - 13/2-13, type:"cablev", index: 8}, 
                    {x:-32*14,y:-32*1.5 - 13/2-13-13, type:"cablev", index: 8}, 
                    {x:-32*14,y:-32*1.5 - 13/2-13-13-13, type:"cablev", index: 8}, 
                    {x:-32*14,y:-32*1.5 - 13/2-13-13-13-13, type:"cablev", index: 8}, 
                    {x:-32*14,y:-32*1.5 - 13/2-13-13-13-13-13, type:"cablev", index: 8}, 
                    {x:-32*14,y:-32*1.5 - 13/2-13-13-13-13-13-13, type:"cablev", index: 8}, 
                    {x:-32*14,y:-32*1.5 - 13/2-13-13-13-13-13-13-13, type:"cablev", index: 8}, 
                    {x:-32*14,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13, type:"cablev", index: 8}, 
                    {x:-32*14,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableNode", index: 8}, 
                    {x:-32*14 - 10,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableh", index: 8}, 
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-10,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10, type:"cableNode", index: 8},
                    {x:-32*14 - 10-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-13-10,y:-32*1.5 - 13/2-13-13-13-13-13-13-13-13-10-10, type:"cablev", index: 8}, 

                    {x:-32*15.5,y:32*5.5 - 13/2, type:"cablev", index: 9}, 
                    {x:-32*15.5,y:32*5.5 - 13/2-13, type:"cablev", index: 9}, 
                    {x:-32*15.5,y:32*5.5 - 13/2-13-13, type:"cablev", index: 9}, 
                    {x:-32*15.5,y:32*5.5 - 13/2-13-13-13, type:"cablev", index: 9}, 
                    {x:-32*15.5,y:32*5.5 - 13/2-13-13-13-13, type:"cablev", index: 9}, 
                    {x:-32*15.5,y:32*5.5 - 13/2-13-13-13-13-13, type:"cablev", index: 9}, 
                    {x:-32*15.5,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableNode", index: 9}, 
                    {x:-32*15.5 + 10,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13+13+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13+13+13+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13+13+13+13+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13+13+13+13+13+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13+13+13+13+13+13+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableh", index: 9}, 
                    {x:-32*15.5 + 10+13+13+13+13+13+13+13+13+13+13+13+13+13+13+13+13,y:32*5.5 - 13/2-13-13-13-13-13-10, type:"cableNodeEnd", index: 9}, 
                
                ],
                mirror: []
            },
            {
                respawnX: -1200,
                respawnY: 300,
                noMagic: [
                    {x:32*5.5,y:230,w:32*13,h:32*6.8},
                    {x:32*29.5,y:32*17,w:32*7,h:32*3}
                ],
                checkPoint: [
                    {x:-150, y:32*9, bottom:0, top:161, end: false},
                    {x:32*19.5, y:141, bottom:0, top:161, end: false},
                    {x:32*49.5, y:32*9, bottom:32*4, top:32*9, end: true}
                ],
                texts: [],
                gems: [
                    {x:-1120, y:38.63, w:10, h:10},
                    {x:-1100, y:38.63, w:10, h:10},
                    {x:-1080, y:38.63, w:10, h:10},
                    {x:-300, y: 130, w:10, h:10},
                    {x:-320, y: 130, w:10, h:10},
                    {x:-340, y: 130, w:10, h:10},
                    {x:367, y: 434.5, w:10, h:10},
                    {x:387, y: 434.5, w:10, h:10},
                    {x:407, y: 434.5, w:10, h:10},
                    {x:1350, y: 220, w:10, h:10},
                ],
                rects: [
                    {level: 2, x:0,y:0,w:10,h:27,ax:0,ay:0,HitDown:false,type:"player",n1:-1,n2:0,mi:false},

                    {level: 2, x:32*38.5,y:32*17,w:32*2,h:32*5,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//1

                    {level: 2, x:32*30.5,y:32*20,w:40,h:0,ax:0,ay:0,HitDown:false,type:"button",n1:1,n2:0,mi:false},//2
                    {level: 2, x:32*35.5,y:32*20,w:40,h:0,ax:0,ay:0,HitDown:false,type:"button",n1:1,n2:0,mi:false},//3



                    {level: -2, x:-32*30.5,y:32*11,w:32*20,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:-32*39.5,y:32*9,w:32*2,h:32*6,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:-32*38,y:32*7,w:32*5,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:-32*36.5,y:32*3,w:32*2,h:32*10,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:-32*6,y:-32*1,w:32*63,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:-32*11,y:32*12,w:32*15,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:-32*19.5,y:32*9,w:32*6,h:32*8,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:-32*0,y:32*10.5,w:32*11,h:32*11,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*13,y:32*15,w:32*15,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*19.5,y:32*12,w:32*2,h:32*14,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*24.5,y:32*5,w:32*2,h:32*14,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*24.5,y:32*18,w:32*10,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*33,y:32*21,w:32*11,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*28.5,y:32*19.5,w:32*2,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*37.5,y:32*19.5,w:32*2,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*30.5,y:32*11,w:32*14,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*36.5,y:32*11,w:32*2,h:32*6,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*40.5,y:32*9,w:32*2,h:32*10,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*38.5,y:32*9,w:32*6,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*43.5,y:32*5,w:32*8,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*49.5,y:32*3,w:32*8,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*48.5,y:32*10,w:32*10,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*41,y:32*18,w:32*9,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*44.5,y:32*14,w:32*2,h:32*10,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -2, x:32*52.5,y:15*14,w:32*2,h:32*9,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},


                    {level: 2, x:-32*36,y:32*3 + 10,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"piperrb",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*36 + 40,y:32*3 + 10,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipelrm",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*36 + 80,y:32*3 + 10,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipelrm",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*36 + 120,y:32*3 + 10,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipelum",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*36 + 120,y:32*3 - 40 + 10,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipeudm",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*36 + 120,y:32*3 - 80 + 10,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipeudm",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*36 + 120,y:32*3 - 120 + 10,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipeuub",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*30 + 120,y:32*10.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipeuub",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*30 + 120,y:32*10.5 - 40,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipeudm",n1:-1,n2:0,mi:false},

                    {level: 2, x:-32*5,y:32*11.5 - 40,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipellb",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*10,y:32*11.5 - 40,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"piperum",n1:-1,n2:0,mi:false},

                    {level: 2, x:32*5,y:32*7.5 - 40,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"piperrb",n1:-1,n2:0,mi:false},

                    {level: 2, x:-32*3,y:32*5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipelrm",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*3 + 40,y:32*5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipelrm",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*3 + 40 + 40,y:32*5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipelrm",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*3 + 40 + 40 + 40,y:32*5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipelrm",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*3 + 40 + 40 + 40 + 40,y:32*5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipelrm",n1:-1,n2:0,mi:false},
                    {level: 2, x:-32*3 + 40 + 40 + 40 + 40 + 40,y:32*5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipelrm",n1:-1,n2:0,mi:false},

                    {level: 2, x:32*25.5,y:32*17,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipeudm",n1:-1,n2:0,mi:false},
                    {level: 2, x:32*27.5,y:32*17,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipeudm",n1:-1,n2:0,mi:false},
                    {level: 2, x:32*43 - 3,y:32*16.45 - 20,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipeuub",n1:-1,n2:0,mi:false, freeze: true},
                    {level: 2, x:32*43 - 3,y:32*16.45 - 20 + 40,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipelub",n1:-1,n2:0,mi:false, freeze: true},
                    {level: 2, x:32*43 - 3 - 40,y:32*16.45 - 20 + 40,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"pipedrb",n1:-1,n2:0,mi:false, freeze: true},

                    
                ],
                cables: [

                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*0 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*1 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*2 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*3 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*4 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*5 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*6 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*7 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*8 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*9 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*10 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*11 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*12 - 10*0, type:"cablev", index: 3},
                    {x:32*35.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*12 - 10*1, type:"cableNode", index: 3},
                    {x:32*35.5 + 13*0 + 10*1,y:32*20 - 13/2 - 13*12 - 10*1, type:"cableh", index: 3},
                    {x:32*35.5 + 13*1 + 10*1,y:32*20 - 13/2 - 13*12 - 10*1, type:"cableh", index: 3},
                    {x:32*35.5 + 13*2 + 10*1,y:32*20 - 13/2 - 13*12 - 10*1, type:"cableh", index: 3},
                    {x:32*35.5 + 13*3 + 10*1,y:32*20 - 13/2 - 13*12 - 10*1, type:"cableh", index: 3},
                    {x:32*35.5 + 13*4 + 10*1,y:32*20 - 13/2 - 13*12 - 10*1, type:"cableh", index: 3},
                    {x:32*35.5 + 13*5 + 10*1,y:32*20 - 13/2 - 13*12 - 10*1, type:"cableh", index: 3},





                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*0 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*1 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*2 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*3 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*4 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*5 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*6 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*7 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*8 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*9 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*10 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*11 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*12 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*13 - 10*0, type:"cablev", index: 2},
                    {x:32*30.5 + 13*0 + 10*0,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableNode", index: 2},
                    {x:32*30.5 + 13*0 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*1 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*2 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*3 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*4 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*5 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*6 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*7 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*8 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*9 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*10 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*11 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*12 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*13 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*14 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*15 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*16 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},
                    {x:32*30.5 + 13*17 + 10*1,y:32*20 - 13/2 - 13*13 - 10*1, type:"cableh", index: 2},




                ],
                mirror: []
            },
            {
                respawnX: -975,
                respawnY: -180,
                noMagic: [
                ],
                checkPoint: [
                    {x:32*11.5, y:-32*1, bottom:-32*3, top:-32*1, end: false},
                    {x:-32*17, y:32*9, bottom:32*6, top:32*9, end: false},
                    {x:-86.82588314784488, y:594.5, bottom:32*14, top:32*19, end: false},
                    {x:32*23, y:32*9, bottom:32*14, top:32*19, end: true},
                ],
                texts: [],
                gems: [
                    {x:645, y: 10, w:10, h:10},
                    {x:665, y: 10, w:10, h:10},
                    {x:685, y: 10, w:10, h:10},
                    {x:705, y: 10, w:10, h:10},
                    {x:725, y: 10, w:10, h:10},
                    {x:745, y: 10, w:10, h:10},
                    {x:765, y: 10, w:10, h:10},
                ],
                rects: [
                    {level: 3, x:0,y:0,w:10,h:27,ax:0,ay:0,HitDown:false,type:"player",n1:-1,n2:0,mi:false},

                    {level: 3, x:-32*18,y:-32*5.5,w:32*2,h:32*4,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//1
                    {level: 3, x:-32*6,y:-32*15,w:32*6,h:32*2,ax:0,ay:0,HitDown:false,type:"gater",n1:-1,n2:0,mi:false},//2
                    {level: 3, x:-32*3,y:-32*15,w:32*6,h:32*2,ax:0,ay:0,HitDown:false,type:"gatel",n1:-1,n2:0,mi:false},//3
                    {level: 3, x:32*6,y:-32*5.5,w:32*2,h:32*4,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//4
                    {level: 3, x:-32*15,y:32*7.5,w:32*2,h:32*4,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//5
                    {level: 3, x:-32*7,y:32*18.5,w:32*2,h:32*4,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//6
                    {level: 3, x:32*8,y:32*18.5,w:32*2,h:32*4,ax:0,ay:0,HitDown:false,type:"gated",n1:-1,n2:0,mi:false},//7


                    {level: 3, x:-32*21.5,y:-32*11.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"sense",n1:1,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5, triggered: false},//8
                    {level: 3, x:-32*14.5,y:-32*11.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"sense",n1:2,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5, triggered: false},//9
                    {level: 3, x:-32*14.5,y:-32*11.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"sense",n1:3,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5, triggered: false},//10
                    {level: 3, x:32*2.5,y:-32*11.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"sense",n1:4,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5, triggered: false},//11
                    {level: 3, x:-32*11,y:32*4,w:32*2,h:32*2,ax:0,ay:0,HitDown:false,type:"sense",n1:5,n2:0,mi:false, l: Math.sqrt(2*32*2*32*2)*0.5, triggered: false},//12
                    {level: 3, x:-32*10.5,y:32*14.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"sense",n1:6,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5, triggered: false},//13
                    {level: 3, x:32*4.5,y:32*14.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"sense",n1:7,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5, triggered: false},//14

                    {level: 3, x:32*9,y:-32*3,w:32*2,h:32*0.25,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false, p:true},

                    {level: -3, x:-32*24.5,y:-32*4,w:32*19,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*33,y:-32*9,w:32*2,h:32*10,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*21.5,y:-32*13,w:32*25,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*20,y:-32*11,w:32*2,h:32*6,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*16,y:-32*13,w:32*2,h:32*10,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*4,y:-32*13,w:32*2,h:32*10,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*8,y:-32*11,w:32*2,h:32*6,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*13,y:-32*17,w:32*8,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*1,y:-32*17,w:32*8,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*2,y:-32*18.5,w:32*2,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*10,y:-32*18.5,w:32*2,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*6,y:-32*20,w:32*10,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*13,y:-32*13,w:32*32,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*6,y:-32*0,w:32*22,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*16,y:-32*2,w:32*2,h:32*6,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*6,y:32*0,w:32*6,h:32*10,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*1,y:32*3,w:32*4,h:32*4,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*1,y:32*5.5,w:32*4,h:32*1,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*12,y:32*5.5,w:32*4,h:32*1,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*13,y:32*2.5,w:32*2,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*14.5,y:32*1,w:32*5,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*17,y:32*2.5,w:32*2,h:32*7,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*20,y:32*5,w:32*6,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*28,y:-32*4.5,w:32*2,h:32*19,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*15.5,y:-32*0,w:32*3,h:32*10,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*18,y:-32*4,w:32*14,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*20,y:32*8.5,w:32*18,h:32*11,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*9,y:32*0,w:32*6,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*6,y:32*11.5,w:32*26,h:32*5,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*22,y:32*13,w:32*2,h:32*18,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*9,y:32*15,w:32*2,h:32*6,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*6,y:32*13,w:32*2,h:32*6,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*10,y:32*13,w:32*2,h:32*6,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*10,y:32*10.5,w:32*8,h:32*3,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*11,y:32*20,w:32*32,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:-32*13,y:32*21,w:32*20,h:32*2,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},
                    {level: -3, x:32*26,y:32*17,w:32*2,h:32*8,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false},

                    {level: 3, x:-32*31.5,y:-32*5.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"lazer",n1:0,n2:0,mi:false, freeze: true},
                    {level: 3, x:-32*25,y:-32*5.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},


                    {level: 3, x:-32*14.5,y:-32*1.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"lazer",n1:0,n2:0,mi:false, freeze: true},
                    {level: 3, x:32*2.5,y:-32*1.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"lazer",n1:-180,n2:0,mi:false, freeze: true},

                    {level: 3, x:-32*13,y:-32*1.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*13,y:-32*2.8,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*11.8,y:-32*2.8,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*11.8,y:-32*1.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},


                    {level: 3, x:-32*7.7,y:-32*17.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*7.7,y:-32*18.8,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*6.5,y:-32*17.8,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*6.5,y:-32*18.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},

                    {level: 3, x:-32*5.2,y:-32*17.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*5.2,y:-32*18.8,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*4,y:-32*17.8,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*4,y:-32*18.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},


                    

                    {level: 3, x:-32*11,y:32*2,w:32*2,h:32*2,ax:0,ay:0,HitDown:false,type:"lazer",n1:0,n2:0,mi:false, freeze: true},

                    {level: 3, x:-32*5,y:32*9,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*6.2,y:32*9,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*7.4,y:32*9,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},
                    {level: 3, x:-32*8.6,y:32*9,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*32*1.2*32*1.2)*0.5},

                    {level: 3, x:32*10.5,y:32*7.5,w:32*1,h:32*1,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*32*1*32*1)*0.5, freeze: true},
                    {level: 3, x:32*10.5,y:32*8.5,w:32*1,h:32*1,ax:0,ay:0,HitDown:false,type:"mirror",n1:135,n2:0,mi:false, l: Math.sqrt(2*32*1*32*1)*0.5, freeze: true},



                    {level: 3, x:-32*15,y:32*14.5,w:32*1.2,h:32*1.2,ax:0,ay:0,HitDown:false,type:"lazer",n1:90,n2:0,mi:false, freeze: true},
                    
                    {level: 3, x:-32*13,y:32*20,w:27,h:27,ax:0,ay:0,HitDown:false,type:"mirror",n1:135,n2:0,mi:false, l: Math.sqrt(2*27*27)*0.5},
                    {level: 3, x:-32*14.2,y:32*20,w:27,h:27,ax:0,ay:0,HitDown:false,type:"mirror",n1:135,n2:0,mi:false, l: Math.sqrt(2*27*27)*0.5},
                    {level: 3, x:-32*13.6,y:32*18,w:27,h:27,ax:0,ay:0,HitDown:false,type:"mirror",n1:-135,n2:0,mi:false, l: Math.sqrt(2*27*27)*0.5},

                    
                    {level: 3, x:-32*0,y:32*18,w:27,h:27,ax:0,ay:0,HitDown:false,type:"mirror",n1:135,n2:0,mi:false, l: Math.sqrt(2*27*27)*0.5},

                ],
                cables: [


                    {x:32*4.5 + 13*0 + 10*0,y:32*14.5 + 13*0 - 10*0, type:"cablev", index: 14},
                    {x:32*4.5 + 13*0 + 10*0,y:32*14.5 + 13*1 - 10*0, type:"cablev", index: 14},
                    {x:32*4.5 + 13*0 + 10*0,y:32*14.5 + 13*2 - 10*0, type:"cablev", index: 14},
                    {x:32*4.5 + 13*0 + 10*0,y:32*14.5 + 13*3 - 10*0, type:"cablev", index: 14},
                    {x:32*4.5 + 13*0 + 10*0,y:32*14.5 + 13*4 - 10*0, type:"cablev", index: 14},
                    {x:32*4.5 + 13*0 + 10*0,y:32*14.5 + 13*4 + 10*1, type:"cableNode", index: 14},
                    {x:32*4.5 + 13*0 + 10*1,y:32*14.5 + 13*4 + 10*1, type:"cableh", index: 14},
                    {x:32*4.5 + 13*1 + 10*1,y:32*14.5 + 13*4 + 10*1, type:"cableh", index: 14},
                    {x:32*4.5 + 13*2 + 10*1,y:32*14.5 + 13*4 + 10*1, type:"cableh", index: 14},
                    {x:32*4.5 + 13*3 + 10*1,y:32*14.5 + 13*4 + 10*1, type:"cableh", index: 14},
                    {x:32*4.5 + 13*4 + 10*1,y:32*14.5 + 13*4 + 10*1, type:"cableh", index: 14},
                    {x:32*4.5 + 13*5 + 10*1,y:32*14.5 + 13*4 + 10*1, type:"cableh", index: 14},
                    {x:32*4.5 + 13*6 + 10*1,y:32*14.5 + 13*4 + 10*1, type:"cableh", index: 14},
                    {x:32*4.5 + 13*7 + 10*1,y:32*14.5 + 13*4 + 10*1, type:"cableh", index: 14},
                    {x:32*4.5 + 13*7 + 10*2,y:32*14.5 + 13*4 + 10*1, type:"cableNode", index: 14},
                    {x:32*4.5 + 13*7 + 10*2,y:32*14.5 + 13*4 + 10*0, type:"cablev", index: 14},
                    {x:32*4.5 + 13*7 + 10*2,y:32*14.5 + 13*3 + 10*0, type:"cablev", index: 14},







                    {x:-32*10.5 + 13*0 + 10*0,y:32*14.5 + 13*0 - 10*0, type:"cablev", index: 13},
                    {x:-32*10.5 + 13*0 + 10*0,y:32*14.5 + 13*1 - 10*0, type:"cablev", index: 13},
                    {x:-32*10.5 + 13*0 + 10*0,y:32*14.5 + 13*2 - 10*0, type:"cablev", index: 13},
                    {x:-32*10.5 + 13*0 + 10*0,y:32*14.5 + 13*3 - 10*0, type:"cablev", index: 13},
                    {x:-32*10.5 + 13*0 + 10*0,y:32*14.5 + 13*4 - 10*0, type:"cablev", index: 13},
                    {x:-32*10.5 + 13*0 + 10*0,y:32*14.5 + 13*5 - 10*0, type:"cablev", index: 13},
                    {x:-32*10.5 + 13*0 + 10*0,y:32*14.5 + 13*6 - 10*0, type:"cablev", index: 13},
                    {x:-32*10.5 + 13*0 + 10*0,y:32*14.5 + 13*7 - 10*0, type:"cablev", index: 13},
                    {x:-32*10.5 + 13*0 + 10*0,y:32*14.5 + 13*8 - 10*0, type:"cablev", index: 13},
                    {x:-32*10.5 + 13*0 + 10*0,y:32*14.5 + 13*9 - 10*0, type:"cablev", index: 13},
                    {x:-32*10.5 + 13*0 + 10*0,y:32*14.5 + 13*9 + 10*1, type:"cableNode", index: 13},
                    {x:-32*10.5 + 13*0 + 10*1,y:32*14.5 + 13*9 + 10*1, type:"cableh", index: 13},
                    {x:-32*10.5 + 13*1 + 10*1,y:32*14.5 + 13*9 + 10*1, type:"cableh", index: 13},
                    {x:-32*10.5 + 13*2 + 10*1,y:32*14.5 + 13*9 + 10*1, type:"cableh", index: 13},
                    {x:-32*10.5 + 13*3 + 10*1,y:32*14.5 + 13*9 + 10*1, type:"cableh", index: 13},
                    {x:-32*10.5 + 13*4 + 10*1,y:32*14.5 + 13*9 + 10*1, type:"cableh", index: 13},
                    {x:-32*10.5 + 13*5 + 10*1,y:32*14.5 + 13*9 + 10*1, type:"cableh", index: 13},
                    {x:-32*10.5 + 13*6 + 10*1,y:32*14.5 + 13*9 + 10*1, type:"cableh", index: 13},
                    {x:-32*10.5 + 13*7 + 10*1,y:32*14.5 + 13*9 + 10*1, type:"cableh", index: 13},
                    {x:-32*10.5 + 13*7 + 10*2,y:32*14.5 + 13*9 + 10*1, type:"cableNode", index: 13},
                    {x:-32*10.5 + 13*7 + 10*2,y:32*14.5 + 13*9 + 10*0, type:"cablev", index: 13},
                    {x:-32*10.5 + 13*7 + 10*2,y:32*14.5 + 13*8 + 10*0, type:"cablev", index: 13},






                    {x:-32*11 + 13*0 + 10*0,y:32*4 + 13*0 - 10*0, type:"cableh", index: 12},
                    {x:-32*11 + 13*1 + 10*0,y:32*4 + 13*0 - 10*0, type:"cableh", index: 12},
                    {x:-32*11 + 13*2 + 10*0,y:32*4 + 13*0 - 10*0, type:"cableh", index: 12},
                    {x:-32*11 + 13*3 + 10*0,y:32*4 + 13*0 - 10*0, type:"cableh", index: 12},
                    {x:-32*11 + 13*3 + 10*1,y:32*4 + 13*0 - 10*0, type:"cableNode", index: 12},
                    {x:-32*11 + 13*3 + 10*1,y:32*4 + 13*0 + 10*1, type:"cablev", index: 12},
                    {x:-32*11 + 13*3 + 10*1,y:32*4 + 13*1 + 10*1, type:"cablev", index: 12},
                    {x:-32*11 + 13*3 + 10*1,y:32*4 + 13*2 + 10*1, type:"cablev", index: 12},
                    {x:-32*11 + 13*3 + 10*1,y:32*4 + 13*3 + 10*1, type:"cablev", index: 12},
                    {x:-32*11 + 13*3 + 10*1,y:32*4 + 13*4 + 10*1, type:"cablev", index: 12},
                    {x:-32*11 + 13*3 + 10*1,y:32*4 + 13*4 + 10*2, type:"cableNode", index: 12},
                    {x:-32*11 + 13*3 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 + 13*2 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 + 13*1 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 + 13*0 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 - 13*1 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 - 13*2 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 - 13*3 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 - 13*4 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 - 13*5 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 - 13*6 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 - 13*7 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 - 13*8 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 - 13*9 + 10*0,y:32*4 + 13*4 + 10*2, type:"cableh", index: 12},
                    {x:-32*11 - 13*9 - 10*1,y:32*4 + 13*4 + 10*2, type:"cableNode", index: 12},
                    {x:-32*11 - 13*9 - 10*1,y:32*4 + 13*4 + 10*1, type:"cablev", index: 12},
                    {x:-32*11 - 13*9 - 10*1,y:32*4 + 13*3 + 10*21, type:"cablev", index: 12},






                    {x:32*2.5 + 13*0 + 10*0,y:-32*11.5 + 13*0 - 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*0 + 10*0,y:-32*11.5 + 13*1 - 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*0 + 10*0,y:-32*11.5 + 13*2 - 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*0 + 10*0,y:-32*11.5 + 13*3 - 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*0 + 10*0,y:-32*11.5 + 13*4 - 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*0 + 10*0,y:-32*11.5 + 13*5 - 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*0 + 10*0,y:-32*11.5 + 13*6 - 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*0 + 10*0,y:-32*11.5 + 13*7 - 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*0 + 10*0,y:-32*11.5 + 13*8 - 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*0 + 10*0,y:-32*11.5 + 13*9 - 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*0 + 10*0,y:-32*11.5 + 13*9 + 10*1, type:"cableNode", index: 11},
                    {x:32*2.5 + 13*0 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 11},
                    {x:32*2.5 + 13*1 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 11},
                    {x:32*2.5 + 13*2 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 11},
                    {x:32*2.5 + 13*3 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 11},
                    {x:32*2.5 + 13*4 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 11},
                    {x:32*2.5 + 13*5 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 11},
                    {x:32*2.5 + 13*6 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 11},
                    {x:32*2.5 + 13*7 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 11},
                    {x:32*2.5 + 13*7 + 10*2,y:-32*11.5 + 13*9 + 10*1, type:"cableNode", index: 11},
                    {x:32*2.5 + 13*7 + 10*2,y:-32*11.5 + 13*9 + 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*7 + 10*2,y:-32*11.5 + 13*8 + 10*0, type:"cablev", index: 11},
                    {x:32*2.5 + 13*7 + 10*2,y:-32*11.5 + 13*7 + 10*0, type:"cablev", index: 11},






                    {x:-32*14.5 + 13*0 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*1 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*2 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*3 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*4 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*5 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*6 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*7 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*8 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*9 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*10 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*11 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*12 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*14 + 10*0,y:-32*11.5 - 13*0 - 10*0, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*14 + 10*1,y:-32*11.5 - 13*0 - 10*0, type:"cableNode", index: 9},
                    {x:-32*14.5 + 13*14 + 10*1,y:-32*11.5 - 13*0 - 10*1, type:"cablev", index: 9},
                    {x:-32*14.5 + 13*14 + 10*1,y:-32*11.5 - 13*1 - 10*1, type:"cablev", index: 9},
                    {x:-32*14.5 + 13*14 + 10*1,y:-32*11.5 - 13*2 - 10*1, type:"cablev", index: 9},
                    {x:-32*14.5 + 13*14 + 10*1,y:-32*11.5 - 13*3 - 10*1, type:"cablev", index: 9},
                    {x:-32*14.5 + 13*14 + 10*1,y:-32*11.5 - 13*4 - 10*1, type:"cablev", index: 9},
                    {x:-32*14.5 + 13*14 + 10*1,y:-32*11.5 - 13*5 - 10*1, type:"cablev", index: 9},
                    {x:-32*14.5 + 13*14 + 10*1,y:-32*11.5 - 13*6 - 10*1, type:"cablev", index: 9},
                    {x:-32*14.5 + 13*14 + 10*1,y:-32*11.5 - 13*7 - 10*1, type:"cablev", index: 9},
                    {x:-32*14.5 + 13*14 + 10*1,y:-32*11.5 - 13*7 - 10*2, type:"cableNode", index: 9},
                    {x:-32*14.5 + 13*14 - 13*0 + 10*0,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*14 - 13*1 + 10*0,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*14 - 13*2 + 10*0,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*14 - 13*3 + 10*0,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*14 - 13*4 + 10*0,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*1 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*2 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*3 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*4 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*5 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*6 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*7 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*8 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*9 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*10 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*11 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*12 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*13 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},
                    {x:-32*14.5 + 13*13 + 13*14 + 10*2,y:-32*11.5 - 13*7 - 10*2, type:"cableh", index: 9},






                    {x:-32*21.5 + 13*0 + 10*0,y:-32*11.5 + 13*0 - 10*0, type:"cablev", index: 8},
                    {x:-32*21.5 + 13*0 + 10*0,y:-32*11.5 + 13*1 - 10*0, type:"cablev", index: 8},
                    {x:-32*21.5 + 13*0 + 10*0,y:-32*11.5 + 13*2 - 10*0, type:"cablev", index: 8},
                    {x:-32*21.5 + 13*0 + 10*0,y:-32*11.5 + 13*3 - 10*0, type:"cablev", index: 8},
                    {x:-32*21.5 + 13*0 + 10*0,y:-32*11.5 + 13*4 - 10*0, type:"cablev", index: 8},
                    {x:-32*21.5 + 13*0 + 10*0,y:-32*11.5 + 13*5 - 10*0, type:"cablev", index: 8},
                    {x:-32*21.5 + 13*0 + 10*0,y:-32*11.5 + 13*6 - 10*0, type:"cablev", index: 8},
                    {x:-32*21.5 + 13*0 + 10*0,y:-32*11.5 + 13*7 - 10*0, type:"cablev", index: 8},
                    {x:-32*21.5 + 13*0 + 10*0,y:-32*11.5 + 13*8 - 10*0, type:"cablev", index: 8},
                    {x:-32*21.5 + 13*0 + 10*0,y:-32*11.5 + 13*9 - 10*0, type:"cablev", index: 8},
                    {x:-32*21.5 + 13*0 + 10*0,y:-32*11.5 + 13*9 + 10*1, type:"cableNode", index: 8},
                    {x:-32*21.5 + 13*0 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 8},
                    {x:-32*21.5 + 13*1 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 8},
                    {x:-32*21.5 + 13*2 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 8},
                    {x:-32*21.5 + 13*3 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 8},
                    {x:-32*21.5 + 13*4 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 8},
                    {x:-32*21.5 + 13*5 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 8},
                    {x:-32*21.5 + 13*6 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 8},
                    {x:-32*21.5 + 13*7 + 10*1,y:-32*11.5 + 13*9 + 10*1, type:"cableh", index: 8},
                    {x:-32*21.5 + 13*7 + 10*2,y:-32*11.5 + 13*9 + 10*1, type:"cableNode", index: 8},
                    {x:-32*21.5 + 13*7 + 10*2,y:-32*11.5 + 13*9 + 10*0, type:"cablev", index: 8},
                    {x:-32*21.5 + 13*7 + 10*2,y:-32*11.5 + 13*8 + 10*0, type:"cablev", index: 8},





                ],
                mirror: []
            },
            {
                respawnX: 0,
                respawnY: 0,
                noMagic: [],
                checkPoint: [],
                texts: [],
                gems: [],
                rects: [
                    {level: 4, x:0,y:0,w:10,h:20,ax:0,ay:0,HitDown:false,type:"player",n1:-1,n2:0,mi:false},
                    {level: 4, x:0,y:30 + 5000/2,w:10000,h:5000,ax:0,ay:0,HitDown:false,type:"platform",n1:-1,n2:0,mi:false}
                ],
                cables: [],
                mirror: []
            }
        ];
    }
