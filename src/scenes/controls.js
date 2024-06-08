class Controls extends Phaser.Scene {
    graphics;
    curve;
    path;

    constructor() {
        super("Control");
    }

    preload() {
        
        
    }

    create() {
        let my = this.my;
        let { width, height } = this.sys.game.canvas;

        this.text = this.add.text(width/2, height/2, 'Use WASD to move\nClick and drag boxes to move them with telekinesis\nR to reset to the last checkpoint\nGood luck with the puzzles! Click to continue', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.text.setOrigin(0.5, 0.5);
        this.mouseDown = this.input.on('pointerdown', (pointer) => {
            this.scene.start("loadScene");
        });

    }


    update() {
        let { width, height } = this.sys.game.canvas;
        let my = this.my;
        
    }
}
