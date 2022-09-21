import Bootloader from './bootloader.js'
import PlayScene from './scenes/PlayScene.js';

const config = {
    scale: {
        parent: 'contenedor',
        mode: Phaser.Scale.FIT,
        with: 800,
        height: 600
    },
    physics: {
        default: 'arcade'
    },
    scene: [
        Bootloader,
        PlayScene
    ]
}

new Phaser.Game(config);