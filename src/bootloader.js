export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({key: 'Bootloader'})
    }

    preload() {
        this.load.image('separador', './assets/separator.png');
        this.load.spritesheet('fullscreen', './assets/fullscreen-white.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.scene.start('PlayScene');
    }
}