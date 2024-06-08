class Start extends Phaser.Scene {
    graphics;
    curve;
    path;

    constructor() {
        super("Start");
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("mainMenu", "mainmenu.png");
        this.load.image("background", "TX Tileable - Dungeon Wall.png");


        this.load.audio('menuMusic', ['music/menu.mp3']);
    }

    create() {
        let my = this.my;
        let { width, height } = this.sys.game.canvas;
        if(!this.menuMusic){
            this.menuMusic = this.sound.add("menuMusic");
            this.menuMusic.loop = true;
            this.menuMusic.volume = 1.0;
            this.menuMusic.play();
        }

        this.text = this.add.text(width/4, height/4, 'Click here to start', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });
        this.text2 = this.add.text((3*width)/4, height/4, 'Click here for credits', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });
        this.text.setOrigin(0.5, 0.5);
        this.text2.setOrigin(0.5, 0.5);
        this.mouseDown = this.input.on('pointerdown', (pointer) => {
            if(game.input.mousePointer.x < width/2){
                this.scene.start("Control");
                this.menuMusic.stop();
            }
            else{
                this.scene.start("Credits");
            }
        });

        this.backgroundSprite = this.add.sprite(0, 0, "mainMenu");
        this.backgroundSprite.setOrigin(1, 0.5);


        this.paralax = this.add.tileSprite(0, 0, 256*20, 256*20, "background");
        this.paralax.depth = -100;

    }


    update() {
        let { width, height } = this.sys.game.canvas;
        let my = this.my;
        this.backgroundSprite.x = width;
        this.backgroundSprite.y = (3*height)/4;
        this.backgroundSprite.scale = 0.5;

        let tmpScale = 1.5;
    let ratio = width / height;
    this.paralax.tileScaleX = tmpScale / ratio;
    this.paralax.tileScaleY = tmpScale;
    // this.paralax.tilePositionX = this.player.x*this.SCALE;
    // this.paralax.tilePositionY = this.player.y*this.SCALE;
    this.paralax.tilePositionX = 0;
    this.paralax.tilePositionY = 0;
    // this.paralax.displayWidth = this.width;
    // this.paralax.displayHeight = this.height;
    this.paralax.displayWidth = 3000;
    this.paralax.displayHeight = 3000;
    this.paralax.x = 160;
    this.paralax.y = -500;
    this.paralax.depth = -100000;
    }
}