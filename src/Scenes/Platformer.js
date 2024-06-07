class Platformer extends Phaser.Scene {
  constructor() {
    super("platformerScene");
  }

  init() {
    //this.SCALE = 1.5;
    this.SCALE = 1;
    this.PARTICLE_VELOCITY = 50;
    this.width = config.width;
    this.height = config.height;
    //the level the player is on
    this.CurrentLevel = 2;

    this.score = 0;
    this.scores = {};
    this.maxScore = function () {
      let out = 0;
      for (let key in this.scores) {
        out += this.scores[key];
      }
      return out;
    }
    this.btime = 0;

    this.GlobalXOffset = 0;
    this.GlobalYOffset = 0;
    this.tmpSprites = [];
    this.mouseIsPressed = false;
    this.mouseX = 0;
    this.mouseY = 0;

    this.mouseDown = this.input.on('pointerdown', (pointer) => {
      this.mouseIsPressed = true;
    });
    this.mouseUp = this.input.on('pointerup', (pointer) => {
      this.mouseIsPressed = false;
    });


    //index of currently dragged block
    this.dragIndex = -1;
    //the acceleration of this.gravity
    //this.gravity = 0.1;
    this.gravity = 0.05;
    //a value that determines how fast you drag blocks
    this.dragInterpSpeed = 5;
    //the max speed that you can drag blocks at
    this.maxDragSpeed = 3;
    //x and y of the respawn location for the player
    this.respawnX = 70;
    this.respawnY = 220;
    //if the player is this.dead
    this.dead = false;
    //an array holding all of the no magic zones
    this.noMagic = [{ x: 646, y: 200, w: 109, h: 40 }];
    //an array holding all of the checkpoints
    this.checkPoint = [204, 1100, 1650, 2080, 2223];
    //an array holding all of the blocks
    this.rects = [];
    //an array holding all gems
    this.gems = [];
    //an array holding all this.lazers
    this.lazer = [];
    //an array holding all this.mirrors
    this.mirror = [];
    //mapImage
    this.mapImage = null;

    //load a level with its number, bReset resets extra thinga for first load
    this.loadLevel = function (num, bReset) {
      //get level from level data
      var level = JSON.parse(JSON.stringify(Level.Levels[num - 1]));
      //destroy all rectangle and gem sprites
      for (let i = 0; i < this.rects.length; i++) {
        if (this.rects[i].sprite) {
          this.rects[i].sprite.destroy(true);
        }
        if (this.rects[i].sprite1) {
          this.rects[i].sprite1.destroy(true);
        }
        if (this.rects[i].sprite2) {
          this.rects[i].sprite2.destroy(true);
        }
      }
      for (let i = 0; i < this.gems.length; i++) {
        if (this.gems[i].sprite) {
          this.gems[i].sprite.destroy(true);
        }
      }
      if(num === 1){
        this.mapImage = this.add.sprite(this.width, this.height, "map1");
        this.mapImage.x = 0;
        this.mapImage.y = 0;
        this.mapImage.depth = -10000;
      }

      if(num === 2){
        this.mapImage = this.add.sprite(this.width, this.height, "map2");
        this.mapImage.x = 0;
        this.mapImage.y = 0;
        this.mapImage.depth = -10000;
      }

      if(num === 3){
        this.mapImage = this.add.sprite(this.width, this.height, "map3");
        this.mapImage.x = 0;
        this.mapImage.y = 0;
        this.mapImage.depth = -10000;
      }

      //setup level based on data
      this.dead = false;
      this.noMagic = level.noMagic;
      this.checkPoint = level.checkPoint;
      this.rects = level.rects;
      this.mirror = level.mirror;
      this.lazer = [];
      if (bReset) {
        this.respawnX = level.respawnX;
        this.respawnY = level.respawnY;
        this.gems = level.gems;
      }
      this.rects[0].x = this.respawnX;
      this.rects[0].y = this.respawnY;
      //add number of gems in level to automatic max gem system
      this.scores[num] = this.gems.length;

      //setup textures for loaded objects
      for (let i = 0; i < this.rects.length; i++) {
        this.rects[i].spriteShiftx = 0;
        this.rects[i].spriteShifty = 0;
        if (this.rects[i].type === "box") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = this.rects[i].w / tex1.height;
        }
        if (this.rects[i].type === "pipeudm") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = (32*1.2) / tex1.height;

          this.rects[i].sprite2 = this.add.sprite(this.rects[i].w, this.rects[i].h, "pipe1");
          let tex2 = this.textures.get("pipe1").getSourceImage();
          this.rects[i].sprite2.scale = (32*1.2) / tex2.height;
        }
        if (this.rects[i].type === "pipelrm") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = (32*1.2) / tex1.height;

          this.rects[i].sprite2 = this.add.sprite(this.rects[i].w, this.rects[i].h, "pipe2");
          let tex2 = this.textures.get("pipe2").getSourceImage();
          this.rects[i].sprite2.scale = (32*1.2) / tex2.width;
        }
        if (this.rects[i].type === "pipellb") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = (32*1.2) / tex1.height;

          this.rects[i].sprite2 = this.add.sprite(this.rects[i].w, this.rects[i].h, "pipe2");
          let tex2 = this.textures.get("pipe2").getSourceImage();
          this.rects[i].sprite2.scale = (32*1.2) / tex2.width;
        }
        if (this.rects[i].type === "piperum") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = (32*1.2) / tex1.width;

          this.rects[i].sprite2 = this.add.sprite(this.rects[i].w, this.rects[i].h, "pipe5");
          let tex2 = this.textures.get("pipe5").getSourceImage();
          this.rects[i].sprite2.scale = (32*1.2) / tex2.width;
        }
        if (this.rects[i].type === "pipeuub") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = (32*1.2) / tex1.height;

          this.rects[i].sprite2 = this.add.sprite(this.rects[i].w, this.rects[i].h, "pipe1");
          let tex2 = this.textures.get("pipe1").getSourceImage();
          this.rects[i].sprite2.scale = (32*1.2) / tex2.height;
        }
        if (this.rects[i].type === "pipeddb") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = (32*1.2) / tex1.height;

          this.rects[i].sprite2 = this.add.sprite(this.rects[i].w, this.rects[i].h, "pipe1");
          let tex2 = this.textures.get("pipe1").getSourceImage();
          this.rects[i].sprite2.scale = (32*1.2) / tex2.height;
        }
        if (this.rects[i].type === "piperrb") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = (32*1.2) / tex1.height;

          this.rects[i].sprite2 = this.add.sprite(this.rects[i].w, this.rects[i].h, "pipe2");
          let tex2 = this.textures.get("pipe2").getSourceImage();
          this.rects[i].sprite2.scale = (32*1.2) / tex2.width;
        }
        if (this.rects[i].type === "pipelum") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = (32*1.2) / tex1.height;

          this.rects[i].sprite2 = this.add.sprite(this.rects[i].w, this.rects[i].h, "pipe3");
          let tex2 = this.textures.get("pipe3").getSourceImage();
          let tmp = 9;
          this.rects[i].sprite2.scale = ((32*1.2) - tmp) / tex2.height;
          this.rects[i].spriteShiftx = -tmp / 2;
          this.rects[i].spriteShifty = -tmp / 2;
        }
        if (this.rects[i].type === "pipelub") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = (32*1.2) / tex1.width;

          this.rects[i].sprite2 = this.add.sprite(this.rects[i].w, this.rects[i].h, "pipe3");
          let tex2 = this.textures.get("pipe3").getSourceImage();
          let tmp = 9;
          this.rects[i].sprite2.scale = ((32*1.2) - tmp) / tex2.height;
          this.rects[i].spriteShiftx = -tmp / 2;
          this.rects[i].spriteShifty = -tmp / 2;
        }
        if (this.rects[i].type === "pipedrb") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = (32*1.2) / tex1.width;

          this.rects[i].sprite2 = this.add.sprite(this.rects[i].w, this.rects[i].h, "pipe6");
          let tex2 = this.textures.get("pipe6").getSourceImage();
          let tmp = 9;
          this.rects[i].sprite2.scale = ((32*1.2) - tmp) / tex2.height;
          this.rects[i].spriteShiftx = tmp / 2;
          this.rects[i].spriteShifty = tmp / 2;
        }
        if (this.rects[i].type === "pipedlm") {
          this.rects[i].sprite1 = this.add.sprite(this.rects[i].w, this.rects[i].h, "tileGrey");
          let tex1 = this.textures.get("tileGrey").getSourceImage();
          this.rects[i].sprite1.scale = (32*1.2) / tex1.height;

          this.rects[i].sprite2 = this.add.sprite(this.rects[i].w, this.rects[i].h, "pipe4");
          let tex2 = this.textures.get("pipe4").getSourceImage();
          let tmp = 5;
          this.rects[i].sprite2.scale = ((32*1.2) - tmp) / tex2.height;
          this.rects[i].spriteShiftx = -tmp / 2;
          this.rects[i].spriteShifty = tmp / 2;
        }
      }
      for (let i = 0; i < this.rects.length; i++) {
        this.rects[i].sprite = null;
        if (this.rects[i].type.substring(0, 4) === "gate") {
          this.rects[i].sprite = this.add.tileSprite(0, 0, this.rects[i].w, this.rects[i].h, "tileGrey2");
          let tex = this.textures.get("tileGrey2").getSourceImage();
          this.rects[i].sprite.tileScaleX = 20 / tex.width;
          this.rects[i].sprite.tileScaleY = 20 / tex.height;
        }
        if (this.rects[i].type === "platform") {
          this.rects[i].sprite = this.add.tileSprite(0, 0, this.rects[i].w, this.rects[i].h, "metal");
          let tex = this.textures.get("metal").getSourceImage();
          this.rects[i].sprite.tileScaleX = 20 / tex.width;
          this.rects[i].sprite.tileScaleY = 20 / tex.height;
        }
      }
      for (let i = 0; i < this.gems.length; i++) {
        this.gems[i].sprite = this.add.sprite(this.gems[i].w, this.gems.h, "gem");
        let tex = this.textures.get("gem").getSourceImage();
        this.gems[i].sprite.scale = 20 / tex.height;
      }
    };
    this.Fill = color(255, 255, 255);
    this.Stroke = color(255, 255, 255);
    this.StrokeWeight = 1;
  }

  preload() {
    //load asset files
    this.load.setPath("./assets/");
    this.load.image("map1", "map1.png");
    this.load.image("map2", "map2.png");
    this.load.image("map3", "map3.png");
    this.load.image("metal", "tiles/metalCenter.png");
    this.load.image("pipe1", "tiles/pipeGreen_25.png");
    this.load.image("pipe2", "tiles/pipeGreen_26.png");
    this.load.image("pipe3", "tiles/pipeGreen_36.png");
    this.load.image("pipe4", "tiles/pipeGreen_24.png");
    this.load.image("pipe5", "tiles/pipeGreen_35.png");
    this.load.image("pipe6", "tiles/pipeGreen_23.png");
    this.load.image("tileGrey", "tiles/tileGrey_01.png");
    this.load.image("tileGrey2", "tiles/tile_0022.png");
    this.load.image("background", "tiles/Marble/tile_0070.png");
    this.load.image("gem", "tiles/platformPack_item001.png");

    this.load.audio('jump', ['sounds/impactSoft_heavy_001.ogg']);
    this.load.audio('land', ['sounds/impactSoft_medium_000.ogg']);
    this.load.audio('walk', ['sounds/footstep_concrete_001.ogg']);
    this.load.audio('gem', ['sounds/toggle_002.ogg']);
  }

  create() {


    //setup sounds
    this.jumpSound = this.sound.add("jump");
    this.jumpSound.loop = false;
    this.jumpSound.volume = 1.0;

    this.landSound = this.sound.add("land");
    this.landSound.loop = false;
    this.landSound.volume = 1.0;

    this.walkSound = this.sound.add("walk");
    this.walkSound.loop = true;
    this.walkSound.volume = 1.0;
    this.walkSound.setRate(0.7);

    this.gemSound = this.sound.add("gem");
    this.gemSound.loop = false;
    this.gemSound.volume = 1.0;




    //setup text objects
    this.win = this.add.text(0, 0, 'You Won!!!, press enter to restart the game', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
    this.scoreText = this.add.text(0, 0, 'Score: 0', { fontFamily: 'Arial', fontSize: 15, color: '#ffffff' });
    this.helpTxt = this.add.text(0, 0, 'You Won!!!, press enter to restart the game', { fontFamily: 'Arial', fontSize: 15, color: '#000000' });
    this.helpTxt.visible = true;

    //setup keyboard controls
    this.WKey = this.input.keyboard.addKey("W");
    this.AKey = this.input.keyboard.addKey("A");
    this.SKey = this.input.keyboard.addKey("S");
    this.DKey = this.input.keyboard.addKey("D");
    this.HKey = this.input.keyboard.addKey("H");
    this.RKey = this.input.keyboard.addKey("R");
    this.EnterKey = this.input.keyboard.addKey("Enter");
    this.start = true;


    // setup simple shape rendering
    this.graphics = this.add.graphics();
    this.fill = function (r, g, b, a = 255) {
      this.Fill = color(r, g, b, a);
    }
    this.stroke = function (r, g, b, a = 255) {
      this.Stroke = color(r, g, b, a);
    }
    this.noStroke = function () {
      this.Stroke.a = 0;
    }
    this.noFill = function () {
      this.Fill.a = 0;
    }
    this.strokeWeight = function (num) {
      this.StrokeWeight = num;
    }
    this.background = function (r, g, b, a = 255) {
      let tmpColor = color(r, g, b, a);
      const tmpRect = new Phaser.Geom.Rectangle(this.player.x - this.width / 2, this.player.y - this.height / 2, this.width, this.height);
      this.graphics.lineStyle(1, tmpColor.rgb, tmpColor.a / 255);
      this.graphics.fillStyle(tmpColor.rgb, tmpColor.a / 255);
      this.graphics.strokeRectShape(tmpRect);
      this.graphics.fillRectShape(tmpRect);
    }
    this.triangle = function (x1, y1, x2, y2, x3, y3) {
      const tmpTri = new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3);
      this.graphics.lineStyle(this.StrokeWeight, this.Stroke.rgb, this.Stroke.a / 255);
      this.graphics.fillStyle(this.Fill.rgb, this.Fill.a / 255);
      this.graphics.strokeTriangleShape(tmpTri);
      this.graphics.fillTriangleShape(tmpTri);
    }
    this.line = function (x1, y1, x2, y2) {
      const tmpLine = new Phaser.Geom.Line(x1, y1, x2, y2);
      this.graphics.lineStyle(this.StrokeWeight, this.Stroke.rgb, this.Stroke.a / 255);
      this.graphics.strokeLineShape(tmpLine);
    }
    this.rect = function (x, y, w, h) {
      const tmpRect = new Phaser.Geom.Rectangle(x, y, w, h);
      this.graphics.lineStyle(this.StrokeWeight, this.Stroke.rgb, this.Stroke.a / 255);
      this.graphics.fillStyle(this.Fill.rgb, this.Fill.a / 255);
      this.graphics.strokeRectShape(tmpRect);
      this.graphics.fillRectShape(tmpRect);
    }

    //logic and drawing of this.mirrors
    this.drawMirrors = function () {
      for (var i = 0; i < this.mirror.length; i++) {
        //moves this.mirror to conected blocks coordinates
        if (this.rects[this.mirror[i].c].type === "mirror") {
          this.mirror[i].x = this.rects[this.mirror[i].c].x + this.mirror[i].tx;
          this.mirror[i].y = this.rects[this.mirror[i].c].y + this.mirror[i].ty;
          this.mirror[i].a = this.rects[this.mirror[i].c].n1;
        }
        else {
          this.mirror[i].x = this.rects[this.mirror[i].c].x + this.mirror[i].tx;
          this.mirror[i].y = this.rects[this.mirror[i].c].y + this.mirror[i].ty;
          //this.mirror[i].a = this.rects[this.mirror[i].c].n1;
        }
        //draw this.mirror
        this.stroke(255, 255, 255);
        this.line(this.mirror[i].x - (cos(this.mirror[i].a) * this.mirror[i].l) - this.GlobalXOffset, this.mirror[i].y - (sin(this.mirror[i].a) * this.mirror[i].l) - this.GlobalYOffset, this.mirror[i].x + (cos(this.mirror[i].a) * this.mirror[i].l) - this.GlobalXOffset, this.mirror[i].y + (sin(this.mirror[i].a) * this.mirror[i].l) - this.GlobalYOffset);
      }
    };
    //logic and drawing of lasers
    this.lazers = function () {
      for (var i = 0; i < this.lazer.length; i++) {
        //move this.lazer to connected block
        if (this.lazer[i].c !== -1) {
          this.lazer[i].x = this.rects[this.lazer[i].c].x;
          this.lazer[i].y = this.rects[this.lazer[i].c].y;
          this.lazer[i].a = this.rects[this.lazer[i].c].n1;
        }
        var x = 0;
        var y = 0;
        var snum = 9999999;
        //find closest this.mirror
        for (var o = 0; o < this.mirror.length; o++) {
          if (o !== this.lazer[i].nb) {
            var xy = lineS(this.lazer[i].x, this.lazer[i].y, this.lazer[i].x + (cos(this.lazer[i].a) * 99999999), this.lazer[i].y + (sin(this.lazer[i].a) * 99999999), this.mirror[o].x - (cos(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].y - (sin(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].x + (cos(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].y + (sin(this.mirror[o].a) * this.mirror[o].l));
            if (xy.t && dist(xy.x, xy.y, this.lazer[i].x, this.lazer[i].y) < snum) {
              snum = dist(xy.x, xy.y, this.lazer[i].x, this.lazer[i].y);
            }
          }
        }
        var lazertf = false;
        //reflection logic
        for (var o = 0; o < this.mirror.length; o++) {
          this.mirror[o].b = false;
          var xy = lineS(this.lazer[i].x, this.lazer[i].y, this.lazer[i].x + (cos(this.lazer[i].a) * 99999999), this.lazer[i].y + (sin(this.lazer[i].a) * 99999999), this.mirror[o].x - (cos(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].y - (sin(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].x + (cos(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].y + (sin(this.mirror[o].a) * this.mirror[o].l));
          if (o !== this.lazer[i].nb) {
            if (dist(xy.x, xy.y, this.lazer[i].x, this.lazer[i].y) === snum) {
              this.fill(0, 0, 0);
              //ellipse(xy.x - this.GlobalXOffset,xy.y - this.GlobalYOffset,5,5);
              if (xy.t) {
                x = xy.x;
                y = xy.y;

                var xy2 = lineS(x - (cos(this.lazer[i].a) * 20), y - (sin(this.lazer[i].a) * 20), x - (cos(this.lazer[i].a) * 20) - (sin(this.mirror[o].a) * 20), y - (sin(this.lazer[i].a) * 20) + (cos(this.mirror[o].a) * 20), this.mirror[o].x - (cos(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].y - (sin(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].x + (cos(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].y + (sin(this.mirror[o].a) * this.mirror[o].l));

                if (xy.t) {
                  lazertf = true;
                  this.mirror[o].b = true;
                }

                //this.rect(x - (cos(this.lazer[i].a)*20) - this.GlobalXOffset,y - (sin(this.lazer[i].a)*20) - this.GlobalYOffset,5,5);
                //this.line(x - (cos(this.lazer[i].a)*20),y - (sin(this.lazer[i].a)*20),x - (cos(this.lazer[i].a)*20) - (sin(this.mirror[o].a)*20),y - (sin(this.lazer[i].a)*20) + (cos(this.mirror[o].a)*20));
                //ellipse(xy2.x,xy2.y,5,5);
                var x3 = x - (cos(this.mirror[o].a) * dist(x, y, xy2.x, xy2.y));
                var y3 = y - (sin(this.mirror[o].a) * dist(x, y, xy2.x, xy2.y));
                if (Math.round(x3) === Math.round(xy2.x) && Math.round(y3) === Math.round(xy2.y)) {
                  x3 = x - (cos(this.mirror[o].a) * -dist(x, y, xy2.x, xy2.y));
                  y3 = y - (sin(this.mirror[o].a) * -dist(x, y, xy2.x, xy2.y));
                }
                //ellipse(x3,y3,5,5);
                var x4 = x3 + (sin(this.mirror[o].a) * dist(x - (cos(this.lazer[i].a) * 20), y - (sin(this.lazer[i].a) * 20), xy2.x, xy2.y));
                var y4 = y3 - (cos(this.mirror[o].a) * dist(x - (cos(this.lazer[i].a) * 20), y - (sin(this.lazer[i].a) * 20), xy2.x, xy2.y));

                if (lineS(x - (cos(this.lazer[i].a) * 20), y - (sin(this.lazer[i].a) * 20), x4, y4, this.mirror[o].x - (cos(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].y - (sin(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].x + (cos(this.mirror[o].a) * this.mirror[o].l), this.mirror[o].y + (sin(this.mirror[o].a) * this.mirror[o].l)).t) {
                  x4 = x3 + (sin(this.mirror[o].a) * -dist(x - (cos(this.lazer[i].a) * 20), y - (sin(this.lazer[i].a) * 20), xy2.x, xy2.y));
                  y4 = y3 - (cos(this.mirror[o].a) * -dist(x - (cos(this.lazer[i].a) * 20), y - (sin(this.lazer[i].a) * 20), xy2.x, xy2.y));
                }
                //ellipse(x4,y4,5,5);
                //ellipse(x - (cos(this.mirror[o].a)*dist(x,y,xy2.x,xy2.y)) + (sin(this.mirror[o].a)*dist(x,y,xy2.x,xy2.y)),y - (sin(this.mirror[o].a)*dist(x,y,xy2.x,xy2.y)) - (cos(this.mirror[o].a)*dist(x,y,xy2.x,xy2.y)),5,5);
                ////important
                var a = angLine(x, y, x4, y4);
                this.stroke(255, 0, 255);
                //this.line(x,y,x + cos(a)*20,y + sin(a)*20);
                //this.line(x,y,x4,y4);
                if (this.mirror[o].r === true) {
                  if (this.lazer[i].t === false) {
                    this.lazer.push({ x: x, y: y, a: a, t: false, nb: o, gr: this.lazer[i].gr, c: -1 });
                    //ellipse(x - this.GlobalXOffset,y - this.GlobalYOffset,5,5);
                    this.lazer[i].t = true;
                  }
                } else {
                  this.rect(x - this.GlobalXOffset - 2.5, y - this.GlobalYOffset - 2.5, 5, 5);
                }
              }
            }
          }
        }
        //draw this.lazer
        this.stroke(255, 0, 0);
        if (lazertf) {
          this.line(this.lazer[i].x - this.GlobalXOffset, this.lazer[i].y - this.GlobalYOffset, this.lazer[i].x + (cos(this.lazer[i].a) * dist(this.lazer[i].x, this.lazer[i].y, x, y)) - this.GlobalXOffset, this.lazer[i].y + (sin(this.lazer[i].a) * dist(this.lazer[i].x, this.lazer[i].y, x, y)) - this.GlobalYOffset);
        }
        else {
          this.line(this.lazer[i].x - this.GlobalXOffset, this.lazer[i].y - this.GlobalYOffset, this.lazer[i].x + (cos(this.lazer[i].a) * 10000) - this.GlobalXOffset, this.lazer[i].y + (sin(this.lazer[i].a) * 10000) - this.GlobalYOffset);
        }
      }

    };

    this.blocks = function () {
      for (var i = 0; i < this.rects.length; i++) {
        if (this.rects[i].sprite) {
          this.rects[i].sprite.visible = true;
        }
        if (this.rects[i].sprite1) {
          this.rects[i].sprite1.visible = true;
        }
        if (this.rects[i].sprite2) {
          this.rects[i].sprite2.visible = true;
        }
        if (this.rects[i].level !== this.CurrentLevel) {
          if (this.rects[i].sprite) {
            this.rects[i].sprite.visible = false;
          }
          if (this.rects[i].sprite1) {
            this.rects[i].sprite1.visible = false;
          }
          if (this.rects[i].sprite1) {
            this.rects[i].sprite1.visible = false;
          }
        }
        //restrict width and hight of blocks
        if (this.rects[i].h <= 0) {
          this.rects[i].h = 2;
        }
        if (this.rects[i].w <= 0) {
          this.rects[i].w = 2;
        }
        this.noStroke();
        //logic and drawing of the player
        if (this.rects[i].type === "player") {
          //implement this.gravity
          this.rects[i].ay += this.gravity;
          this.rects[i].lx = this.rects[i].x;
          //move camera to block
          this.player.x = this.rects[i].x - this.GlobalXOffset;
          this.player.y = this.rects[i].y - 3 - this.GlobalYOffset;
          //if you fall, die
          if (this.rects[i].y > 700) {
            this.dead = true;
          }
          this.rects[i].timer--;


          //movement
          if (this.DKey.isDown) {
            this.rects[i].ax = 2;
            this.player.setFlip(true, false);
          }
          if (this.AKey.isDown) {
            this.rects[i].ax = -2;
            this.player.resetFlip();
          }
          let pj = this.rects[i].HitDown;
          if (this.WKey.isDown && this.rects[i].HitDown === true) {
            this.rects[i].ay = -3;
            this.jumpSound.play();
            this.jumping.startFollow(this.player, this.player.displayWidth / 2 - 10, this.player.displayHeight / 2 - 3, false);
            this.jumping.setParticleSpeed(0, -40);

            // Only play smoke effect if touching the ground
            if (this.rects[i].HitDown) {

              this.jumping.start();
              this.rects[i].timer = 2;

            }
          }
          this.rects[i].justDown = this.rects[i].HitDown;
          this.rects[i].HitDown = false;
          //collision logic
          for (var o = 0; o < this.gems.length; o++) {
            if (this.rects[i].x - this.rects[i].w / 2 < this.gems[o].x + this.gems[o].w / 2 && this.rects[i].x + this.rects[i].w / 2 > this.gems[o].x - this.gems[o].w / 2 && this.rects[i].y - this.rects[i].h / 2 < this.gems[o].y + this.gems[o].h / 2 && this.rects[i].y + this.rects[i].h / 2 > this.gems[o].y - this.gems[o].h / 2) {
              this.gems[o].sprite.destroy();
              this.gems.splice(o, 1);
              this.gemSound.play();
              this.score++;
              o--;
            }
          }
          for (var o = 0; o < this.rects.length; o++) {
            let p = (this.rects[o].type === "platform" && this.rects[o].p);
            if (p && i !== o && this.rects[i].ay > 0 && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2);
              this.rects[i].HitDown = true;
            }
            if (!p && i !== o && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2);
              this.rects[i].HitDown = true;
            }
            if (!p && i !== o && this.rects[i].y > this.rects[o].y && this.rects[i].y + this.rects[i].ay < this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2);
            }
            if (!p && i !== o && this.rects[i].x < this.rects[o].x && this.rects[i].x + this.rects[i].ax > this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = this.rects[i].ax * -0;
              this.rects[i].x = this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2);
            }
            if (!p && i !== o && this.rects[i].x > this.rects[o].x && this.rects[i].x + this.rects[i].ax < this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = this.rects[i].ax * -0;
              this.rects[i].x = this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2);
            }
          }
          //change x and y from acceleration
          this.rects[i].y += this.rects[i].ay;
          this.rects[i].x += this.rects[i].ax;
          //friction
          if (this.rects[i].HitDown) {
            this.rects[i].ax *= 0.0;
          }
          else {
            this.rects[i].ax *= 0.95;
          }
          if (pj != this.rects[i].HitDown && this.rects[i].HitDown) {
            this.jumping.startFollow(this.player, this.player.displayWidth / 2 - 10, this.player.displayHeight / 2 - 3, false);
            this.jumping.setParticleSpeed(0, -40);
            this.landSound.play();

            // Only play smoke effect if touching the ground

            if (this.rects[i].HitDown) {

              this.jumping.start();
              this.rects[i].timer = 2;

            }
          }


          if (this.rects[i].timer < 0) {
            this.walking.stop();
            this.jumping.stop();
          }
          if (Math.abs(this.rects[i].lx - this.rects[i].x) > 0.1) {
            if (this.DKey.isDown) {
              this.player.resetFlip();
              // this.player.setFlip(true, false);
              if(this.rects[i].HitDown){
                this.player.anims.play('walk', true);
              }

              this.walking.startFollow(this.player, this.player.displayWidth / 2 - 10, this.player.displayHeight / 2 - 3, true);
              this.walking.setParticleSpeed(-this.PARTICLE_VELOCITY, 0);

              // Only play smoke effect if touching the ground

              if (this.rects[i].HitDown) {
                if (!this.walkSound.isPlaying) {
                  this.walkSound.play();
                }
                this.walking.start();
              }
            }
            if (this.AKey.isDown) {
              this.player.setFlip(true, false);
              // this.player.resetFlip();
              if(this.rects[i].HitDown){
                this.player.anims.play('walk', true);
              }

              this.walking.startFollow(this.player, this.player.displayWidth / 2 - 10, this.player.displayHeight / 2 - 3, false);
              this.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

              // Only play smoke effect if touching the ground

              if (this.rects[i].HitDown) {
                if (!this.walkSound.isPlaying) {
                  this.walkSound.play();
                }
                this.walking.start();

              }
            }
            this.walkSound.setRate(0.3 + (Math.abs(this.rects[i].lx - this.rects[i].x) * 0.2));
          }
          else if(this.rects[i].HitDown) {
            this.player.anims.play('idle');
            this.walkSound.stop();
          }

          if (!this.rects[i].HitDown) {
            if(!(!this.player.anims.currentAnim || this.player.anims.currentAnim.key === 'jump')){
              this.player.anims.play('jump');
            }
            this.walkSound.stop();
          }
        }
      }
      for (var i = 0; i < this.rects.length; i++) {
        //logic and drawing of the buttons
        if (this.rects[i].type === "button") {
          var out = true;
          this.rects[i].HitDown = false;
          // //ditect a hit
          for (var o = 0; o < this.rects.length; o++) {
            if (i !== o && Math.abs((this.rects[i].y - ((this.rects[i].h) / 2)) - (this.rects[o].y + (this.rects[o].h / 2))) < 0.1 && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].HitDown = true;
            }
          }
          if (this.rects[i].HitDown === false) {
            out = false;
          }
          //check that all other buttons are pressed
          for (var o = 0; o < this.rects.length; o++) {
            if (i !== o && this.rects[i].type === "button" && this.rects[i].n1 === this.rects[o].n1 && this.rects[o].HitDown === false) {
              out = false;
            }
          }
          //move gates
          if (out === true) {
            if (this.rects[this.rects[i].n1].type === "gated") {
              this.rects[this.rects[i].n1].ay = -1;
            }
            if (this.rects[this.rects[i].n1].type === "gateu") {
              this.rects[this.rects[i].n1].ay = 1;
            }
            if (this.rects[this.rects[i].n1].type === "gater") {
              this.rects[this.rects[i].n1].ax = -1;
            }
            if (this.rects[this.rects[i].n1].type === "gatel") {
              this.rects[this.rects[i].n1].ax = 1;
            }
          }
          if (out === false) {
            if (this.rects[this.rects[i].n1].type === "gated") {
              this.rects[this.rects[i].n1].ay = 1;
            }
            if (this.rects[this.rects[i].n1].type === "gateu") {
              this.rects[this.rects[i].n1].ay = -1;
            }
            if (this.rects[this.rects[i].n1].type === "gater") {
              this.rects[this.rects[i].n1].ax = 1;
            }
            if (this.rects[this.rects[i].n1].type === "gatel") {
              this.rects[this.rects[i].n1].ax = -1;
            }
          }
          //draw and change shape when pressed
          if (this.rects[i].HitDown === true) {
            this.fill(200, 0, 0);
            this.rect(this.rects[i].x - this.rects[i].w / 2 - this.GlobalXOffset, this.rects[i].y - this.rects[i].h / 2 - this.GlobalYOffset, this.rects[i].w, this.rects[i].h);
          }
          else {
            this.fill(200, 0, 0);
            this.rect(this.rects[i].x - this.rects[i].w / 2 - this.GlobalXOffset, this.rects[i].y - (this.rects[i].h + 10) / 2 - this.GlobalYOffset, this.rects[i].w, (this.rects[i].h + 10)/2);
          }
        }
      }
      for (var i = 0; i < this.rects.length; i++) {
        this.noStroke();
        //logic and drawing of the spikes
        if (this.rects[i].type === "spike") {
          var out = true;
          this.rects[i].HitDown = false;
          //detect a hit
          for (var o = 0; o < this.rects.length; o++) {
            if (i !== o && this.rects[o].type === "player" && this.rects[i].y - (this.rects[i].h / 2) - 5 <= this.rects[o].y + (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) >= this.rects[o].y + (this.rects[o].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].HitDown = true;
            }
          }
          if (this.rects[i].HitDown === false) {
            out = false;
          }
          //check if other spikes are being pressed, usless test without
          for (var o = 0; o < this.rects.length; o++) {
            if (this.rects[i].type === "spike" && this.rects[i].n1 === this.rects[o].n1 && this.rects[o].HitDown === false) {
              out = false;
            }
          }
          //kill on hit
          if (this.rects[i].HitDown) {
            this.dead = true;
          }
          this.fill(71, 71, 71);
          //draw
          for (var s = 0; s < this.rects[i].w - this.rects[i].w / this.rects[i].n2; s += this.rects[i].w / this.rects[i].n2) {
            this.triangle(this.rects[i].x - this.rects[i].w / 2 - this.GlobalXOffset + s + (this.rects[i].w / this.rects[i].n2 / 2), this.rects[i].y - this.rects[i].h / 2 - this.GlobalYOffset - 5, this.rects[i].x - this.rects[i].w / 2 - this.GlobalXOffset + s, this.rects[i].y - this.rects[i].h / 2 - this.GlobalYOffset, this.rects[i].x - this.rects[i].w / 2 - this.GlobalXOffset + s + (this.rects[i].w / this.rects[i].n2), this.rects[i].y - this.rects[i].h / 2 - this.GlobalYOffset);
          }
          this.rect(this.rects[i].x - this.rects[i].w / 2 - this.GlobalXOffset, this.rects[i].y - this.rects[i].h / 2 - this.GlobalYOffset, this.rects[i].w, this.rects[i].h);
        }
      }
      for (var i = 0; i < this.rects.length; i++) {
        this.stroke(0, 0, 0);
        //logic and drawing of the pipes
        if (this.rects[i].type.substring(0, 4) === "pipe") {
          //get info from rect's type
          var link1 = this.rects[i].type.substring(4, 5);
          var link2 = this.rects[i].type.substring(5, 6);
          var link3 = (this.rects[i].type.substring(6, 7) === "b");
          var islinked = false;
          //sets is linked
          for (var o = 0; o < this.rects.length; o++) {
            if (o !== i) {
              if (this.rects[i].type.substring(0, 4) === "pipe" && this.rects[o].n1 === i) {
                islinked = true;
              }
            }
          }
          this.rects[i].n2 = 0;
          //sets values that determine which sides are linked
          for (var o = 0; o < this.rects.length; o++) {
            if (i !== o && this.dragIndex !== i && this.rects[o].type.substring(6, 7) === "b" && (this.rects[i].n1 === o || this.rects[i].n1 === -1)) {
              if ((this.rects[o].type.substring(4, 5) === "u" || this.rects[o].type.substring(5, 6) === "u") && (link1 === "d" || link2 === "d") && dist(this.rects[i].x, this.rects[i].y + (this.rects[i].h / 2), this.rects[o].x, this.rects[o].y - (this.rects[i].h / 2)) < 4) {
                if (link1 === "d") {
                  if (this.rects[i].n2 === 0) {
                    this.rects[i].n2 = 1;
                  }
                  if (this.rects[i].n2 === 2) {
                    this.rects[i].n2 = 3;
                  }
                }
                else if (link2 === "d") {
                  if (this.rects[i].n2 === 0) {
                    this.rects[i].n2 = 2;
                  }
                  if (this.rects[i].n2 === 1) {
                    this.rects[i].n2 = 3;
                  }
                }
              }
              if ((this.rects[o].type.substring(4, 5) === "d" || this.rects[o].type.substring(5, 6) === "d") && (link1 === "u" || link2 === "u") && dist(this.rects[i].x, this.rects[i].y - (this.rects[i].h / 2), this.rects[o].x, this.rects[o].y + (this.rects[i].h / 2)) < 4) {
                if (link1 === "u") {
                  if (this.rects[i].n2 === 0) {
                    this.rects[i].n2 = 1;
                  }
                  if (this.rects[i].n2 === 2) {
                    this.rects[i].n2 = 3;
                  }
                }
                else if (link2 === "u") {
                  if (this.rects[i].n2 === 0) {
                    this.rects[i].n2 = 2;
                  }
                  if (this.rects[i].n2 === 1) {
                    this.rects[i].n2 = 3;
                  }
                }
              }
              if ((this.rects[o].type.substring(4, 5) === "l" || this.rects[o].type.substring(5, 6) === "l") && (link1 === "r" || link2 === "r") && dist(this.rects[i].x + (this.rects[i].w / 2), this.rects[i].y, this.rects[o].x - (this.rects[o].w / 2), this.rects[o].y) < 4) {
                if (link1 === "r") {
                  if (this.rects[i].n2 === 0) {
                    this.rects[i].n2 = 1;
                  }
                  if (this.rects[i].n2 === 2) {
                    this.rects[i].n2 = 3;
                  }
                }
                else if (link2 === "r") {
                  if (this.rects[i].n2 === 0) {
                    this.rects[i].n2 = 2;
                  }
                  if (this.rects[i].n2 === 1) {
                    this.rects[i].n2 = 3;
                  }
                }
              }
              if ((this.rects[o].type.substring(4, 5) === "r" || this.rects[o].type.substring(5, 6) === "r") && (link1 === "l" || link2 === "l") && dist(this.rects[i].x - (this.rects[i].w / 2), this.rects[i].y, this.rects[o].x + (this.rects[o].w / 2), this.rects[o].y) < 4) {
                if (link1 === "l") {
                  if (this.rects[i].n2 === 0) {
                    this.rects[i].n2 = 1;
                  }
                  if (this.rects[i].n2 === 2) {
                    this.rects[i].n2 = 3;
                  }
                }
                else if (link2 === "l") {
                  if (this.rects[i].n2 === 0) {
                    this.rects[i].n2 = 2;
                  }
                  if (this.rects[i].n2 === 1) {
                    this.rects[i].n2 = 3;
                  }
                }
              }
            }
          }
          if (link1 === link2) {
            this.rects[i].n2 = 1;
          }
          //attaches pipes that should be
          for (var o = 0; o < this.rects.length; o++) {
            if (this.rects[o].type.substring(0, 4) !== "pipe" && this.rects[o].type !== "platform" && this.rects[o].type.substring(0, 4) !== "gate") {
              if (i !== o && ((link1 === "u" && this.rects[i].n2 === 2) || (link2 === "u" && this.rects[i].n2 === 1)) && this.rects[i].y - (this.rects[i].h / 2) - 10 <= this.rects[o].y + (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) >= this.rects[o].y + (this.rects[o].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
                this.rects[o].ay = -4;
                this.jumpSound.play();
              }
              if (i !== o && ((link1 === "d" && this.rects[i].n2 === 2) || (link2 === "d" && this.rects[i].n2 === 1)) && this.rects[i].y + (this.rects[i].h / 2) + 10 >= this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y + (this.rects[i].h / 2) <= this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
                this.rects[o].ay = 4;
                this.jumpSound.play();
              }
              if (i !== o && ((link1 === "l" && this.rects[i].n2 === 2) || (link2 === "l" && this.rects[i].n2 === 1)) && this.rects[i].x - (this.rects[i].w / 2) - 10 <= this.rects[o].x + (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) >= this.rects[o].x + (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
                this.rects[o].ax = -10;
                this.jumpSound.play();
              }
              if (i !== o && ((link1 === "r" && this.rects[i].n2 === 2) || (link2 === "r" && this.rects[i].n2 === 1)) && this.rects[i].x + (this.rects[i].w / 2) + 10 >= this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x + (this.rects[i].w / 2) <= this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
                this.rects[o].ax = 10;
                this.jumpSound.play();
              }
            }
          }
          //implement this.gravity
          if (link1 !== link2 && !this.rects[i].freeze) {
            this.rects[i].ay += this.gravity;

            //kill if it falls
            if (this.rects[i].y > 700) {
              this.dead = true;
            }
            //stop this.dragIndexng if key is pressed
            if (this.WKey.isDown || this.AKey.isDown || this.DKey.isDown) {
              this.dragIndex = -1;
            }
            //move when draged
            if (this.dragIndex === i) {
              if (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) !== 0 && dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed < this.maxDragSpeed) {
                this.rects[i].ax = -(this.rects[i].x - this.GlobalXOffset - this.mouseX) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed);
                this.rects[i].ay = -(this.rects[i].y - this.GlobalYOffset - this.mouseY) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed);
              }
              else if (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) !== 0) {
                this.rects[i].ax = -(this.rects[i].x - this.GlobalXOffset - this.mouseX) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (this.maxDragSpeed);
                this.rects[i].ay = -(this.rects[i].y - this.GlobalYOffset - this.mouseY) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (this.maxDragSpeed);
              }
            }
            //if clicked on set deagi to its position in this.rects
            if (this.mouseIsPressed && this.rects[i].HitDown && this.dragIndex === -1 && this.mouseX > this.rects[i].x - this.GlobalXOffset - (this.rects[i].w / 2) && this.mouseX < this.rects[i].x - this.GlobalXOffset + (this.rects[i].w / 2) && this.mouseY > this.rects[i].y - this.GlobalYOffset - (this.rects[i].h / 2) && this.mouseY < this.rects[i].y - this.GlobalYOffset + (this.rects[i].h / 2)) {
              this.dragIndex = i;
            }
            //if not pressing the mouse, stop this.dragIndexng
            if (this.mouseIsPressed === false) {
              this.dragIndex = -1;
            }
            this.rects[i].HitDown = false;
            //dont allow link when draged
            // if (this.dragIndex === i) {
            //   this.rects[i].type = this.rects[i].type.substring(0, 6) + "u";
            //   this.rects[i].n1 = -1;
            // }
            // //dont link if the other pipe is not linked to a base pipe in any way
            // if (this.rects[i].n1 !== -1 && this.rects[this.rects[i].n1].type.substring(6, 7) !== "b") {
            //   this.rects[i].type = this.rects[i].type.substring(0, 6) + "u";
            // }
            if (this.dragIndex === i) {
              this.rects[i].type = this.rects[i].type.substring(0, 6) + "u";
              this.rects[i].n1 = -1;
            }
            //dont link if the other pipe is not linked to a base pipe in any way
            if (this.rects[i].n1 !== -1 && this.rects[this.rects[i].n1].type.substring(6, 7) !== "b") {
              this.rects[i].type = this.rects[i].type.substring(0, 6) + "u";
            }
            //move when linked
            // for (var o = 0; o < this.rects.length; o++) {
            //   if (i !== o && this.dragIndex !== i && this.rects[o].type.substring(6, 7) === "b" && (this.rects[i].n1 === o || this.rects[i].n1 === -1)) {
            //     if ((this.rects[o].type.substring(4, 5) === "u" || this.rects[o].type.substring(5, 6) === "u") && (link1 === "d" || link2 === "d") && dist(this.rects[i].x, this.rects[i].y + (this.rects[i].h / 2), this.rects[o].x, this.rects[o].y - (this.rects[i].h / 2)) < 4) {

            //       this.rects[i].n1 = o;
            //       this.rects[i].ay = (this.rects[o].y - this.rects[i].y) / 10;
            //       this.rects[i].ax = (this.rects[o].x - this.rects[i].x) / 10;
            //       this.rects[i].HitDown = true;
            //       this.rects[o].HitDown = true;
            //       this.rects[i].type = this.rects[i].type.substring(0, 6) + "b";
            //     }
            //     if ((this.rects[o].type.substring(4, 5) === "d" || this.rects[o].type.substring(5, 6) === "d") && (link1 === "u" || link2 === "u") && dist(this.rects[i].x, this.rects[i].y - (this.rects[i].h / 2), this.rects[o].x, this.rects[o].y + (this.rects[i].h / 2)) < 4) {

            //       this.rects[i].n1 = o;
            //       this.rects[i].ay = (this.rects[o].y - this.rects[i].y) / 10;
            //       this.rects[i].ax = (this.rects[o].x - this.rects[i].x) / 10;
            //       this.rects[i].HitDown = true;
            //       this.rects[o].HitDown = true;
            //       this.rects[i].type = this.rects[i].type.substring(0, 6) + "b";
            //     }
            //     if ((this.rects[o].type.substring(4, 5) === "l" || this.rects[o].type.substring(5, 6) === "l") && (link1 === "r" || link2 === "r") && dist(this.rects[i].x + (this.rects[i].w / 2), this.rects[i].y, this.rects[o].x - (this.rects[o].w / 2), this.rects[o].y) < 4) {


            //       this.rects[i].n1 = o;
            //       this.rects[i].ay = (this.rects[o].y - this.rects[i].y) / 10;
            //       this.rects[i].ax = (this.rects[o].x - this.rects[i].x) / 10;
            //       this.rects[i].HitDown = true;
            //       this.rects[o].HitDown = true;
            //       this.rects[i].type = this.rects[i].type.substring(0, 6) + "b";
            //     }
            //     if ((this.rects[o].type.substring(4, 5) === "r" || this.rects[o].type.substring(5, 6) === "r") && (link1 === "l" || link2 === "l") && dist(this.rects[i].x - (this.rects[i].w / 2), this.rects[i].y, this.rects[o].x + (this.rects[o].w / 2), this.rects[o].y) < 4) {

            //       console.log("text");
            //       this.rects[i].n1 = o;
            //       this.rects[i].ay = (this.rects[o].y - this.rects[i].y) / 10;
            //       this.rects[i].ax = (this.rects[o].x - this.rects[i].x) / 10;
            //       this.rects[i].HitDown = true;
            //       this.rects[o].HitDown = true;
            //       this.rects[i].type = this.rects[i].type.substring(0, 6) + "b";
            //     }
            //   }
            // }
            for (var o = 0; o < this.rects.length; o++) {
              if (i !== o && this.dragIndex !== i && this.rects[o].type.substring(6, 7) === "b" && (this.rects[i].n1 === o || this.rects[i].n1 === -1)) {
                if ((this.rects[o].type.substring(4, 5) === "u" || this.rects[o].type.substring(5, 6) === "u") && (link1 === "d" || link2 === "d") && dist(this.rects[i].x, this.rects[i].y + (this.rects[i].h / 2), this.rects[o].x, this.rects[o].y - (this.rects[i].h / 2)) < 10) {

                  this.rects[i].n1 = o;
                  this.rects[i].ay = (this.rects[o].y - this.rects[i].y) / 10;
                  this.rects[i].ax = (this.rects[o].x - this.rects[i].x) / 10;
                  this.rects[i].HitDown = true;
                  this.rects[o].HitDown = true;
                  this.rects[i].type = this.rects[i].type.substring(0, 6) + "b";
                }
                if ((this.rects[o].type.substring(4, 5) === "d" || this.rects[o].type.substring(5, 6) === "d") && (link1 === "u" || link2 === "u") && dist(this.rects[i].x, this.rects[i].y - (this.rects[i].h / 2), this.rects[o].x, this.rects[o].y + (this.rects[i].h / 2)) < 10) {

                  this.rects[i].n1 = o;
                  this.rects[i].ay = (this.rects[o].y - this.rects[i].y) / 10;
                  this.rects[i].ax = (this.rects[o].x - this.rects[i].x) / 10;
                  this.rects[i].HitDown = true;
                  this.rects[o].HitDown = true;
                  this.rects[i].type = this.rects[i].type.substring(0, 6) + "b";
                }
                if ((this.rects[o].type.substring(4, 5) === "l" || this.rects[o].type.substring(5, 6) === "l") && (link1 === "r" || link2 === "r") && dist(this.rects[i].x + (this.rects[i].w / 2), this.rects[i].y, this.rects[o].x - (this.rects[i].w / 2), this.rects[o].y) < 10) {


                  this.rects[i].n1 = o;
                  this.rects[i].ay = (this.rects[o].y - this.rects[i].y) / 10;
                  this.rects[i].ax = (this.rects[o].x - this.rects[i].x) / 10;
                  this.rects[i].HitDown = true;
                  this.rects[o].HitDown = true;
                  this.rects[i].type = this.rects[i].type.substring(0, 6) + "b";
                }
                if ((this.rects[o].type.substring(4, 5) === "r" || this.rects[o].type.substring(5, 6) === "r") && (link1 === "l" || link2 === "l") && dist(this.rects[i].x - (this.rects[i].w / 2), this.rects[i].y, this.rects[o].x + (this.rects[i].w / 2), this.rects[o].y) < 10) {

                  console.log("text");
                  this.rects[i].n1 = o;
                  this.rects[i].ay = (this.rects[o].y - this.rects[i].y) / 10;
                  this.rects[i].ax = (this.rects[o].x - this.rects[i].x) / 10;
                  this.rects[i].HitDown = true;
                  this.rects[o].HitDown = true;
                  this.rects[i].type = this.rects[i].type.substring(0, 6) + "b";
                }
              }
            }
            // for (var o = 0; o < this.rects.length; o++) {

            //   if (i !== o && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
            //     this.rects[i].ay = this.rects[i].ay * -0;
            //     this.rects[i].y = this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2);
            //     this.rects[i].HitDown = true;
            //   }
            //   if (i !== o && this.rects[i].y > this.rects[o].y && this.rects[i].y + this.rects[i].ay < this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
            //     this.rects[i].ay = this.rects[i].ay * -0.0;
            //     this.rects[i].y = this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2);
            //     if (this.rects[o].type === "player") {
            //       this.dragIndex = -1;
            //     }
            //   }
            //   if (i !== o && this.rects[i].x < this.rects[o].x && this.rects[i].x + this.rects[i].ax > this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
            //     this.rects[i].ax = this.rects[i].ax * -0;
            //     this.rects[i].x = this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2);
            //   }

            //   if (i !== o && this.rects[i].x > this.rects[o].x && this.rects[i].x + this.rects[i].ax < this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
            //     this.rects[i].ax = this.rects[i].ax * -0;
            //     this.rects[i].x = this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2);
            //   }
            //   if (this.rects[o].type.substring(0, 4) !== "pipe") {
            //     if (i !== o && this.rects[i].x - (this.rects[i].w / 2) === this.rects[o].x + (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
            //       this.rects[i].ax = 1;
            //     }
            //     if (i !== o && this.rects[i].x + (this.rects[i].w / 2) === this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
            //       this.rects[i].ax = -1;
            //     }
            //   }
            // }
            //collision logic
            for (var o = 0; o < this.rects.length; o++) {

              if (i !== o && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
                this.rects[i].ay = this.rects[i].ay * -0;
                this.rects[i].HitDown = true;
              }
              if (i !== o && this.rects[i].y > this.rects[o].y && this.rects[i].y + this.rects[i].ay < this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
                this.rects[i].ay = this.rects[i].ay * -0.0;
                if (this.rects[o].type === "player") {
                  this.dragIndex = -1;
                }
              }
              if (i !== o && this.rects[i].x < this.rects[o].x && this.rects[i].x + this.rects[i].ax > this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
                this.rects[i].ax = this.rects[i].ax * -0;
              }

              if (i !== o && this.rects[i].x > this.rects[o].x && this.rects[i].x + this.rects[i].ax < this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
                this.rects[i].ax = this.rects[i].ax * -0;
              }
              if (this.rects[o].type.substring(0, 4) !== "pipe") {
                if (i !== o && this.rects[i].x - (this.rects[i].w / 2) === this.rects[o].x + (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
                  this.rects[i].ax = 1;
                }
                if (i !== o && this.rects[i].x + (this.rects[i].w / 2) === this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
                  this.rects[i].ax = -1;
                }
              }
            }
            for (var o = 0; o < this.rects.length; o++) {

              if (i !== o && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
                this.rects[i].ay = this.rects[i].ay * -0;
                this.rects[i].y = this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2);
                this.rects[i].HitDown = true;
              }
              if (i !== o && this.rects[i].y > this.rects[o].y && this.rects[i].y + this.rects[i].ay < this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
                this.rects[i].ay = this.rects[i].ay * -0.0;
                this.rects[i].y = this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2);
                if (this.rects[o].type === "player") {
                  this.dragIndex = -1;
                }
              }
              if (i !== o && this.rects[i].x < this.rects[o].x && this.rects[i].x + this.rects[i].ax > this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
                this.rects[i].ax = this.rects[i].ax * -0;
                this.rects[i].x = this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2);
              }

              if (i !== o && this.rects[i].x > this.rects[o].x && this.rects[i].x + this.rects[i].ax < this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
                this.rects[i].ax = this.rects[i].ax * -0;
                this.rects[i].x = this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2);
              }
              if (this.rects[o].type.substring(0, 4) !== "pipe") {
                if (i !== o && this.rects[i].x - (this.rects[i].w / 2) === this.rects[o].x + (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
                  this.rects[i].ax = 1;
                }
                if (i !== o && this.rects[i].x + (this.rects[i].w / 2) === this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
                  this.rects[i].ax = -1;
                }
              }
            }
            //move with acceleration
            this.rects[i].y += this.rects[i].ay;
            this.rects[i].x += this.rects[i].ax;
            //friction
            if (this.rects[i].HitDown) {
              this.rects[i].ax = 0;
            }
          }
          //draw
          if (link1 === link2) {
            this.stroke(64, 64, 64);
            this.fill(255, 255, 255);
          }
          else {
            this.stroke(64, 64, 64);
            this.fill(255, 255, 255);
          }
          if (this.rects[i].sprite1) {
            this.rects[i].sprite1.x = this.rects[i].x - this.GlobalXOffset;
            this.rects[i].sprite1.y = this.rects[i].y - this.GlobalYOffset;
          }
          if (this.rects[i].sprite2) {
            this.rects[i].sprite2.x = this.rects[i].x - this.GlobalXOffset + this.rects[i].spriteShiftx;
            this.rects[i].sprite2.y = this.rects[i].y - this.GlobalYOffset + this.rects[i].spriteShifty;
          }
          this.fill(49, 66, 247);
          if (islinked === false) {
            if (this.rects[i].n2 === 2) {
              if (link1 === "u") {
                this.rect(this.rects[i].x - this.rects[i].w / 4 - this.GlobalXOffset, this.rects[i].y - this.rects[i].h / 2 - this.GlobalYOffset, this.rects[i].w / 2, -10);
              }
              if (link1 === "d") {
                this.rect(this.rects[i].x - this.rects[i].w / 4 - this.GlobalXOffset, this.rects[i].y + this.rects[i].h / 2 - this.GlobalYOffset, this.rects[i].w / 2, 10);
              }
              if (link1 === "l") {
                this.rect(this.rects[i].x - this.rects[i].w / 2 - this.GlobalXOffset, this.rects[i].y - this.rects[i].h / 4 - this.GlobalYOffset, -10, this.rects[i].h / 2);
              }
              if (link1 === "r") {
                this.rect(this.rects[i].x + this.rects[i].w / 2 - this.GlobalXOffset, this.rects[i].y - this.rects[i].h / 4 - this.GlobalYOffset, 10, this.rects[i].h / 2);
              }
            }
            if (this.rects[i].n2 === 1) {
              if (link2 === "u") {
                this.rect(this.rects[i].x - this.rects[i].w / 4 - this.GlobalXOffset, this.rects[i].y - this.rects[i].h / 2 - this.GlobalYOffset, this.rects[i].w / 2, -10);
              }
              if (link2 === "d") {
                this.rect(this.rects[i].x - this.rects[i].w / 4 - this.GlobalXOffset, this.rects[i].y + this.rects[i].h / 2 - this.GlobalYOffset, this.rects[i].w / 2, 10);
              }
              if (link2 === "l") {
                this.rect(this.rects[i].x - this.rects[i].w / 2 - this.GlobalXOffset, this.rects[i].y - this.rects[i].h / 4 - this.GlobalYOffset, -10, this.rects[i].h / 2);
              }
              if (link2 === "r") {
                this.rect(this.rects[i].x + this.rects[i].w / 2 - this.GlobalXOffset, this.rects[i].y - this.rects[i].h / 4 - this.GlobalYOffset, 10, this.rects[i].h / 2);
              }
            }
            if (link1 === "u") {
              this.line(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - (this.rects[i].h / 2) - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
            }
            if (link1 === "d") {
              this.line(this.rects[i].x - this.GlobalXOffset, this.rects[i].y + (this.rects[i].h / 2) - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
            }
            if (link1 === "l") {
              this.line(this.rects[i].x - (this.rects[i].w / 2) - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
            }
            if (link1 === "r") {
              this.line(this.rects[i].x + (this.rects[i].w / 2) - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
            }
            if (link2 === "u") {
              this.line(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - (this.rects[i].h / 2) - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
            }
            if (link2 === "d") {
              this.line(this.rects[i].x - this.GlobalXOffset, this.rects[i].y + (this.rects[i].h / 2) - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
            }
            if (link2 === "l") {
              this.line(this.rects[i].x - (this.rects[i].w / 2) - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
            }
            if (link2 === "r") {
              this.line(this.rects[i].x + (this.rects[i].w / 2) - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
            }
          }
        }
      }
      for (var i = 0; i < this.rects.length; i++) {
        this.stroke(0, 0, 0);
        //logic and drawing of the boxes
        if (this.rects[i].type === "box") {
          //this.gravity acceleration
          this.rects[i].ay += this.gravity;
          //if fall, then die
          if (this.rects[i].y > 700) {
            this.dead = true;
          }
          //dont drag when a key is pressed
          if (this.WKey.isDown || this.AKey.isDown || this.DKey.isDown) {
            this.dragIndex = -1;
          }
          //move when draged
          if (this.dragIndex === i) {
            if (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) !== 0 && dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed < this.maxDragSpeed) {
              this.rects[i].ax = -(this.rects[i].x - this.GlobalXOffset - this.mouseX) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed);
              this.rects[i].ay = -(this.rects[i].y - this.GlobalYOffset - this.mouseY) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed);
            }
            else if (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) !== 0) {
              this.rects[i].ax = -(this.rects[i].x - this.GlobalXOffset - this.mouseX) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (this.maxDragSpeed);
              this.rects[i].ay = -(this.rects[i].y - this.GlobalYOffset - this.mouseY) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (this.maxDragSpeed);
            }
          }
          //set drag i to it's position in this.rects when draged
          if (this.mouseIsPressed && this.rects[i].HitDown && this.dragIndex === -1 && this.mouseX > this.rects[i].x - this.GlobalXOffset - (this.rects[i].w / 2) && this.mouseX < this.rects[i].x - this.GlobalXOffset + (this.rects[i].w / 2) && this.mouseY > this.rects[i].y - this.GlobalYOffset - (this.rects[i].h / 2) && this.mouseY < this.rects[i].y - this.GlobalYOffset + (this.rects[i].h / 2)) {
            this.dragIndex = i;
          }
          //if mouse is not pressed, dont drag
          if (this.mouseIsPressed === false) {
            this.dragIndex = -1;
          }
          this.rects[i].HitDown = false;
          //collision logic
          for (var o = 0; o < this.rects.length; o++) {
            if (i !== o && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) - 1 && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2);
              this.rects[i].HitDown = true;
            }
            if (i !== o && this.rects[i].y > this.rects[o].y && this.rects[i].y + this.rects[i].ay < this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0.0;
              this.rects[i].y = this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2);
              if (this.rects[o].type === "player") {
                this.dragIndex = -1;
              }
            }
            if (i !== o && this.rects[i].x < this.rects[o].x && this.rects[i].x + this.rects[i].ax > this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = 0;
              this.rects[i].x = this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2);
            }
            if (i !== o && this.rects[i].x > this.rects[o].x && this.rects[i].x + this.rects[i].ax < this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = 0;
              this.rects[i].x = this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2);
            }

            if (i !== o && this.rects[i].x - (this.rects[i].w / 2) === this.rects[o].x + (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
              this.rects[i].ax = 1;
            }
            if (i !== o && this.rects[i].x + (this.rects[i].w / 2) === this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
              this.rects[i].ax = -1;
            }
          }
          //use acceleration
          this.rects[i].y += this.rects[i].ay;
          this.rects[i].x += this.rects[i].ax;
          //friction
          if (this.rects[i].HitDown) {
            this.rects[i].ax = 0;
          }
          //draw
          this.noStroke();
          this.fill(0, 0, 255);
          if (this.rects[i].sprite1) {
            this.rects[i].sprite1.x = this.rects[i].x - this.GlobalXOffset;
            this.rects[i].sprite1.y = this.rects[i].y - this.GlobalYOffset;
          }
        }
      }
      for (var i = 0; i < this.rects.length; i++) {
        this.stroke(0, 0, 0);
        //logic and drawing of the laser boxes
        if (this.rects[i].type === "lazer") {
          //create it's laser
          if (this.rects[i].n2 === 0) {
            this.lazer.push({ x: 211, y: 278, a: 180, t: false, nb: -1, gr: this.lazer.length, c: i });
            this.rects[i].n2 = 1;
          }
          //implement this.gravity
          this.rects[i].ay += this.gravity;
          //if fall, die
          if (this.rects[i].y > 700) {
            this.dead = true;
          }
          //dont drag if a key is pressed
          if (this.WKey.isDown || this.AKey.isDown || this.DKey.isDown) {
            this.dragIndex = -1;
          }
          //move when linked
          if (this.dragIndex === i) {
            if (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) !== 0 && dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed < this.maxDragSpeed) {
              this.rects[i].ax = -(this.rects[i].x - this.GlobalXOffset - this.mouseX) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed);
              this.rects[i].ay = -(this.rects[i].y - this.GlobalYOffset - this.mouseY) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed);
            }
            else if (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) !== 0) {
              this.rects[i].ax = -(this.rects[i].x - this.GlobalXOffset - this.mouseX) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (this.maxDragSpeed);
              this.rects[i].ay = -(this.rects[i].y - this.GlobalYOffset - this.mouseY) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (this.maxDragSpeed);
            }
          }
          //if draged, set this.dragIndex to it's position in this.rects
          if (this.mouseIsPressed && this.rects[i].HitDown && this.dragIndex === -1 && this.mouseX > this.rects[i].x - this.GlobalXOffset - (this.rects[i].w / 2) && this.mouseX < this.rects[i].x - this.GlobalXOffset + (this.rects[i].w / 2) && this.mouseY > this.rects[i].y - this.GlobalYOffset - (this.rects[i].h / 2) && this.mouseY < this.rects[i].y - this.GlobalYOffset + (this.rects[i].h / 2)) {
            this.dragIndex = i;
          }
          //if not this.dragIndexng, dont drag
          if (this.mouseIsPressed === false) {
            this.dragIndex = -1;
          }
          this.rects[i].HitDown = false;
          //collision logic
          for (var o = 0; o < this.rects.length; o++) {
            if (i !== o && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) - 1 && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2);
              this.rects[i].HitDown = true;
            }
            if (i !== o && this.rects[i].y > this.rects[o].y && this.rects[i].y + this.rects[i].ay < this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0.0;
              this.rects[i].y = this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2);
              if (this.rects[o].type === "player") {
                this.dragIndex = -1;
              }
            }
            if (i !== o && this.rects[i].x < this.rects[o].x && this.rects[i].x + this.rects[i].ax > this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = 0;
              this.rects[i].x = this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2);
            }
            if (i !== o && this.rects[i].x > this.rects[o].x && this.rects[i].x + this.rects[i].ax < this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = 0;
              this.rects[i].x = this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2);
            }

            if (i !== o && this.rects[i].x - (this.rects[i].w / 2) === this.rects[o].x + (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
              this.rects[i].ax = 1;
            }
            if (i !== o && this.rects[i].x + (this.rects[i].w / 2) === this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
              this.rects[i].ax = -1;
            }
          }
          //move with acceleration
          this.rects[i].y += this.rects[i].ay;
          this.rects[i].x += this.rects[i].ax;
          //friction
          if (this.rects[i].HitDown) {
            this.rects[i].ax = 0;
          }
          //draw
          this.noStroke();
          this.fill(87, 87, 87);

          this.rect(this.rects[i].x - this.rects[i].w / 2 - this.GlobalXOffset, this.rects[i].y - this.rects[i].h / 2 - this.GlobalYOffset, this.rects[i].w, this.rects[i].h);

        }
      }
      for (var i = 0; i < this.rects.length; i++) {
        this.stroke(0, 0, 0);
        //logic and drawing of the this.mirror boxes
        if (this.rects[i].type === "mirror") {
          //create it's this.mirror
          if (this.rects[i].mi === false) {
            this.mirror.push({ x: 304, y: 266, l: Math.sqrt(200), a: 45, c: i, r: true, tx: 0, ty: 0, b: false });
            this.rects[i].mi = true;
          }
          //implement this.gravity
          this.rects[i].ay += this.gravity;
          //if fall die
          if (this.rects[i].y > 700) {
            this.dead = true;
          }
          //if a key is pressed, dont drag
          if (this.WKey.isDown || this.AKey.isDown || this.DKey.isDown) {
            this.dragIndex = -1;
          }
          //move when draged
          if (this.dragIndex === i) {
            if (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) !== 0 && dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed < this.maxDragSpeed) {
              this.rects[i].ax = -(this.rects[i].x - this.GlobalXOffset - this.mouseX) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed);
              this.rects[i].ay = -(this.rects[i].y - this.GlobalYOffset - this.mouseY) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) / this.dragInterpSpeed);
            }
            else if (dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) !== 0) {
              this.rects[i].ax = -(this.rects[i].x - this.GlobalXOffset - this.mouseX) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (this.maxDragSpeed);
              this.rects[i].ay = -(this.rects[i].y - this.GlobalYOffset - this.mouseY) / dist(this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset, this.mouseX, this.mouseY) * (this.maxDragSpeed);
            }
          }
          //if draged, set this.dragIndex to it's position in this.rects
          if (this.mouseIsPressed && this.rects[i].HitDown && this.dragIndex === -1 && this.mouseX > this.rects[i].x - this.GlobalXOffset - (this.rects[i].w / 2) && this.mouseX < this.rects[i].x - this.GlobalXOffset + (this.rects[i].w / 2) && this.mouseY > this.rects[i].y - this.GlobalYOffset - (this.rects[i].h / 2) && this.mouseY < this.rects[i].y - this.GlobalYOffset + (this.rects[i].h / 2)) {
            this.dragIndex = i;
          }
          //if not this.dragIndexng dont drag
          if (this.mouseIsPressed === false) {
            this.dragIndex = -1;
          }
          //collision logic
          this.rects[i].HitDown = false;
          for (var o = 0; o < this.rects.length; o++) {
            if (i !== o && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) - 1 && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2);
              this.rects[i].HitDown = true;
            }
            if (i !== o && this.rects[i].y > this.rects[o].y && this.rects[i].y + this.rects[i].ay < this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0.0;
              this.rects[i].y = this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2);
              if (this.rects[o].type === "player") {
                this.dragIndex = -1;
              }
            }
            if (i !== o && this.rects[i].x < this.rects[o].x && this.rects[i].x + this.rects[i].ax > this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = 0;
              this.rects[i].x = this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2);
            }
            if (i !== o && this.rects[i].x > this.rects[o].x && this.rects[i].x + this.rects[i].ax < this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = 0;
              this.rects[i].x = this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2);
            }

            if (i !== o && this.rects[i].x - (this.rects[i].w / 2) === this.rects[o].x + (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
              this.rects[i].ax = 1;
            }
            if (i !== o && this.rects[i].x + (this.rects[i].w / 2) === this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2) && (this.rects[o].type === "player" || this.rects[o].type === "box" || this.rects[o].type.substring(0, 4) === "pipe")) {
              this.rects[i].ax = -1;
            }
          }
          //move with acceleration
          this.rects[i].y += this.rects[i].ay;
          this.rects[i].x += this.rects[i].ax;
          //friction
          if (this.rects[i].HitDown) {
            this.rects[i].ax = 0;
          }
          //draw
          this.noStroke();
          this.fill(0, 0, 255);

          this.rect(this.rects[i].x - this.rects[i].w / 2 - this.GlobalXOffset, this.rects[i].y - this.rects[i].h / 2 - this.GlobalYOffset, this.rects[i].w, this.rects[i].h);

        }
      }
      for (var i = 0; i < this.rects.length; i++) {
        this.stroke(0, 0, 0);
        //logic and drawing of the laser sensing boxes
        if (this.rects[i].type === "sense") {
          //create its this.mirror
          if (this.rects[i].mi === false) {
            this.mirror.push({ x: 304, y: 266, l: Math.sqrt(200), a: 45, c: i, r: true, tx: 0, ty: 0, b: false });
            this.rects[i].mi = true;
          }

          var out = false;
          var num = 0;
          //test for laser
          for (var o = 0; o < this.lazer.length; o++) {
            if (this.lazer[o].x > this.rects[i].x - (this.rects[i].w / 2) && this.lazer[o].x < this.rects[i].x + (this.rects[i].w / 2) && this.lazer[o].y > this.rects[i].y - (this.rects[i].h / 2) && this.lazer[o].y < this.rects[i].y + (this.rects[i].h / 2)) {
              out = true;
            }
          }
          this.fill(0, 0, 0);
          //move gates
          if (out === true) {
            if (this.rects[this.rects[i].n1].type === "gated") {
              this.rects[this.rects[i].n1].ay = -1;
            }
            if (this.rects[this.rects[i].n1].type === "gateu") {
              this.rects[this.rects[i].n1].ay = 1;
            }
            if (this.rects[this.rects[i].n1].type === "gater") {
              this.rects[this.rects[i].n1].ax = -1;
            }
            if (this.rects[this.rects[i].n1].type === "gatel") {
              this.rects[this.rects[i].n1].ax = 1;
            }
          }
          if (out === false) {
            if (this.rects[this.rects[i].n1].type === "gated") {
              this.rects[this.rects[i].n1].ay = 1;
            }
            if (this.rects[this.rects[i].n1].type === "gateu") {
              this.rects[this.rects[i].n1].ay = -1;
            }
            if (this.rects[this.rects[i].n1].type === "gater") {
              this.rects[this.rects[i].n1].ax = 1;
            }
            if (this.rects[this.rects[i].n1].type === "gatel") {
              this.rects[this.rects[i].n1].ax = -1;
            }
          }
          //draw
          this.noStroke();
          this.fill(0, 60, 82);
          this.rect(this.rects[i].x - this.rects[i].w / 2 - this.GlobalXOffset, this.rects[i].y - this.rects[i].h / 2 - this.GlobalYOffset, this.rects[i].w, this.rects[i].h);

        }
      }
      this.noStroke();
      for (var i = 0; i < this.rects.length; i++) {
        if (this.mouseIsPressed && this.mouseX > this.rects[i].x - this.GlobalXOffset - (this.rects[i].w / 2) && this.mouseX < this.rects[i].x - this.GlobalXOffset + (this.rects[i].w / 2) && this.mouseY > this.rects[i].y - this.GlobalYOffset - (this.rects[i].h / 2) && this.mouseY < this.rects[i].y - this.GlobalYOffset + (this.rects[i].h / 2)) {
          console.log(i);
          console.log(this.rects[i]);
        }
        this.noStroke();
        //logic and drawing of the platforms
        if (this.rects[i].type === "platform") {

          if (this.rects[i].sprite) {
            this.rects[i].sprite.x = this.rects[i].x - this.GlobalXOffset;
            this.rects[i].sprite.y = this.rects[i].y - this.GlobalYOffset;
          }

        }
      }
      for (var i = 0; i < this.rects.length; i++) {
        this.noStroke();
        //logic and drawing of the gates, all have vary simular logic, look at gated for comments
        if (this.rects[i].type === "gated") {
          //collision logic
          for (var o = 0; o < this.rects.length; o++) {
            if (i !== o && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2);
            }
            if (i !== o && this.rects[i].y > this.rects[o].y && this.rects[i].y + this.rects[i].ay < this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2);
            }

            if (i !== o && this.rects[i].x < this.rects[o].x && this.rects[i].x + this.rects[i].ax > this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = this.rects[i].ax * -0;
              this.rects[i].x = this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2);
            }
            if (i !== o && this.rects[i].x > this.rects[o].x && this.rects[i].x + this.rects[i].ax < this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = this.rects[i].ax * -0;
              this.rects[i].x = this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2);
            }

          }
          //no x acceleration
          this.rects[i].ax *= 0;
          //move with acceleration
          this.rects[i].y += this.rects[i].ay;
          this.rects[i].x += this.rects[i].ax;
          if (this.rects[i].sprite) {
            this.rects[i].sprite.x = this.rects[i].x - this.GlobalXOffset;
            this.rects[i].sprite.y = this.rects[i].y - this.GlobalYOffset;
          }
          //if hovered over, draw a line to conections
          if (this.mouseX > this.rects[i].x - this.GlobalXOffset - (this.rects[i].w / 2) && this.mouseX < this.rects[i].x - this.GlobalXOffset + (this.rects[i].w / 2) && this.mouseY > this.rects[i].y - this.GlobalYOffset - (this.rects[i].h / 2) && this.mouseY < this.rects[i].y - this.GlobalYOffset + (this.rects[i].h / 2)) {
            for (var o = 0; o < this.rects.length; o++) {
              if ((this.rects[o].type === "button" || this.rects[o].type === "sense") && this.rects[o].n1 === i) {
                this.stroke(255, 0, 0);
                this.line(this.rects[o].x - this.GlobalXOffset, this.rects[o].y - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
              }
            }
          }
        }
        if (this.rects[i].type === "gateu") {
          for (var o = 0; o < this.rects.length; o++) {
            if (i !== o && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2);
            }
            if (i !== o && this.rects[i].y > this.rects[o].y && this.rects[i].y + this.rects[i].ay < this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2);
            }

            if (i !== o && this.rects[i].x < this.rects[o].x && this.rects[i].x + this.rects[i].ax > this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = this.rects[i].ax * -0;
              this.rects[i].x = this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2);
            }
            if (i !== o && this.rects[i].x > this.rects[o].x && this.rects[i].x + this.rects[i].ax < this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = this.rects[i].ax * -0;
              this.rects[i].x = this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2);
            }

          }
          this.rects[i].ax *= 0;
          this.rects[i].y += this.rects[i].ay;
          this.rects[i].x += this.rects[i].ax;
          if (this.rects[i].sprite) {
            this.rects[i].sprite.x = this.rects[i].x - this.GlobalXOffset;
            this.rects[i].sprite.y = this.rects[i].y - this.GlobalYOffset;
          }
          if (this.mouseX > this.rects[i].x - this.GlobalXOffset - (this.rects[i].w / 2) && this.mouseX < this.rects[i].x - this.GlobalXOffset + (this.rects[i].w / 2) && this.mouseY > this.rects[i].y - this.GlobalYOffset - (this.rects[i].h / 2) && this.mouseY < this.rects[i].y - this.GlobalYOffset + (this.rects[i].h / 2)) {
            for (var o = 0; o < this.rects.length; o++) {
              if ((this.rects[o].type === "button" || this.rects[o].type === "sense") && this.rects[o].n1 === i) {
                this.stroke(255, 0, 0);
                this.line(this.rects[o].x - this.GlobalXOffset, this.rects[o].y - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
              }
            }
          }
        }
        if (this.rects[i].type === "gater") {
          for (var o = 0; o < this.rects.length; o++) {
            if (i !== o && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2);
            }
            if (i !== o && this.rects[i].y > this.rects[o].y && this.rects[i].y + this.rects[i].ay < this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2);
            }

            if (i !== o && this.rects[i].x < this.rects[o].x && this.rects[i].x + this.rects[i].ax > this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = this.rects[i].ax * -0;
              this.rects[i].x = this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2);
            }
            if (i !== o && this.rects[i].x > this.rects[o].x && this.rects[i].x + this.rects[i].ax < this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = this.rects[i].ax * -0;
              this.rects[i].x = this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2);
            }

          }
          this.rects[i].ay *= 0;
          this.rects[i].y += this.rects[i].ay;
          this.rects[i].x += this.rects[i].ax;
          if (this.rects[i].sprite) {
            this.rects[i].sprite.x = this.rects[i].x - this.GlobalXOffset;
            this.rects[i].sprite.y = this.rects[i].y - this.GlobalYOffset;
          }
          if (this.mouseX > this.rects[i].x - this.GlobalXOffset - (this.rects[i].w / 2) && this.mouseX < this.rects[i].x - this.GlobalXOffset + (this.rects[i].w / 2) && this.mouseY > this.rects[i].y - this.GlobalYOffset - (this.rects[i].h / 2) && this.mouseY < this.rects[i].y - this.GlobalYOffset + (this.rects[i].h / 2)) {
            for (var o = 0; o < this.rects.length; o++) {
              if ((this.rects[o].type === "button" || this.rects[o].type === "sense") && this.rects[o].n1 === i) {
                this.stroke(255, 0, 0);
                this.line(this.rects[o].x - this.GlobalXOffset, this.rects[o].y - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
              }
            }
          }
        }
        if (this.rects[i].type === "gatel") {
          for (var o = 0; o < this.rects.length; o++) {
            if (i !== o && this.rects[i].y < this.rects[o].y && this.rects[i].y + this.rects[i].ay > this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y - (this.rects[o].h / 2) - (this.rects[i].h / 2);
            }
            if (i !== o && this.rects[i].y > this.rects[o].y && this.rects[i].y + this.rects[i].ay < this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2) && this.rects[i].x + (this.rects[i].w / 2) - 1 > this.rects[o].x - (this.rects[o].w / 2) && this.rects[i].x - (this.rects[i].w / 2) + 1 < this.rects[o].x + (this.rects[o].w / 2)) {
              this.rects[i].ay = this.rects[i].ay * -0;
              this.rects[i].y = this.rects[o].y + (this.rects[o].h / 2) + (this.rects[i].h / 2);
            }

            if (i !== o && this.rects[i].x < this.rects[o].x && this.rects[i].x + this.rects[i].ax > this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = this.rects[i].ax * -0;
              this.rects[i].x = this.rects[o].x - (this.rects[o].w / 2) - (this.rects[i].w / 2);
            }
            if (i !== o && this.rects[i].x > this.rects[o].x && this.rects[i].x + this.rects[i].ax < this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2) && this.rects[i].y + (this.rects[i].h / 2) - 1 > this.rects[o].y - (this.rects[o].h / 2) && this.rects[i].y - (this.rects[i].h / 2) + 1 < this.rects[o].y + (this.rects[o].h / 2)) {
              this.rects[i].ax = this.rects[i].ax * -0;
              this.rects[i].x = this.rects[o].x + (this.rects[o].w / 2) + (this.rects[i].w / 2);
            }

          }
          this.rects[i].ay *= 0;
          this.rects[i].y += this.rects[i].ay;
          this.rects[i].x += this.rects[i].ax;
          if (this.rects[i].sprite) {
            this.rects[i].sprite.x = this.rects[i].x - this.GlobalXOffset;
            this.rects[i].sprite.y = this.rects[i].y - this.GlobalYOffset;
          }
          if (this.mouseX > this.rects[i].x - this.GlobalXOffset - (this.rects[i].w / 2) && this.mouseX < this.rects[i].x - this.GlobalXOffset + (this.rects[i].w / 2) && this.mouseY > this.rects[i].y - this.GlobalYOffset - (this.rects[i].h / 2) && this.mouseY < this.rects[i].y - this.GlobalYOffset + (this.rects[i].h / 2)) {
            for (var o = 0; o < this.rects.length; o++) {
              if ((this.rects[o].type === "button" || this.rects[o].type === "sense") && this.rects[o].n1 === i) {
                this.stroke(255, 0, 0);
                this.line(this.rects[o].x - this.GlobalXOffset, this.rects[o].y - this.GlobalYOffset, this.rects[i].x - this.GlobalXOffset, this.rects[i].y - this.GlobalYOffset);
              }
            }
          }
        }
      }

    };
    //logic and drawing of the no magic zones
    this.noMagicZone = function (draw) {
      for (var i = 0; i < this.noMagic.length; i++) {
        this.stroke(179, 0, 0, 200);
        this.fill(255, 0, 0, 80);
        if (this.mouseIsPressed && this.mouseX > this.noMagic[i].x - this.GlobalXOffset && this.mouseX < this.noMagic[i].x - this.GlobalXOffset + this.noMagic[i].w && this.mouseY > this.noMagic[i].y - this.GlobalYOffset && this.mouseY < this.noMagic[i].y - this.GlobalYOffset + this.noMagic[i].h) {
          this.dragIndex = -1;
        }
        if (draw) {
          this.rect(this.noMagic[i].x - this.GlobalXOffset, this.noMagic[i].y - this.GlobalYOffset, this.noMagic[i].w, this.noMagic[i].h);
        }
      }
    };
    //setup background tileing sprite
    this.paralax = this.add.tileSprite(0, 0, 1000, 1000, "tileGrey");
    this.paralax.depth = -100;

    //setup player sprite
    this.player = this.add.sprite(200, 200, "platformer_characters", "sprite23");
    this.player.depth = 1000;

    //setup particle effects
    this.walking = this.add.particles(0, 0, "kenny-particles", {
      frame: ['smoke_08.png', 'smoke_10.png'],
      random: true,
      scale: { start: 0.03 * 0.6, end: 0.1 * 0.6 },
      maxAliveParticles: 8,
      lifespan: 250,
      gravityY: -300,
      alpha: { start: 1, end: 0.0 },
    });
    this.jumping = this.add.particles(0, 0, "kenny-particles", {
      frame: ['smoke_07.png', 'smoke_09.png'],
      random: true,
      scale: { start: 0.03 * 0.6, end: 0.1 },
      maxAliveParticles: 8,
      lifespan: 150,
      gravityY: -100,
      alpha: { start: 1, end: 0.0 },
    });
    this.jumping.stop();
    this.walking.stop();
  }

  update() {
    if (this.dead || this.RKey.isDown) {
      this.dragIndex = -1;
      this.dead = false;
      this.loadLevel(this.CurrentLevel, false);
    }
    //handle camera and window
    this.width = this.sys.game.canvas.width;
    this.height = this.sys.game.canvas.height;
    this.cameras.main.setViewport(0, 0, this.width, this.height);
    this.cameras.main.startFollow(this.player, false, 0.25, 0.25, 0, 100);
    this.cameras.main.setDeadzone(50, 50);
    this.cameras.main.setZoom(this.SCALE);

    //get mouse position
    this.mouseX = this.player.x + (game.input.mousePointer.x - this.width / 2) / this.SCALE;
    this.mouseY = -100 + this.player.y + (game.input.mousePointer.y - this.height / 2) / this.SCALE;

    //set gem sprites to their objects positions
    for (let i = 0; i < this.gems.length; i++) {
      this.gems[i].sprite.x = this.gems[i].x;
      this.gems[i].sprite.y = this.gems[i].y;
    }

    //move score with player
    this.scoreText.text = "Score: " + this.score;
    this.scoreText.x = this.player.x + 200;
    this.scoreText.y = this.player.y - 270;
    this.scoreText.setOrigin(0.5, 0.5);
    this.scoreText.visible = true;
    this.scoreText.depth = 1000;


    //handle paralax background
    let tmpScale = 0.2
    let ratio = this.width / this.height;
    this.paralax.tileScaleX = tmpScale / ratio;
    this.paralax.tileScaleY = tmpScale;
    this.paralax.tilePositionX = this.player.x;
    this.paralax.tilePositionY = this.player.y;
    this.paralax.displayWidth = this.width;
    this.paralax.displayHeight = this.height;
    this.paralax.x = this.player.x;
    this.paralax.y = this.player.y;


    this.paralax.visible = false;

    //load level for first time
    if (this.start) {
      this.loadLevel(this.CurrentLevel, true);
      this.start = false;
    }

    //clear simple shapes
    this.graphics.clear();
    //this.background(0, 0, 0, 100);

    //logic for antimagic fields
    this.noMagicZone(true);
    //handle blocks
    this.blocks();
    //handle mirrors
    this.drawMirrors();


    //handle logic for lazers
    this.noStroke();
    for(let t = 0; t < 3; t++){
      this.lazers();
      for (var i = 0; i < this.lazer.length; i++) {
        this.lazer[i].t = false;
        if (this.lazer[i].gr !== i) {
          this.lazer.splice(i, 1);
          i--;
        }
      }
    }
    this.stroke(255, 0, 0);
    this.lazers();

    //draw antimagic fields
    this.noMagicZone(true);

    //handle checkpoints
    for (var i = 0; i < this.checkPoint.length; i++) {
      //{x:200, y:200, top:0, bottom:200}
      for (var o = 0; o < this.rects.length; o++) {
        if (this.rects[o].type === "player" && this.rects[o].x > this.checkPoint[i].x - 5 && this.rects[o].x < this.checkPoint[i].x + 5 && this.rects[o].y + this.rects[o].h/2 > this.checkPoint[i].bottom && this.rects[o].y - this.rects[o].h/2 < this.checkPoint[i].top) {
          this.respawnX = this.checkPoint[i].x;
          this.respawnY = this.checkPoint[i].y;
          console.log("checkPoint: " + this.respawnX + ", " + this.respawnY);
          if (i === this.checkPoint.length - 1) {
            this.CurrentLevel++;
            this.loadLevel(this.CurrentLevel, true);
          }
        }
        if (!this.checkPoint[i].end && this.rects[o].type !== "player" && this.rects[o].type !== "gated" && this.rects[o].type !== "button" && this.rects[o].type !== "platform" && this.rects[o].x > this.checkPoint[i].x - 5 && this.rects[o].x < this.checkPoint[i].x + 5 && this.rects[o].y + this.rects[o].h/2 > this.checkPoint[i].bottom && this.rects[o].y - this.rects[o].h/2 < this.checkPoint[i].top) {
          this.dead = true;
        }
      }
      if(!this.checkPoint[i].end){
      this.stroke(255, 0, 0, 150);
      this.strokeWeight(10);
      //this.player.x - this.width / 2, this.player.y - this.height / 2, this.width, this.height
      this.line(this.checkPoint[i].x - this.GlobalXOffset, this.checkPoint[i].top, this.checkPoint[i].x - this.GlobalXOffset, this.checkPoint[i].bottom);
      this.strokeWeight(1);
      }
      // for (var o = 0; o < this.rects.length; o++) {
      //   if (this.rects[o].type === "player" && this.rects[o].x > this.checkPoint[i] - 5 && this.rects[o].x < this.checkPoint[i] + 5) {
      //     this.respawnX = this.checkPoint[i];
      //     this.respawnY = this.rects[o].y;
      //     if (i === this.checkPoint.length - 1) {
      //       this.CurrentLevel++;
      //       this.loadLevel(this.CurrentLevel, true);
      //     }
      //   }
      //   if (this.rects[o].type !== "player" && this.rects[o].type !== "gated" && this.rects[o].type !== "platform" && this.rects[o].x > this.checkPoint[i] - 5 && this.rects[o].x < this.checkPoint[i] + 5) {
      //     this.dead = true;
      //   }
      // }
      // this.stroke(255, 0, 0, 150);
      // this.strokeWeight(10);
      // this.player.x - this.width / 2, this.player.y - this.height / 2, this.width, this.height
      // this.line(this.checkPoint[i] - this.GlobalXOffset, this.player.y - this.height / 2, this.checkPoint[i] - this.GlobalXOffset, this.player.y + this.height / 2);
      // this.strokeWeight(1);
    }
    //handle resetting level
    // if (this.dead || this.RKey.isDown) {
    //   this.dragIndex = -1;
    //   this.dead = false;
    //   this.loadLevel(this.CurrentLevel, false);
    // }
    //handle help text
    if (this.HKey.isDown && this.btime <= 0) {
      this.btime = 10;
      if (this.helpTxt.visible) {
        this.helpTxt.visible = false;
      } else {
        this.helpTxt.visible = true;
      }
    }
    if(this.mouseIsPressed){
      console.log("mouse: " + this.mouseX + ", " + this.mouseY);
      console.log("{x:" + Math.round(this.mouseX*100)/100 + ", y:" + Math.round(this.mouseY*100)/100 + ", w:10, h:10},");
    }
    //handle menus
    this.btime--;
    this.helpTxt.x = this.player.x;
    this.helpTxt.y = this.player.y + 50;
    this.helpTxt.setOrigin(0.5, 0.5);
    this.helpTxt.depth = 1000;
    this.helpTxt.text = "      WASD to move. Click and drag on boxes to move them.\nPress R to reset to last checkpoint. Press H to toggle this menu.";
    this.win.visible = false;
    if (this.CurrentLevel > 3) {
      this.helpTxt.visible = false;
      this.background(0, 0, 0);
      this.win.x = this.player.x;
      this.win.y = this.player.y - 150;
      this.win.setOrigin(0.5, 0.5);
      this.win.visible = true;
      this.win.depth = 1000;
      this.win.text = "You Won!!! you got " + this.score + " out of " + this.maxScore() + " gems\npress enter to restart the game";
      if (this.EnterKey.isDown) {
        this.CurrentLevel = 1;
        this.win.visible = false;
        this.score = 0;
        this.loadLevel(this.CurrentLevel, true);
      }
    }
  }
}