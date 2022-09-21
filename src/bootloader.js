export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({key: 'Bootloader'})
    }

    preload() {
        //console.log('Se ha cargado el Bootloader.');

        this.load.image('bola', './assets/ball.png');
        this.load.image('separador', './assets/separator.png');
        this.load.image('paleta_izq', './assets/left_pallete.png');
        this.load.image('paleta_der', './assets/right_pallete.png');

        this.load.spritesheet('fullscreen', './assets/fullscreen-white.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.scene.start('PlayScene');
    }
}