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

        this.mode = "main";
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

        this.text = this.add.text(width/4, height/4, 'Click here to play', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });
        this.text2 = this.add.text((3*width)/4, height/4, 'Click here for credits', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });
        this.text3 = this.add.text(width/2, height/2, 
            `
            Game by Aidan Sterling
            level art pack: Cainos on unity store
            pipe art: TwistedDonkey on OpenGameArt.org
            Character: Penzilla Design on itch.io
            Music: Egge Audio on itch.io
            click to go back
            `, 
            { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });

        this.text4 = this.add.text(width/2, height/2, 'Use WASD to move\nClick and drag boxes to move them with telekinesis\nR to reset to the last checkpoint\nGood luck with the puzzles! Click to continue', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        
        this.text.setOrigin(0.5, 0.5);
        this.text2.setOrigin(0.5, 0.5);
        this.text3.setOrigin(0.5, 0.5);
        this.text4.setOrigin(0.5, 0.5);
        this.mouseDown = this.input.on('pointerdown', (pointer) => {
            if(this.mode === "main"){
                if(game.input.mousePointer.x < width/2){
                    //this.scene.start("Control");
                    this.mode = "controls"
                    //this.menuMusic.stop();
                }
                else{
                    this.mode = "credits"
                    //this.scene.start("Credits");
                }
            }
            else if(this.mode === "credits"){
                this.mode = "main"
            }
            else if(this.mode === "controls"){
                this.scene.start("loadScene");
                this.menuMusic.stop();
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

        this.text.visible = false;
        this.text2.visible = false;
        this.text3.visible = false;
        this.text4.visible = false;
        if(this.mode === "main"){
            this.text.visible = true;
            this.text2.visible = true;
        }
        if(this.mode === "credits"){
            this.text3.visible = true;
        }
        if(this.mode === "controls"){
            this.text4.visible = true;
        }

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
