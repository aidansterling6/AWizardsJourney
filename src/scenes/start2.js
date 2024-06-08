class Start2 extends Phaser.Scene {
    graphics;
    curve;
    path;

    constructor() {
        super("Start2");
    }

    preload() {
    }

    create() {
        let my = this.my;
        let { width, height } = this.sys.game.canvas;
    
        this.text = this.add.text(width/2, height/2, 'Click to start', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });
        this.text.setOrigin(0.5, 0.5);
        this.mouseDown = this.input.on('pointerdown', (pointer) => {
            this.scene.start("Start");
        });

    }


    update() {
        let { width, height } = this.sys.game.canvas;
        let my = this.my;
    }
}
