class Start extends Phaser.Scene {
    graphics;
    curve;
    path;

    constructor() {
        super("Start");
    }

    preload() {
        
        
    }

    create() {
        let my = this.my;
        let { width, height } = this.sys.game.canvas;

        this.text = this.add.text(width/2, height/4, 'Click to start', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });
        this.text2 = this.add.text(width/2, (3*height/4), 'Credits', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });
        this.text.setOrigin(0.5, 0.5);
        this.text2.setOrigin(0.5, 0.5);
        this.mouseDown = this.input.on('pointerdown', (pointer) => {
            if(game.input.mousePointer.y < 400){
                this.scene.start("Control");
            }
            else{
                this.scene.start("Credits");
            }
        });

    }


    update() {
        let { width, height } = this.sys.game.canvas;
        let my = this.my;
        
    }
}
